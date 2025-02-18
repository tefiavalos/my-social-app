"use client";

import CommentSection from "./CommentSection";
import { Comment } from "@/types/posts";
import PostImages from "./PostImages";

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
  return (
    <div className="bg-light p-4 rounded-xl shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2 text-secondary">
        {post.title}
      </h2>

      {post.images && <PostImages images={post.images} />}

      <CommentSection
        postId={post.id}
        comments={post.comments}
        onCommentSubmit={onCommentSubmit}
      />
    </div>
  );
};

export default PostCard;
