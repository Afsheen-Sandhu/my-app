"use client";
import { HomePage } from "@/components/layout/home";
  export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        <HomePage />
      </p>
    </div>
  );
}
