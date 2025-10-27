'use client';
import React from 'react';
import { useGetUserQuery } from '@/lib/api/userApi';

export default function TestUser() {
  const { data, error, isLoading } = useGetUserQuery('1');

  console.log('[TestUser render]', { data, error, isLoading });

  if (isLoading) return <p>Loading user...</p>;
  if (error) return <p>Error fetching user.</p>;

  return (
    <div>
      <h1>User Info</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
