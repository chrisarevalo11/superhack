import { NextRequest, NextResponse } from 'next/server';
import { getPendingRequests, getFarmerDataFromIPFS } from '@/lib/attesterService';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const requestId = searchParams.get('requestId');

  if (req.nextUrl.pathname === '/api/attester/get/pendingRequests') {
    try {
      console.log('hi from get');
      const pendingRequests = await getPendingRequests();
      return NextResponse.json({ success: true, pendingRequests });
    } catch (error) {
      return NextResponse.json({ success: false }, { status: 500 });
    }
  }

  if (req.nextUrl.pathname === '/api/attester/get/farmerInfo') {
    if (!requestId) {
      return NextResponse.json({ success: false, error: 'Missing required parameters' }, { status: 400 });
    }

    try {
      const farmerData = await getFarmerDataFromIPFS(requestId);
      return NextResponse.json({ success: true, farmerData });
    } catch (error) {
      return NextResponse.json({ success: false }, { status: 500 });
    }
  }

  return NextResponse.json({ success: false }, { status: 404 });
}