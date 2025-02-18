"use client";

import { Button, Input } from "@/components";
import { Comment } from "@/types/posts";
import { useState } from "react";

interface CommentSectionProps {
  postId: number;
  comments: Comment[];
  onCommentSubmit: (postId: number, comment: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
  onCommentSubmit,
}) => {
  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(false);

  const visibleComments = showAll ? comments : comments.slice(0, 2);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary">Comentarios</h3>
        {comments.length > 2 && (
          <Button
            onClick={() => setShowAll(!showAll)}
            size="sm"
            variant="secondary"
          >
            {showAll ? "Mostrar menos" : "Ver todos"}
          </Button>
        )}
      </div>

      <ul className="bg-light p-2 rounded-md mb-2">
        {visibleComments.map((comment, index) => (
          <li key={index} className="text-accent">
            <p className="font-bold">
              {comment.userId ? comment.userName : "Anonimo"}
            </p>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>

      <div className="flex items-center space-x-2 mt-5">
        <Input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe un comentario..."
        />
        <Button
          onClick={() => {
            onCommentSubmit(postId, newComment);
            setNewComment("");
          }}
        >
          Comentar
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
