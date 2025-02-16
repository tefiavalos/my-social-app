import { useState } from "react";
import CommentSection from "./CommentSection";

interface PostProps {
  post: {
    id: number;
    title: string;
    comments: string[];
    images?: string[];
  };
  onCommentSubmit: (postId: number, comment: string) => void;
}

const PostCard: React.FC<PostProps> = ({ post, onCommentSubmit }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      {post.images && post.images.length > 0 && (
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={post.images[currentImage]}
            alt={`Imagen ${currentImage + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
          {post.images.length > 1 && (
            <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
              <button onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : post.images!.length - 1))}>
                ◀
              </button>
              <button onClick={() => setCurrentImage((prev) => (prev < post.images!.length - 1 ? prev + 1 : 0))}>
                ▶
              </button>
            </div>
          )}
        </div>
      )}

      <CommentSection postId={post.id} comments={post.comments} onCommentSubmit={onCommentSubmit} />
    </div>
  );
};

export default PostCard;
