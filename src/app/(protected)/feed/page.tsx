"use client";

import { Alert } from "@/components";
import { useFeed } from "@/hooks/useFeed";
import { RootState } from "@/state/store";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const PostCard = dynamic(() => import("@/components/post-card/PostCard"), {
  ssr: false,
});

const FeedPage = () => {
  const { posts, handleCommentSubmit, loading, fetchMoreData, hasMore } =
    useFeed();
  const { message } = useSelector((state: RootState) => state.error);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Feed</h1>
      {message && <Alert message={message} type="error" />}
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
      {!loading && posts.length === 0 && <p>No posts yet</p>}
    </div>
  );
};

export default FeedPage;
