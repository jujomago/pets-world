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

export interface ExistingImage {
  id: string;
  url: string;
}

interface ImageUploaderProps {
  id: string;
  name: string;
  label: string;
  onFileSelect: (files: File[]) => void;
  maxFiles?: number;
  maxFileSizeMB?: number;
  compact?: boolean;
  images?: ExistingImage[];
  onRemoveExistingImage?: (id: string) => void;
  isSubmitting?: boolean;
}
// TODO: Implement in future client compresion with browser-image-compressio
export const ImageUploader = ({
  id,
  name,
  label,
  onFileSelect,
  maxFiles = 3,
  maxFileSizeMB = 4,
  compact = false,
  images = [],
  onRemoveExistingImage,
  isSubmitting = false,
}: ImageUploaderProps) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setError(null);
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);

    if (images.length + files.length + newFiles.length > maxFiles) {
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

  const handleRemoveNewImage = (
    index: number,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation(); // Evita que se abra el selector de archivos
    if (isSubmitting) return;

    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    URL.revokeObjectURL(imagePreviews[index]); // Libera memoria

    setFiles(newFiles);
    setImagePreviews(newPreviews);
    onFileSelect(newFiles);
  };

  const handleRemoveExistingImage = (
    e: MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();
    if (onRemoveExistingImage) {
      onRemoveExistingImage(id);
    }
  };

  const totalImages = images.length + files.length;
  const canUpload = totalImages < maxFiles && !isSubmitting;

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={`block text-gray-800 font-bold mb-1 ${comicRelief.className}`}
      >
        {label}
      </label>
      <div
        className={`mt-2 flex justify-center rounded-lg border-dashed border-2 ${
          !compact ? "py-6" : "py-2"
        } px-4 transition-colors ${
          error ? "border-red-500" : "border-gray-900/25"
        } ${
          canUpload
            ? "cursor-pointer hover:border-orange-500 active:bg-gray-100"
            : "cursor-not-allowed bg-gray-50"
        }`}
        onClick={() => {
          if (canUpload) {
            fileInputRef.current?.click();
          }
        }}
      >
        <div className={`text-center ${comicRelief.className}`}>
          {totalImages > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {images.map((image) => (
                <div key={image.id} className="relative">
                  <Image
                    src={image.url}
                    alt={`Imagen existente`}
                    width={96}
                    height={96}
                    className="h-24 w-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={(e) => handleRemoveExistingImage(e, image.id)}
                    className="absolute -top-2 -right-2 bg-white rounded-full text-red-600 hover:text-red-700 transition-colors"
                  >
                    <IoMdCloseCircle size={24} />
                  </button>
                </div>
              ))}
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
                    disabled={isSubmitting}
                    onClick={(e) => handleRemoveNewImage(index, e)}
                    className="absolute -top-2 -right-2 bg-white rounded-full text-red-600 hover:text-red-700 transition-colors"
                  >
                    <IoMdCloseCircle size={24} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <>
              {!compact && (
                <IoMdImages className="text-gray-400 text-6xl inline" />
              )}
              {maxFiles < 2 && (
                <p
                  className={` ${
                    !compact ? "mt-4" : ""
                  }leading-6 text-sm text-gray-600`}
                >
                  Haz clic para subir una imagen
                </p>
              )}
              {maxFiles >= 2 && (
                <p
                  className={` ${
                    !compact ? "mt-4" : ""
                  }leading-6 text-sm text-gray-600`}
                >
                  Haz clic para subir hasta {maxFiles} imágenes
                </p>
              )}
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
        disabled={!canUpload}
      />
    </div>
  );
};
