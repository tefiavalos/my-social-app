"use client";

import { Alert } from "@/components";
import { useFeed } from "@/hooks/useFeed";
import dynamic from "next/dynamic";
import InfiniteScroll from "react-infinite-scroll-component";

const PostCard = dynamic(() => import("@/components/post-card/PostCard"), {
  ssr: false,
});

const InfiniteScrollPosts = () => {
  const { posts, handleCommentSubmit, loading, fetchMoreData, hasMore } =
    useFeed();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p className="text-center mt-4">Loading more posts...</p>}
      >
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onCommentSubmit={handleCommentSubmit}
          />
        ))}
      </InfiniteScroll>
      {!loading && posts.length === 0 && (
        <Alert message="No posts yet" type="info" />
      )}
    </div>
  );
};

export default InfiniteScrollPosts;
