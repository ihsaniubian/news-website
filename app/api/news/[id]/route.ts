export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import News from '@/models/News';

// 1. GET SINGLE ARTICLE (For Detail Page)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params; // Next.js 15 async params fix

    const article = await News.findById(id);

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. PUT (UPDATE ARTICLE - WITH NEXT.JS 15 FIX)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params; // Next.js 15 async params fix
    
    const body = await request.json();

    const updatedArticle = await News.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedArticle) {
      return NextResponse.json({ error: 'Article not found to update' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Article updated successfully', data: updatedArticle },
      { status: 200 }
  );
  } catch (error: any) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// 3. DELETE ARTICLE
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params; // Next.js 15 async params fix

    const deletedArticle = await News.findByIdAndDelete(id);

    if (!deletedArticle) {
      return NextResponse.json({ error: 'Article not found to delete' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Article deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}