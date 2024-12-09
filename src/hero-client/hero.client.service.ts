import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { catchError, lastValueFrom, Observable, throwError } from 'rxjs';

/**
 * TODO. proto 파일을 import 하여 사용하는 방법은 없는지 확인 필요
 *  관련 라이브러리 grpc-tools protoc-gen-ts
 *  proto file 을 컴파일해 ts 파일을 생성하여 사용하는 방법
 */
interface HeroService {
  findOne(data: { id: number }): Observable<any>;
}

@Injectable()
export class HeroClientService implements OnModuleInit {
  private heroService: HeroService;

  constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit(): any {
    this.heroService = this.client.getService<HeroService>('HeroesService');
  }

  async getHero(id: number): Promise<string> {
    const data = await lastValueFrom(
      this.heroService.findOne({ id }).pipe(
        catchError((error) => {
          return throwError(() => {
            // fixme. rpc exception filter 로 대체할 수 있음
            //  관련 라이브러리 nestjs-grpc-exceptions(직접 구현하여도 무리 없을듯)
            if (error.code === 5) throw new NotFoundException('Hero not found');
            return error;
          });
        }),
      ),
    );
    return data as string;
  }
}
