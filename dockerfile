# 멀티 스테이지 빌드: 먼저 애플리케이션을 빌드하고, 빌드된 결과만을 최종 이미지로 사용
# STEP 1: 빌드 스테이지
FROM node:18 AS builder
#2
WORKDIR /app
#3 애플리케이션 소스 코드 복사
COPY . .
#4 애플리케이션 종속성 설치
RUN npm install
RUN npm rebuild bcrypt --build-from-source

#5 애플리케이션 빌드
RUN npm run build

# STEP 2: 최종 스테이지
FROM node:18
WORKDIR /app
# 8 환경 변수 설정 등 애플리케이션 실행에 필요한 추가적인 작업 수행
ENV NODE_ENV=production
# 9 빌드 스테이지에서 빌드된 애플리케이션 파일 복사
COPY --from=builder /app ./

# 10 애플리케이션 실행 명령
CMD ["npm", "run", "start:production"]
