# Fetch Plugin 插件

- 輸入 `fetch` 函式，輸出 `fetch` 函式，『不改變參數、回傳值』。

| plugin | ready | description |
|--------|-------|-------------|
| [plugin-timeout](#plugin-timeout) | ✅ | 為 fetch 新增超時功能 |
| [plugin-callback](#plugin-callback) | ✅ | 為 fetch 新增 callback 功能 |
| [plugin-headers](#plugin-headers) | ✅ | 為 fetch 新增共同 headers 功能 |
| [plugin-base-url](#plugin-base-url) | ❌ | 為 fetch 設定 baseURL |

## 使用方式

```js
import createFetchWithPlugins from '@/utils/fetch';

const fetchPlus = createFetchWithPlugins({
  timeout: 3000,
  callback: {
    successCallback,
    errorCallback,
    successAsync,
    errorAsync,
  },
  headers,
})
```

呼叫 `createFetchWithPlugins` 工廠方法即可，該方法會依照你的需求組合 fetch 插件。

## plugin-timeout

- 設計超時毫秒數，超時後信號器更改 Promise 狀態跳出。

## plugin-callback

共四種『回呼函式』

- successCallback：不阻塞，可為 async/await 或 Promise 或 一般函式；await fetch 不會等待其完成
- errorCallback：不阻塞，可為 async/await 或 Promise 或 一般函式；await fetch 不會等待其完成
- successAsync：阻塞，可為 async/await 或 Promise 函式；await fetch 會等待其完成
- errorAsync：阻塞，可為 async/await 或 Promise 函式；await fetch 會等待其完成

## plugin-headers

- 為 fetch 設定通用 headers，同鍵值時以外部傳入 headers 為主。

## plugin-base-url

- 為 fetch 設定 baseURL，目前 URL 和 Request 物件在 server 和 client 端有不一樣的狀態，待解決。
