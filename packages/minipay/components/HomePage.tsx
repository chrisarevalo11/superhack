'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import WorldIDVerification from './WorldIDVerification';
import { useWorldID } from '../contexts/WorldIDContext';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [userAddress, setUserAddress] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const { isWorldIDVerified } = useWorldID();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  useEffect(() => {
    if (isWorldIDVerified) {
      router.push('/pools');
    }
  }, [isWorldIDVerified, router]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h1">Welcome To EasyFarm !</div>
      {isConnected ? (
        <>
          <div className="h2 text-center">Your address: {userAddress}</div>
          {!isWorldIDVerified && <WorldIDVerification />}
        </>
      ) : (
        <div>No Wallet Connected</div>
      )}
    </div>
  );
}
