import { NextRequest, NextResponse } from 'next/server'
import { createAttestation } from '@/lib/attesterService'

export async function POST(req: NextRequest) {
    console.log("hi from post")
  const { requestId, checkpoint, farmerAddress, ipfsHash } = await req.json()
 
  try {
    const attestationUID = await createAttestation(requestId,farmerAddress, checkpoint , ipfsHash)
    return NextResponse.json({ success: true, message: 'Attestation created successfully', attestationUID })
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 })
  }
}