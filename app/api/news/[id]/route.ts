import { NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

// ==========================================
// 1. EDIT / UPDATE ARTICLE (PUT METHOD)
// ==========================================
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 🚀 Params ko Promise type diya
) {
  try {
    await connectDB();
    const { id } = await params; // 🚀 Params ko await kiya
    const body = await request.json();

    const {
      title,
      summary,
      content,
      category,
      imageUrl,
      image,
      source,
      author,
    } = body;

    const finalImageUrl = imageUrl || image;

    // Check karein ke article database mein maujood hai ya nahi
    const existingNews = await News.findById(id);
    if (!existingNews) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Data ko update karne ke liye object ready karein
    let updatedData: any = {};
    
    if (title) {
      updatedData.title = sanitizeHtml(title);
      // Title change hone par slug bhi auto-update hoga
      updatedData.slug = updatedData.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    }
    
    if (summary) updatedData.summary = sanitizeHtml(summary);
    
    if (content) {
      updatedData.content = sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ["src", "alt"],
        },
      });
    }
    
    // Category ko lowercase validation error se bachane ke liye safe rakhna
    if (category) updatedData.category = category.trim().toLowerCase();
    
    if (finalImageUrl) {
      updatedData.image = finalImageUrl;
      updatedData.imageUrl = finalImageUrl;
    }
    
    if (source) updatedData.source = source;
    if (author) updatedData.author = author;

    // Database mein update run karein
    const updatedNews = await News.findByIdAndUpdate(id, updatedData, {
      new: true, // Yeh updated data return karega
      runValidators: true, // Schema validation checks lagaye rakhega
    });

    return NextResponse.json(
      { success: true, message: "Article updated successfully", data: updatedNews },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ==========================================
// 2. DELETE ARTICLE (DELETE METHOD)
// ==========================================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 🚀 Params ko Promise type diya
) {
  try {
    await connectDB();
    const { id } = await params; // 🚀 Params ko await kiya

    // Database se article find karke delete karna
    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "Article deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}