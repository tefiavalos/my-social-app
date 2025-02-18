"use client";

import { useState } from "react";
import CommentSection from "./CommentSection";
import Image from "next/image";
import { Comment } from "@/types/posts";

interface PostProps {
  post: {
    id: number;
    title: string;
    comments: Comment[];
    images?: string[];
  };
  onCommentSubmit: (postId: number, comment: string) => void;
}

const PostCard: React.FC<PostProps> = ({ post, onCommentSubmit }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : post.images!.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev < post.images!.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="bg-light p-4 rounded-xl shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2 text-secondary">
        {post.title}
      </h2>

      {post.images && post.images.length > 0 && (
        <div className="relative w-full max-w-[500px] h-64 mx-auto overflow-hidden group rounded-xl">
          <Image
            src={post.images[currentImage] ?? "/imagen1"}
            alt={`Imagen ${currentImage + 1}`}
            className="w-full h-full object-cover rounded-xl"
            width={500}
            height={500}
            onClick={() => setIsModalOpen(true)} // Abre el modal al hacer clic
          />

          {post.images.length > 1 && (
            <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
              <button onClick={handlePrevImage}>◀</button>
              <button onClick={handleNextImage}>▶</button>
            </div>
          )}
        </div>
      )}

      <CommentSection
        postId={post.id}
        comments={post.comments}
        onCommentSubmit={onCommentSubmit}
      />

      {/* Modal */}
      {isModalOpen && post.images && post.images.length && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)} // Cierra el modal al hacer clic fuera
        >
          <div className="relative p-4 max-w-full max-h-full">
            <Image
              src={post.images[currentImage] ?? "/imagen1"}
              alt={`Imagen ${currentImage + 1}`}
              className="w-auto h-auto max-w-screen max-h-screen object-contain rounded-xl"
              width={300}
              height={300}
              onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al hacer clic en la imagen
            />
            {post.images.length > 1 && (
              <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
                <button
                  onClick={handlePrevImage}
                  className="text-white text-3xl"
                >
                  ◀
                </button>
                <button
                  onClick={handleNextImage}
                  className="text-white text-3xl"
                >
                  ▶
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
