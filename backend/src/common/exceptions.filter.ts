import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import {Response} from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorResponse =
            exception instanceof HttpException
                ? exception.getResponse()
                : {message: 'Internal server error'};

        this.logger.error(
            `Exception caught: ${JSON.stringify(errorResponse)}`,
            exception instanceof Error ? exception.stack : '',
        );

        response.status(status).json({
            statusCode: status,
            ...(typeof errorResponse === 'string'
                ? {message: errorResponse}
                : errorResponse),
            timestamp: new Date().toISOString(),
        });
    }
}
