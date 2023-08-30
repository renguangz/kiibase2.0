- 使用 docker

1. 拉下專案之後請更新 env file

```
cp .env.local.template .env.local
```

2. 使用 docker 指令即可

```
$ docker build -t kiibase .
$ docker run -d -p 3000:3000 kiibase
```

---

- 若要 run 在 local 端

1. 拉下專案之後請更新 env file

```
cp .env.local.template .env.local
```

2. 使用 npm 指令

```
$ npm ci --legacy-peer-deps
$ npm run dev
```
