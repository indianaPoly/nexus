import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  // CORS 설정
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  });

  // 글로벌 prefix 설정 (선택사항)
  app.setGlobalPrefix("api");

  await app.listen(4000);
  console.log(`Applicationls is running on: ${await app.getUrl()}`);
};

bootstrap();
