'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { readUserByAddress } from '@/utils/db';

interface WorldIDContextType {
  isWorldIDVerified: boolean;
  setIsWorldIDVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorldIDContext = createContext<WorldIDContextType | undefined>(undefined);

export const WorldIDProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWorldIDVerified, setIsWorldIDVerified] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    const checkVerification = async () => {
      if (address) {
        const result = await readUserByAddress(address);
        if (result.success && result.user) {
          setIsWorldIDVerified(result.user.isVerified === 1);
        } else {
          setIsWorldIDVerified(false);
        }
      }
    };

    checkVerification();
  }, [address]);

  return (
    <WorldIDContext.Provider value={{ isWorldIDVerified, setIsWorldIDVerified }}>
      {children}
    </WorldIDContext.Provider>
  );
};

export const useWorldID = () => {
  const context = useContext(WorldIDContext);
  if (context === undefined) {
    throw new Error('useWorldID must be used within a WorldIDProvider');
  }
  return context;
};