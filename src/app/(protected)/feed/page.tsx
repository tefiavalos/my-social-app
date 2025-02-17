"use client";

import { useFeed } from "@/hooks/useFeed";
import dynamic from "next/dynamic";

const PostCard = dynamic(() => import("@/components/post-card/PostCard"), { ssr: false });

const FeedPage = () => {
  const { posts, handleCommentSubmit, loading, lastPostRef } = useFeed();

  if (!Array.isArray(posts)) {
    return <p>Error loading posts</p>; 
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Feed</h1>

      {posts.map((post, index) => (
        <div key={post.id} ref={index === posts.length - 1 ? lastPostRef : null}>
          <PostCard post={post} onCommentSubmit={handleCommentSubmit} />
        </div>
      ))}

      {loading && <p className="text-center mt-4">Loading more posts...</p>}
      {!loading && posts.length === 0 && <p>No posts yet</p>}
    </div>
  );
};

export default FeedPage;
