import { Counter } from '@/components/layout/home/counter';
import TestUser from '@/components/layout/home/text';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Counter />
      <TestUser />
    </div>
  );
}
