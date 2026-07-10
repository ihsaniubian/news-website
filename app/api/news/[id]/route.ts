import { NextResponse } from "next/server";

// 1. EDIT / UPDATE NEWS (PUT)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const body = await request.json();
  const { title, content, metaTitle, metaDescription } = body;

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  try {
    // TODO: Yahan apni Database Update query likhein (Prisma, Mongoose, ya SQL)
    // Example: await db.news.update({ data: { title, slug, content... } })

    return NextResponse.json({ success: true, message: `News ${id} updated successfully!`, slug });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 2. DELETE NEWS (DELETE)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    // TODO: Yahan apni Database Delete query likhein
    // Example: await db.news.delete({ where: { id } })

    return NextResponse.json({ success: true, message: `News ${id} deleted successfully!` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}