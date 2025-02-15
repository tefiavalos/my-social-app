"use client";
import { useState } from "react";
import { useFeed } from "@/hooks/useFeed";
import { useAuth } from "@/hooks/useAuth";

const FeedPage = () => {
  const { posts, handleCommentSubmit, loading } = useFeed();
  const { handleLogout } = useAuth();
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});

  return (
    <div>
      <h1>Feed</h1>
      <button onClick={handleLogout} style={{ marginBottom: "10px" }}>
        Logout
      </button>
      {loading ? <p>Cargando...</p> : null}
      {posts.map(post => (
        <div key={post.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <h2>{post.title}</h2>
          <ul>
            {post.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
          <input
            type="text"
            value={newComment[post.id] || ""}
            onChange={e => setNewComment({ ...newComment, [post.id]: e.target.value })}
            placeholder="Escribe un comentario..."
          />
          <button onClick={() => handleCommentSubmit(post.id, newComment[post.id] || "")}>Comentar</button>
        </div>
      ))}
    </div>
  );
};

export default FeedPage;
