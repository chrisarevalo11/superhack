"use client";

import React, { useState } from 'react';
import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";

const WorldIDVerification: React.FC = () => {
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
  const action = process.env.NEXT_PUBLIC_WLD_ACTION as string;

  if (!app_id) {
    throw new Error("app_id is not set in environment variables!");
  }
  if (!action) {
    throw new Error("action is not set in environment variables!");
  }

  const { setOpen } = useIDKit();

  const onSuccess = (result: ISuccessResult) => {
    setVerificationResult(result.nullifier_hash);
  };

  const handleProof = async (result: ISuccessResult) => {
    console.log("Proof received from IDKit, sending to backend:", JSON.stringify(result));
    const response = await fetch('/api/worldIDVerify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    });
    
    const data = await response.json();
    if (data.success) {
      console.log("Successful response from backend:", JSON.stringify(data));
      setVerificationResult(result.nullifier_hash);
    } else {
      throw new Error(`Verification failed: ${data.detail}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center align-middle h-screen">
      <p className="text-2xl mb-5">World ID Cloud Verification</p>
      <IDKitWidget
        action={action}
        app_id={app_id}
        onSuccess={onSuccess}
        handleVerify={handleProof}
        verification_level={VerificationLevel.Device}
      />
      <button
        className="border border-black rounded-md mt-4"
        onClick={() => setOpen(true)}
      >
        <div className="mx-3 my-1">Verify with World ID</div>
      </button>
      {verificationResult && (
        <p className="mt-4">
          Successfully verified! Nullifier hash: {verificationResult}
        </p>
      )}
    </div>
  );
};

export default WorldIDVerification;