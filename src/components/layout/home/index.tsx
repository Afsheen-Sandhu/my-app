import { Button } from '@/components/ui/button/Button';
import React from 'react';

export const Homepage = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="max-w-3xl">
        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
          The Hub for Every Dev <br />
          <span className="text-yellow-500">Events at Brackets</span> <br />
          That You Can't Miss
        </h1>

        <p className="mb-10 text-lg text-gray-100 md:text-xl">
          Hackathons, Meetups, and Seminars — all in one place.
        </p>

        <Button variant="primary" className="rounded-full px-8 py-3 text-lg font-semibold">
          Get Started
        </Button>
      </div>
    </section>
  );
};
