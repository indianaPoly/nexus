FROM node:20

WORKDIR /app

COPY yarn.lock ./
COPY packages/frontend/package.json ./

COPY packages/frontend ./

RUN yarn install --production=false

EXPOSE 3000

CMD ["yarn", "dev"]  # 개발 서버 실행 명령어
