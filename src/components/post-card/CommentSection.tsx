"use client";

import { Button, Input } from "@/components";
import { useState } from "react";

interface CommentSectionProps {
  postId: number;
  comments: any[];
  onCommentSubmit: (postId: number, comment: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
  onCommentSubmit,
}) => {
  const [newComment, setNewComment] = useState("");

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-primary">Comentarios</h3>
      <ul className="bg-light p-2 rounded-md mb-2">
        {comments.map((comment, index) => (
          <li key={index} className="text-accent">
            <p className="font-bold">
              {comment.userId ? comment.userName : "Anonimo"}
            </p>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>

      <div className="flex items-center space-x-2">
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
