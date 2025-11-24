import { useState } from "react";
import { SkeletonImage } from "./SkeletonLoader";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  srcSet?: string;
}

export function OptimizedImage({ src, alt, width, height, className = "", srcSet }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <>
      {!isLoaded && <SkeletonImage />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        srcSet={srcSet}
        className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
      />
    </>
  );
}
