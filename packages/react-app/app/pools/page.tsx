'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWorldID } from '@/contexts/WorldIDContext';

export default function Pools() {
  const { isWorldIDVerified } = useWorldID();
  const router = useRouter();

  useEffect(() => {
    if (!isWorldIDVerified) {
      router.push('/');
    }
  }, [isWorldIDVerified, router]);

  if (!isWorldIDVerified) {
    return null;
  }

  return (
    <div>
      <h1>Pools Page</h1>
      <p>This page is only accessible to World ID verified users.</p>
    </div>
  );
}