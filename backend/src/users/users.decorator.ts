import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const JwtPayloadDecorator = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.payload;
    },
);
