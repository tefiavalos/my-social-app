"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";

interface PostImagesProps {
  images: string[];
}

const PostImages: React.FC<PostImagesProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative w-full max-w-[500px] h-64 mx-auto overflow-hidden group rounded-xl">
      <Image
        src={images[currentImage] ?? "/imagen1"}
        alt={`Imagen ${currentImage + 1}`}
        className="w-full h-full object-cover rounded-xl cursor-pointer"
        width={500}
        height={500}
        onClick={() => setIsModalOpen(true)}
      />

      {images.length > 1 && (
        <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
          <button onClick={handlePrevImage}>◀</button>
          <button onClick={handleNextImage}>▶</button>
        </div>
      )}

      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          images={images}
          currentImage={currentImage}
          handleNextImage={handleNextImage}
          handlePrevImage={handlePrevImage}
        />
      )}
    </div>
  );
};

export default PostImages;
