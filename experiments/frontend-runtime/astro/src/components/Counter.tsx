import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  return (
    <button type="button" onClick={() => setCount((value) => value + 1)}>
      Synthetic state transitions: {count}
    </button>
  );
}
