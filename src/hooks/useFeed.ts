import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPosts, addPosts, addComment } from "@/state/feedSlice";
import { RootState, AppDispatch } from "@/state/store";

export const useFeed = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.feed.posts) || [];
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchPosts = useRef(async (pageNumber: number) => {
    setLoading(true);
    try {
      console.log(`Fetching page ${pageNumber}`);
      const res = await axios.get(`/api/posts?page=${pageNumber}`);

      if (res.data.posts.length === 0) {
        setHasMore(false);
      } else {
        dispatch(pageNumber === 1 ? setPosts(res.data.posts) : addPosts(res.data.posts));
      }
    } catch (error) {
      console.error("Error al obtener los posts:", error);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (!hasMore || loading) return;
    fetchPosts.current(page);
  }, [page, hasMore]);

  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [hasMore, loading]
  );

  const handleCommentSubmit = async (postId: number, comment: string) => {
    if (!comment) return;
    setLoading(true);

    try {
      const res = await axios.post("/api/posts", { postId, comment });
      dispatch(addComment(res.data));
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
    } finally {
      setLoading(false);
    }
  };

  return { posts, handleCommentSubmit, loading, lastPostRef, hasMore };
};

