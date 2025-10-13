"use client";

import React, {
  useState,
  useRef,
  ChangeEvent,
  useEffect,
  MouseEvent,
} from "react";
import { comicRelief } from "@/fonts/fonts";
import { IoMdCloseCircle, IoMdImages } from "react-icons/io";
import Image from "next/image";

interface ImageUploaderProps {
  id: string;
  name: string;
  label: string;
  onFileSelect: (files: File[]) => void;
  maxFiles?: number;
  maxFileSizeMB?: number;
}

export const ImageUploader = ({
  id,
  name,
  label,
  onFileSelect,
  maxFiles = 3,
  maxFileSizeMB = 4,
}: ImageUploaderProps) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // console.log("files:", files);
  // console.log("imagePreviews:", imagePreviews);

  useEffect(() => {
    let errorTimer: NodeJS.Timeout;
    if (error) {
      errorTimer = setTimeout(() => setError(null), 4000);
    }
    // Limpiar los Object URLs cuando el componente se desmonte para evitar memory leaks
    return () => {
      if (errorTimer) {
        clearTimeout(errorTimer);
      }
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews, error]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("handle file change");
    setError(null);
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);

    if (files.length + newFiles.length > maxFiles) {
      setError(`Solo puedes subir hasta ${maxFiles} imágenes.`);
      return;
    }

    const oversizedFiles = newFiles.filter(
      (file) => file.size > maxFileSizeMB * 1024 * 1024
    );
    if (oversizedFiles.length > 0) {
      setError(
        `Algunos archivos superan el límite de ${maxFileSizeMB}MB: ${oversizedFiles
          .map((f) => f.name)
          .join(", ")}`
      );
      return;
    }

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onFileSelect(updatedFiles);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (
    index: number,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation(); // Evita que se abra el selector de archivos

    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    URL.revokeObjectURL(imagePreviews[index]); // Libera memoria

    setFiles(newFiles);
    setImagePreviews(newPreviews);
    onFileSelect(newFiles);
  };

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={`block text-gray-800 font-bold mb-1 ${comicRelief.className}`}
      >
        {label}
      </label>
      <div
        className={`mt-2 flex justify-center rounded-lg border-dashed border-2 py-6 px-4 transition-colors ${
          error
            ? "border-red-500"
            : "border-gray-900/25 hover:border-orange-500"
        } ${
          files.length < maxFiles
            ? "cursor-pointer active:bg-gray-100"
            : "cursor-not-allowed bg-gray-50"
        }`}
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        <div className={`text-center ${comicRelief.className}`}>
          {imagePreviews.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {imagePreviews.map((src, index) => (
                <div key={index} className="relative">
                  <Image
                    src={src}
                    alt={`Vista previa ${index + 1}`}
                    width={96}
                    height={96}
                    className="h-24 w-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={(e) => handleRemoveImage(index, e)}
                    className="absolute -top-2 -right-2 bg-white rounded-full text-red-600 hover:text-red-700 transition-colors"
                  >
                    <IoMdCloseCircle size={24} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <>
              <IoMdImages className="text-gray-400 text-6xl inline" />
              <p className="mt-4 leading-6 text-sm text-gray-600">
                Haz clic para subir hasta {maxFiles} imágenes
              </p>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF hasta {maxFileSizeMB}MB
              </p>
            </>
          )}
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <input
        id={id}
        name={name}
        type="file"
        className="hidden"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};
