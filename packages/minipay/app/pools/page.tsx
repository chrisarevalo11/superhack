'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWorldID } from '@/contexts/WorldIDContext';
import '../../styles/cardStyle.css';
import RoundCard from '@/components/RoundCard';

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
    <section>
      <h3 className="text-lg font-semibold">Discover Rounds</h3>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <RoundCard
          amount={10}
          title="Round 1"
          description="This is round 1"
          id={1}
        />
      </div>
    </section>
  );
}
