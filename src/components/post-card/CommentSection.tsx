"use client";

import { Button } from "@/components";
import { Comment } from "@/types/posts";
import { useState } from "react";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";

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
      <CommentList comments={comments} showAll={showAll} />
      <CommentInput
        postId={postId}
        newComment={newComment}
        setNewComment={setNewComment}
        onCommentSubmit={onCommentSubmit}
      />
    </div>
  );
};

export default CommentSection;
