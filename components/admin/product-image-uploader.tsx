"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "../../lib/supabase/client";

export function ProductImageUploader({
  value,
  onChange,
  onError,
}: {
  value: string;
  onChange: (url: string) => void;
  onError?: (message: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    if (!file.type.startsWith("image/")) {
      onError?.("فقط فایل تصویری انتخاب کن.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      onError?.("حجم تصویر نباید بیشتر از ۵ مگابایت باشد.");
      return;
    }
    setUploading(true);
    onError?.("");
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `products/${crypto.randomUUID()}.${extension}`;
    const supabase = createClient();
    const { error } = await supabase.storage
      .from("product-images")
      .upload(path, file, { contentType: file.type, upsert: false });
    if (error) {
      setUploading(false);
      onError?.(error.message);
      return;
    }
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <div
        className={`relative overflow-hidden rounded-xl border-2 border-dashed p-3 text-center transition ${dragging ? "border-[var(--banakar)] bg-[#ffc000]/10" : "border-ink/20 bg-black/5"}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          const file = event.dataTransfer.files[0];
          if (file) void upload(file);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
          }}
        />
        {value ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={value}
              alt="پیش‌نمایش تصویر محصول"
              fill
              sizes="300px"
              className="object-contain"
            />
          </div>
        ) : (
          <div className="py-10 text-sm text-ink/50">
            {uploading
              ? "در حال آپلود..."
              : "تصویر را اینجا رها کن یا انتخاب کن"}
          </div>
        )}
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="mt-3 rounded-lg bg-[var(--banakar)] px-4 py-2 text-xs font-bold disabled:opacity-50"
        >
          {uploading
            ? "در حال آپلود..."
            : value
              ? "تغییر تصویر"
              : "انتخاب تصویر"}
        </button>
      </div>
      <p className="mt-2 text-[10px] text-ink/45">
        فرمت‌های تصویری · حداکثر ۵ مگابایت
      </p>
    </div>
  );
}
