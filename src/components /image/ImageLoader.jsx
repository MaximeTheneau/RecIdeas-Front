import { useState } from 'react';
import Spinner from '../ui/Spinner';

/* eslint-disable @next/next/no-img-element */

export default function ImageLoader({
  src,
  srcset,
  width,
  alt,
  height,
  priority,
}) {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    console.log('test');
  };

  return (
    <div className="relative" s>
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center">
          <Spinner aria-label="Loading image" />
        </div>
      )}
      <img
        alt={alt}
        src={src}
        height={height}
        width={width}
        srcSet={srcset}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'low'}
        decoding="async"
        sizes="100vw"
        onLoad={handleLoad}
        onError={handleError}
        className={loading ? 'invisible' : 'visible'}
      />
    </div>
  );
}
