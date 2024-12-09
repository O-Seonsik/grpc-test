import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

interface HeroById {
  id: number;
}

interface Hero {
  id: number;
  name: string;
}

@Controller()
export class HeroServerController {
  private readonly heroes: Hero[] = [
    { id: 1, name: 'Hero One' },
    { id: 2, name: 'Hero Two' },
  ];

  @GrpcMethod('HeroesService')
  findOne(
    data: HeroById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Hero {
    const hero = this.heroes.find((hero) => hero.id === data.id);
    if (!hero) {
      // gRPC 의 NOT_FOUND (5)
      throw new RpcException({ message: 'Hero not found', code: 5 });
    }
    return hero;
  }
}
