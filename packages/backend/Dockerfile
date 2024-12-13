FROM node:20

WORKDIR /app

COPY yarn.lock ./
COPY packages/backend/package.json ./

# 소스 코드 복사
COPY packages/backend ./

RUN yarn install --production=false

RUN yarn build

EXPOSE 5000

CMD ["yarn", "dev"]