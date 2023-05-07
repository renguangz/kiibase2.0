import { useCallback, useState } from 'react';

export default function TestK8sPage() {
  const [data, setData] = useState<any>('');
  const handleFetch = useCallback(async () => {
    const res = await fetch(
      'http://a68a5633b32cd4c9fbcef9847a320fec-302105260.ap-northeast-3.elb.amazonaws.com/drinks/',
    );
    const json = res.json();
    setData(json);
    return json ?? null;
  }, []);
  return (
    <div>
      <h1>TestK8sPage</h1>
      <button type="button" onClick={handleFetch}>
        fetch
      </button>
      <div>{data}</div>
    </div>
  );
}
