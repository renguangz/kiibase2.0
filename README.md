1. 拉下專案之後請更新 env file

```
cp .env.local.template .env.local
```

2. 使用 docker 指令即可

```
$ docker build -t kiibase .
$ docker run -d -p 3000:3000 kiibase
```
