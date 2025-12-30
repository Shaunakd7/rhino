"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ProductImageProps {
  productName: string;
  className?: string;
  priority?: boolean;
}

const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];

export default function ProductImage({ productName, className = "", priority = false }: ProductImageProps) {
  const [imageError, setImageError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const baseName = productName.toLowerCase();
  // Images are in /public/images/products/ subdirectory
  const currentSrc = `/images/products/${baseName}${imageExtensions[currentIndex]}`;

  // Reset when product name changes
  useEffect(() => {
    setImageError(false);
    setCurrentIndex(0);
    setImageLoaded(false);
  }, [productName]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Try next extension if current one fails
    if (currentIndex < imageExtensions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      console.log(`Trying next extension for ${productName}: ${imageExtensions[nextIndex]}`);
    } else {
      setImageError(true);
      console.warn(`⚠️ Image not found for ${productName}. Tried all extensions: ${imageExtensions.join(", ")}`);
      // Hide the image element
      const target = e.target as HTMLImageElement;
      if (target) {
        target.style.display = "none";
      }
    }
  };

  const handleLoad = () => {
    setImageLoaded(true);
    console.log(`✅ Image loaded: ${productName} from ${currentSrc}`);
  };

  if (imageError) {
    return null;
  }

  return (
    <Image
      key={`${productName}-${currentIndex}`}
      src={currentSrc}
      alt={productName}
      fill
      className={className}
      style={{ objectFit: "cover" }}
      priority={priority}
      sizes="100vw"
      onError={handleError}
      onLoad={handleLoad}
      unoptimized={true}
    />
  );
}

