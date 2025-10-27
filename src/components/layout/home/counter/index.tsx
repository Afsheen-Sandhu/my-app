'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store/storeHooks';
import { increment, decrement, addAmount } from '@/lib/store/slices/counter/counterSlice';
import { useState } from 'react';

export function Counter() {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.counter.value);
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex items-center space-x-2">
      <button
        className="bg-primary text-primary-foreground rounded px-3 py-1"
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
      <span className="px-3">{value}</span>
      <button
        className="bg-primary text-primary-foreground rounded px-3 py-1"
        onClick={() => dispatch(increment())}
      >
        +
      </button>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="ml-2 w-20 border p-1"
      />
      <button
        className="bg-secondary text-secondary-foreground rounded px-3 py-1"
        onClick={() => dispatch(addAmount(amount))}
      >
        Add
      </button>
    </div>
  );
}
