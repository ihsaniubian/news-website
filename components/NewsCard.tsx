import Link from 'next/link';
import Image from 'next/image';

interface NewsCardProps {
  post: {
    _id: string;
    title: string;
    slug: string;
    summary: string;
    category: string;
    imageUrl: string;
    createdAt: string;
  };
}

export default function NewsCard({ post }: NewsCardProps) {
  return (
    <div className="bg-[#16161a] rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500 transition-all duration-300 group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-900">
        <img
          src={post.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
          alt={post.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-orange-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded text-white tracking-wider">
          {post.category}
        </span>
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-[11px] text-gray-500 mb-2 font-medium">
          {new Date(post.createdAt).toLocaleDateString('en-PK')}
        </span>
        
        <Link href={`/news/${post.slug}`}>
          <h3 className="text-lg font-bold text-white leading-snug group-hover:text-orange-400 transition-colors line-clamp-2 mb-2 cursor-pointer">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
          {post.summary}
        </p>

        <Link href={`/news/${post.slug}`} className="text-orange-500 text-xs font-semibold hover:underline inline-flex items-center mt-auto">
          Read Full Story →
        </Link>
      </div>
    </div>
  );
}