import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

// Animation constants for proximity scaling
const SCALE = 1.2;
const DISTANCE = 120;
const NUDGE = 16;
const SPRING_CONFIG = {
  mass: 0.1,
  stiffness: 300,
  damping: 20,
};

interface ImageGalleryProps {
  images: string[];
  expandedImage: string | null;
  onImageClick: (image: string) => void;
  onClose: () => void;
  gridClassName?: string;
  altPrefix?: string;
  galleryId?: string;
}

interface ProximityImageProps {
  src: string;
  alt: string;
  onClick: () => void;
  mouseLeft: any;
  testId: string;
}

const ProximityImage = ({ src, alt, onClick, mouseLeft, testId }: ProximityImageProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(() => {
    if (!mouseLeft) return -Infinity;

    const bounds = ref.current
      ? { x: ref.current.offsetLeft, width: ref.current.offsetWidth }
      : { x: 0, width: 0 };
    return (mouseLeft?.get() ?? 0) - bounds.x - bounds.width / 2;
  });

  const scale = useTransform(distance, [-DISTANCE, 0, DISTANCE], [1, SCALE, 1]);

  const calculateOffset = (currentDistance: number, currentScale: number) => {
    if (currentDistance === -Infinity) {
      return 0;
    }

    if (currentDistance < -DISTANCE || currentDistance > DISTANCE) {
      return Math.sign(currentDistance) * -1 * NUDGE;
    }

    return (-currentDistance / DISTANCE) * NUDGE * currentScale;
  };

  const x = useTransform(() => {
    const currentDistance = distance.get();
    const currentScale = scale.get();
    return calculateOffset(currentDistance, currentScale);
  });

  const scaleSpring = useSpring(scale, SPRING_CONFIG);
  const xSpring = useSpring(x, SPRING_CONFIG);

  return (
    <motion.div
      ref={ref}
      className="flex-shrink-0 cursor-pointer"
      style={{
        x: xSpring,
        scale: scaleSpring,
      }}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg shadow-lg border-2 border-white/20"
        data-testid={testId}
      />
    </motion.div>
  );
};

export function ImageGallery({
  images,
  expandedImage,
  onImageClick,
  onClose,
  gridClassName = "grid-cols-2 md:grid-cols-4",
  altPrefix = "Image",
  galleryId = "default"
}: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Update current index when expanded image changes - only for this gallery
  useEffect(() => {
    if (expandedImage && images.includes(expandedImage)) {
      const index = images.findIndex(img => img === expandedImage);
      if (index !== -1) {
        setCurrentImageIndex(index);
      }
    }
  }, [expandedImage, images]);

  // Navigation functions
  const goToPrevious = useCallback(() => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
    setCurrentImageIndex(newIndex);
    onImageClick(images[newIndex]);
  }, [currentImageIndex, images, onImageClick]);

  const goToNext = useCallback(() => {
    const newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    onImageClick(images[newIndex]);
  }, [currentImageIndex, images, onImageClick]);

  // Keyboard navigation - only active when this gallery's image is expanded
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!expandedImage) return;

      // Check if the expanded image belongs to this gallery
      const isThisGalleryActive = images.includes(expandedImage);
      if (!isThisGalleryActive) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedImage, images, goToPrevious, goToNext, onClose]);

  // Touch/swipe handling
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const mouseLeft = useMotionValue(-Infinity);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseLeft.set(e.clientX - rect.left);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      mouseLeft.set(touch.clientX - rect.left);
    }
  };

  const handleMouseLeave = () => {
    mouseLeft.set(-Infinity);
  };

  return (
    <>
      {/* Main Gallery - Horizontal scrollable layout with proximity scaling */}
      <div className="mb-8">
        <motion.div
          ref={containerRef}
          className="flex items-center gap-4 overflow-x-auto pb-4 px-4"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseLeave={handleMouseLeave}
          onTouchEnd={handleMouseLeave}
          style={{ willChange: "transform", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((image, index) => (
            <ProximityImage
              key={index}
              src={image}
              alt={`${altPrefix} ${index + 1}`}
              onClick={() => onImageClick(image)}
              mouseLeft={mouseLeft}
              testId={`image-${galleryId}-${index}`}
            />
          ))}
        </motion.div>
      </div>

      {/* Expanded Image Modal - only show if expanded image belongs to this gallery */}
      {expandedImage && images.includes(expandedImage) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-hidden"
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Previous Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Image Container - ensures proper viewport fitting */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={expandedImage}
                alt={`${altPrefix} ${currentImageIndex + 1}`}
                className="max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] w-auto h-auto object-contain"
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: 'calc(100vw - 2rem)', maxHeight: 'calc(100vh - 2rem)' }}
              />
            </div>

            {/* Next Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}