import { NextRequest, NextResponse } from 'next/server';
import { VerifyReply } from '@/types/worldcoin';
import { verifyCloudProof } from '@worldcoin/idkit-core/backend';
import { insertUser } from '@/utils/db';

export async function POST(req: NextRequest): Promise<NextResponse<VerifyReply>> {
  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
  const action = process.env.NEXT_PUBLIC_WLD_ACTION as string;

  try {
    const data = await req.json();
    const proof = data.result;
    const signal = proof.signal;
    const userAddress = data.userAddress;
    const verifyRes = await verifyCloudProof(proof, app_id, action, signal);

    if (verifyRes.success) {
      insertUser(userAddress,true);
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ 
        success: false, 
        code: verifyRes.code, 
        attribute: verifyRes.attribute, 
        detail: verifyRes.detail 
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ success: false, detail: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ success: false, detail: 'Method not allowed' }, { status: 405 });
}