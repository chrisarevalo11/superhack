import { NextRequest, NextResponse } from 'next/server';
import { getFarmerDataFromIPFS } from '@/lib/attesterService';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await getFarmerDataFromIPFS(params.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching farmer data:", error);
    return NextResponse.json({ error: 'Failed to fetch farmer data' }, { status: 500 });
  }
}