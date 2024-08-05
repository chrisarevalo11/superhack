import type { NextApiRequest, NextApiResponse } from 'next';
import { VerificationLevel } from "@worldcoin/idkit-core";
import { verifyCloudProof } from "@worldcoin/idkit-core/backend";
import { IVerifyRequest, VerifyReply } from '../../types/worldcoin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyReply>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, detail: 'Method not allowed' });
  }

  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
  const action = process.env.NEXT_PUBLIC_WLD_ACTION as string;

  try {
    const proof = req.body;
    const  signal = proof.signal;
    const verifyRes = await verifyCloudProof(proof, app_id, action, signal);
    if (verifyRes.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ 
        success: false, 
        code: verifyRes.code, 
        attribute: verifyRes.attribute, 
        detail: verifyRes.detail 
      });
    }
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ success: false, detail: 'Internal server error' });
  }
}