1. 拉下專案之後請到 `src/utils/environments.ts` 修改環境變數(目前暫時使用 DOCKER_HOST)，請改成 api, s3 hostname![](https://i.imgur.com/eBZ8V3m.png)
2. 使用 docker 指令即可

```
$ docker build -t kiibase .
$ docker run -d -p 3000:3000 kiibase
```
