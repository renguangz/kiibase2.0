import Link from 'next/link';

export default function HomePage() {
  console.log('vercel');
  return (
    <div>
      <h1>TODO</h1>
      <div>1. 新增一個 README Page 來說明 api 架構，包含可以使用哪些 component 以及他們的 config</div>
      <div>
        2. 新增 Select 選擇完去 call api 拿到其他資料 (role 頁面在選擇完 modules 之後去拿到所有的 api_functions)
      </div>
      <div>3. Logo 要換並且不要 route 到 `adminUser`</div>
      <div>4. 重設密碼 api 實作(Backend)</div>
      <Link href="/search-location">出發地、抵達地搜尋選單</Link>
    </div>
  );
}
