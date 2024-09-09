import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';


// Named export for the POST method
export async function POST(req: NextRequest) {
  try {
    const { presentsId } = await req.json(); // Extract the data from the request body
    console.log("up here",presentsId)
    if (!presentsId || presentsId.length === 0) {
      return NextResponse.json({ error: 'presentsId is required' }, { status: 400 });
    }

    // Use findMany to retrieve presents by their IDs
    const presents = await db.present.findMany({
      where: {
        id: {
          in: presentsId, // Filter by the array of presentsId
        },
      },
      select: {
        id: true,
        name: true,
        imageId: true,
        retailer: true,
        retailerId: true,
        retailCost: true,
        wholesaleCost: true,
        onHand: true,
      },
    });
console.log("down here",presents)
    return NextResponse.json(presents, { status: 200 }); // Return the presents in the response
  } catch (error) {
    console.error('Error fetching presents:', error);
    return NextResponse.json({ error: 'Error fetching presents' }, { status: 500 });
  }
}
