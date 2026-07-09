import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb'; // ⚠️ Apne mongoose/database connection file ka sahi path check kar lein
import News from '@/models/News'; // ⚠️ Apne News Model/Schema ka sahi path check kar lein

// ==========================================
// 1. PUT: Specific News ko Update karne ke liye
// ==========================================
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const id = params.id;
    const body = await request.json();

    // ID ke zariye database mein entry dhoond kar naye data se update karna
    const updatedNews = await News.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedNews) {
      return NextResponse.json({ error: 'News article not found' }, { status: 404 });
    }

    return NextResponse.json(updatedNews, { status: 200 });
  } catch (error: any) {
    console.error("Error updating news:", error);
    return NextResponse.json({ error: error.message || 'Failed to update news' }, { status: 500 });
  }
}

// ==========================================
// 2. DELETE: Specific News ko Urane ke liye
// ==========================================
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const id = params.id;

    // ID ke zariye database se news delete karna
    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return NextResponse.json({ error: 'News article not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'News deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting news:", error);
    return NextResponse.json({ error: error.message || 'Failed to delete news' }, { status: 500 });
  }
}