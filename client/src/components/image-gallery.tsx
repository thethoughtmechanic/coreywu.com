
import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  expandedImage: string | null;
  onImageClick: (image: string) => void;
  onClose: () => void;
  gridClassName?: string;
  altPrefix?: string;
  galleryId?: string;
}

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

  return (
    <>
      {/* Image Grid */}
      <div className={`grid gap-4 ${gridClassName} mb-8`}>
        {images.map((image, index) => (
          <div 
            key={index} 
            className="bg-gray-50 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 aspect-square flex items-center justify-center p-2"
            onClick={() => onImageClick(image)}
          >
            <img 
              src={image} 
              alt={`${altPrefix} ${index + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Expanded Image Modal - only show if expanded image belongs to this gallery */}
      {expandedImage && images.includes(expandedImage) && (
        <div 
          className="fixed top-16 md:top-20 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex items-center justify-center z-[101] p-4 overflow-hidden"
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

            {/* Image Container - ensures proper viewport fitting, accounting for nav height */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={expandedImage}
                alt={`${altPrefix} ${currentImageIndex + 1}`}
                className="max-w-[calc(100vw-2rem)] max-h-[calc(100vh-5rem)] md:max-h-[calc(100vh-6rem)] w-auto h-auto object-contain"
                onClick={(e) => e.stopPropagation()}
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
