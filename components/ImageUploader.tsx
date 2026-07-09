"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
}

export default function ImageUploader({ onUploadSuccess }: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "ymkpkkoc";

  return (
    <div className="space-y-4 w-full">
      <label className="block text-xs uppercase font-bold tracking-wider text-gray-400">
        Feature Image <span className="text-red-500">*</span>
      </label>

      <CldUploadWidget
        // 🎯 EXACT MATCH: Aapke dashboard ke mutabik 'khabarnama' hona chahiye
        uploadPreset="khabarnama" 
        options={{
          cloudName: "ymkpkkoc",
          sources: ["local", "url", "camera"],
          multiple: false,
          maxFiles: 1,
        }}
        onSuccess={(result: any) => {
          if (result?.info?.secure_url) {
            const uploadedUrl = result.info.secure_url;
            setImageUrl(uploadedUrl);
            onUploadSuccess(uploadedUrl);
          }
        }}
      >
        {({ open }) => {
          return (
            <button
              type="button"
              onClick={() => open()}
              className="w-full py-3 px-4 bg-[#16161a] hover:bg-gray-800 text-white font-medium rounded-xl border border-gray-800 hover:border-orange-500 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              📸 {imageUrl ? "Change Selected Image" : "Upload Image via Cloudinary"}
            </button>
          );
        }}
      </CldUploadWidget>

      {/* Preview Box */}
      {imageUrl && (
        <div className="relative mt-2 rounded-xl overflow-hidden border border-gray-800 h-48 w-full bg-black">
          <img
            src={imageUrl}
            alt="Uploaded preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-green-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow">
            ✓ Uploaded Successfully
          </div>
        </div>
      )}
    </div>
  );
}