
'use client';
import { useEffect, useState } from 'react';

export default function OrdersForm() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/address.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  return <div style="color:#000">Data: {data ? data: 'Loading...'}</div>;
}
