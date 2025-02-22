"use client";

import Image from "next/image";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images: string[];
  currentImage: number;
  handleNextImage: () => void;
  handlePrevImage: () => void;
}

const Modal: React.FC<Props> = ({
  setIsModalOpen,
  images,
  currentImage,
  handlePrevImage,
  handleNextImage,
}) => {
  return (
    images &&
    images.length && (
      <div
        className="fixed inset-0 bg-primary bg-opacity-80 flex items-center justify-center z-50"
        onClick={() => setIsModalOpen(false)}
      >
        <div className="relative p-4">
          <Image
            src={images[currentImage] ?? "/imagen1"}
            alt={`Imagen ${currentImage + 1}`}
            className="object-contain rounded-xl"
            width={500}
            height={500}
            onClick={(e) => e.stopPropagation()}
          />
          {images.length > 1 && (
            <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
              <button onClick={handlePrevImage} className="text-white text-3xl">
                ◀
              </button>
              <button onClick={handleNextImage} className="text-white text-3xl">
                ▶
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Modal;
