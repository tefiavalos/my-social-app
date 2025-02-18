import { Button, Input } from "@/components";

interface CommentInputProps {
  postId: number;
  newComment: string;
  setNewComment: (value: string) => void;
  onCommentSubmit: (postId: number, comment: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  postId,
  newComment,
  setNewComment,
  onCommentSubmit,
}) => (
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
);

export default CommentInput;
