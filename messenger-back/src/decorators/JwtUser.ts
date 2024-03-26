import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

const jwtUserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const authorization = request.headers.authorization
      ?.split(' ')
      ?.at(-1)
      ?.split('.')
      ?.at(1);

    if (!authorization) {
      return void 0;
    }

    try {
      const data = JSON.parse(
        Buffer.from(authorization, 'base64').toString('ascii'),
      );
      return data.sub;
    } catch {
      return void 0;
    }
  },
);

export default jwtUserDecorator;
