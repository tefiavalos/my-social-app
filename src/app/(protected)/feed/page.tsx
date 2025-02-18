"use client";

import { Alert, Header } from "@/components";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import InfiniteScrollPosts from "./components/InfiniteScrollPosts";

const FeedPage = () => {
  const { message } = useSelector((state: RootState) => state.error);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Header text="Feed" />
      {message && <Alert message={message} type="error" />}
      <InfiniteScrollPosts />
    </div>
  );
};

export default FeedPage;
