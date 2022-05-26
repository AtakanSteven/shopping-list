import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .setTitle('Shopping-List')
        .setDescription('The Shopping List App')
        .setVersion('1.0')
        .addTag('shop')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    SwaggerModule.setup('shopping-list', app, document);

    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
