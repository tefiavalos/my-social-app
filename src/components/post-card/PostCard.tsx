"use client";

import { useState } from "react";
import CommentSection from "./CommentSection";
import Image from "next/image";
import { Comment } from "@/types/posts";
import Modal from "./Modal";

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
            className="w-full h-full object-cover rounded-xl cursor-pointer"
            width={500}
            height={500}
            onClick={() => setIsModalOpen(true)}
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

      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          post={post}
          currentImage={currentImage}
          handleNextImage={handleNextImage}
          handlePrevImage={handlePrevImage}
        ></Modal>
      )}
    </div>
  );
};

export default PostCard;
