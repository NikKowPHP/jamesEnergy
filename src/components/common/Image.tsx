import React, { memo } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'sync' | 'auto';
}

const Image: React.FC<ImageProps> = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fetchPriority = 'auto',
  decoding = 'async',
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : fetchPriority}
      decoding={decoding}
      onError={(e) => {
        e.currentTarget.style.opacity = '0.5';
        e.currentTarget.style.filter = 'grayscale(100%)';
      }}
    />
  );
});

Image.displayName = 'Image';

export default Image; 