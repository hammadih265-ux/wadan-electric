"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";

import CropDialog from "./CropDialog";
import ImagePreview from "./ImagePreview";

import type { ImageUploadProps } from "./types";

import {
  compressImage,
  getCroppedImg,
} from "./image-utils";

import { uploadImage } from "./upload";


export default function ImageUpload({
  bucket,
  folder,
  value,
  onChange,
  multiple = false,
  maxFiles = 5,
  aspect = 1,
}: ImageUploadProps) {


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  const images = Array.isArray(value) ? value : value ? [value] : [];



  function handleRemove(index: number) {

    const updated =
      images.filter(
        (_, i) => i !== index
      );


    if (multiple) {
      onChange(updated);
    } else {
      onChange("");
    }
  }



  async function handleFile(
    file: File
  ) {

    const isHeic = file.name.toLowerCase().endsWith(".heic");
    if (
      !file.type.startsWith("image/") && !isHeic
    ) {
      setError(
        "Only image files are allowed"
      );

      return;
    }


    setError(null);

    const reader =
      new FileReader();


    reader.onload = () => {

      setCropImage(
        reader.result as string
      );

      setSelectedFile(file);

    };


    reader.readAsDataURL(file);
  }





  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = e.target.files;
    if (!files?.length) return;

    const selectedFiles = multiple ? Array.from(files) : [files[0]];


    if (
      multiple &&
      images.length + selectedFiles.length > maxFiles
    ) {

      setError(
        `Maximum ${maxFiles} images allowed`
      );

      return;
    }



    setPendingFiles(selectedFiles);
    await handleFile(selectedFiles[0]);

    e.target.value = "";

  }

  function processNextFile() {
    if (pendingFiles.length > 1) {
      const remaining = pendingFiles.slice(1);
      setPendingFiles(remaining);
      handleFile(remaining[0]);
    } else {
      setPendingFiles([]);
    }
  }

  async function handleCropSave(
    crop: {
      x:number;
      y:number;
      width:number;
      height:number;
    }
  ) {

    if (
      !cropImage ||
      !selectedFile
    )
      return;



    try {

      setLoading(true);
      setError(null);



      const croppedFile =
        await getCroppedImg(
          cropImage,
          crop
        );



      const compressed =
        await compressImage(
          croppedFile
        );



      const url =
        await uploadImage(
          compressed,
          bucket,
          folder
        );



      if (multiple) {

        onChange([
          ...images,
          url,
        ]);

      } else {

        onChange(url);

      }



      setCropImage(null);

      setSelectedFile(null);

      processNextFile();

    } catch(err) {



      setError(
        err instanceof Error
          ? err.message
          : "Upload failed"
      );


    } finally {

      setLoading(false);

    }

  }
    return (
    <div className="space-y-4">

      {/* Upload Button */}
      <label
        className={`
          flex flex-col items-center justify-center
          gap-3
          border-2 border-dashed
          rounded-2xl
          p-8
          cursor-pointer
          transition
          ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-black hover:bg-gray-50"
          }
        `}
      >

        <Upload
          className="w-8 h-8 text-gray-400"
        />


        <div className="text-center">

          <p className="font-medium text-gray-800">
            Upload Image
          </p>


          <p className="text-sm text-gray-500">
            Click to select image
          </p>

        </div>


        <input
          type="file"
          hidden
          accept="image/*,.heic,.HEIC"
          multiple={multiple}
          disabled={loading}
          onChange={handleUpload}
        />

      </label>



      {/* Loading */}
      {loading && (

        <div
          className="
          text-sm
          text-center
          text-gray-500
          "
        >
          Processing image...
        </div>

      )}




      {/* Error */}
      {error && (

        <div
          className="
          rounded-xl
          bg-red-50
          border
          border-red-200
          text-red-600
          text-sm
          p-3
          "
        >
          {error}
        </div>

      )}




      {/* Preview */}
      <ImagePreview
        images={images}
        multiple={multiple}
        onDelete={handleRemove}
      />





      {/* Crop Modal */}

      {cropImage && (

        <CropDialog
          open={true}
          image={cropImage}
          aspect={aspect}
          loading={loading}

          onCancel={() => {

            setCropImage(null);
            setSelectedFile(null);
            processNextFile();

          }}


          onSave={handleCropSave}

        />

      )}


    </div>
  );
}