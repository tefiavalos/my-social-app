"use client";

import { useFeed } from "@/hooks/useFeed";
import { PostCard } from "@/components";

const FeedPage = () => {
  const { posts, handleCommentSubmit, loading, lastPostRef } = useFeed();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Feed</h1>
      </div>

      {Array.isArray(posts) ? (
        posts.map((post, index) => (
          <div
            key={post.id}
            ref={index === posts.length - 1 ? lastPostRef : null}
          >
            <PostCard post={post} onCommentSubmit={handleCommentSubmit} />
          </div>
        ))
      ) : (
        <p>Error cargando posts</p>
      )}

      {loading && <p className="text-center mt-4">Cargando más posts...</p>}
    </div>
  );
};

export default FeedPage;
