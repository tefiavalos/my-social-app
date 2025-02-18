import { Comment } from "@/types/posts";
import { v4 as uuidv4 } from "uuid";

interface CommentListProps {
  comments: Comment[];
  showAll: boolean;
}

const CommentList: React.FC<CommentListProps> = ({ comments, showAll }) => (
  <ul
    className={`bg-light p-2 rounded-md mb-2 overflow-hidden transition-all ${
      showAll ? "max-h-60 overflow-y-auto" : "max-h-28"
    }`}
  >
    {comments.map((comment) => (
      <li
        key={uuidv4()}
        className="text-accent py-1 border-b border-gray-300 last:border-b-0"
      >
        <p className="font-bold">
          {comment.userId ? comment.userName : "Anonimo"}
        </p>
        <p>{comment.text}</p>
      </li>
    ))}
  </ul>
);

export default CommentList;
