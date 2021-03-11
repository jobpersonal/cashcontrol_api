FROM node:15-stretch
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm i -g prisma
ENV ISPROD=true
ENV PORT=5200
ENV DATABASE_URL="postgresql://user:my_p4ssword3322@db/cashcontrol"
ENV ACCESS_TOKEN_SECRET=1cf959be11eea86de7813fa2d22cf968ac9236a1c20c6e1737774174165686535ba832b4a2cb0a971a77b5382f7f0efcb25dbbc1d22b8831aa5c27b7f733d57f
ENV REFRESH_TOKEN_SECRET=4ae769b6510a2bf9d6e7e53fbde4bf3dbb12c592915e5e62dc3930a387734ab495ab4198c246f0245e81d135e099b0bcb36060e80acbfe635fe005d10376849e
COPY . /app
RUN chmod +x init.sh
RUN chmod +x wait-for.sh
