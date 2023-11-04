FROM node:18 as builder
WORKDIR /app

# install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# copy code
COPY public/ ./public
COPY src/ ./src
COPY index.html ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY .npmrc ./

RUN npm install
RUN npm run build

FROM nginx:stable
WORKDIR /app
EXPOSE 5173
ENV PORT=5173

# copy built code
COPY --from=builder /app/dist /usr/share/nginx/html

# add soft link
RUN ln -s /usr/share/nginx/html /app/dist
