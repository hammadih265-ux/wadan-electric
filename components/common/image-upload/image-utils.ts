export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

const MAX_DIMENSION = 1600;
const WEBP_QUALITY = 0.8;

export async function compressImage(file: File): Promise<File> {
  if (file.type === "image/gif") return file;

  const bitmap = await createImageBitmap(file);

  let width = bitmap.width;
  let height = bitmap.height;

  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_DIMENSION) / width);
      width = MAX_DIMENSION;
    } else {
      width = Math.round((width * MAX_DIMENSION) / height);
      height = MAX_DIMENSION;
    }
  }

  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  if (!ctx) return file;

  ctx.drawImage(bitmap, 0, 0, width, height);

  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", WEBP_QUALITY),
  );

  if (!blob) return file;

  return new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), {
    type: "image/webp",
  });
}




export async function getCroppedImg(
  imageSrc: string,
  crop: Area
): Promise<File> {
  const image = new Image();

  image.src = imageSrc;

  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement("canvas");

  canvas.width = crop.width;
  canvas.height = crop.height;

  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", WEBP_QUALITY)
  );

  if (!blob)
    throw new Error("Unable to crop image.");

  return new File(
    [blob],
    `${crypto.randomUUID()}.webp`,
    {
      type: "image/webp",
    }
  );
}