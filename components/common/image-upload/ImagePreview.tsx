"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";

interface Props {
  images: string[];
  multiple?: boolean;
  onDelete(index: number): void;
}

export default function ImagePreview({
  images,
  onDelete,
}: Props) {
  if (!images.length) return null;

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {images.map((url, index) => (
        <div
          key={url}
          className="relative rounded-xl overflow-hidden border"
        >
          <Image
            src={url}
            alt=""
            width={250}
            height={250}
            unoptimized
            sizes="250px"
            className="aspect-square object-cover w-full"
          />

          <button
            type="button"
            onClick={() => onDelete(index)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}