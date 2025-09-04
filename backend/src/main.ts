import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder, SwaggerDocumentOptions} from '@nestjs/swagger';
import {Logger, ValidationPipe} from "@nestjs/common";
import helmet from "helmet";
import {AllExceptionsFilter} from "./common/exceptions.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    app.useGlobalFilters(new AllExceptionsFilter());

    app.use(helmet());

    app.enableCors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('Easygenerator Backend API')
        .setDescription('A backend API for authentication service for Easygenerator')
        .setVersion('1.0')
        .addTag('easygenerator-api')
        .addBearerAuth()
        .build();

    const options: SwaggerDocumentOptions =  {
        operationIdFactory: (
            controllerKey: string,
            methodKey: string
        ) => methodKey
    };

    const documentFactory = () => SwaggerModule.createDocument(app, config, options);

    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(process.env.PORT ?? 3333);
    Logger.log(`🚀 Application is running on: http://localhost:3333`, 'Bootstrap');
}

bootstrap();
