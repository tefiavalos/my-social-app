import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPosts, addPosts, addComment } from "@/state/feedSlice";
import { RootState, AppDispatch } from "@/state/store";
import { clearError, setError } from "@/state/errorSlice";

export const useFeed = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.feed.posts) || [];

  const fetchPosts = useCallback(
    async (pageNumber: number) => {
      if (loading || !hasMore) return;
      setLoading(true);

      try {
        const res = await axios.get(`/api/posts?page=${pageNumber}`);
        dispatch(clearError());
        if (res.data.posts.length === 0) {
          setHasMore(false);
        } else {
          dispatch(
            pageNumber === 1
              ? setPosts(res.data.posts)
              : addPosts(res.data.posts)
          );
        }
      } catch (error) {
        console.error("Error al obtener los posts:", error);
        dispatch(setError("Error al obtener los posts"));
      } finally {
        setLoading(false);
      }
    },
    [dispatch, loading, hasMore]
  );

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleCommentSubmit = async (postId: number, comment: string) => {
    if (!comment) return;
    setLoading(true);

    //TODO: with a real enpoint we will have a userName and userId
    try {
      const userId = "789";
      const userName = "Estefania";

      const res = await axios.post("/api/posts", {
        postId,
        comment,
        userId,
        userName,
      });

      dispatch(addComment(res.data));
      dispatch(clearError());
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
      dispatch(setError("Error al agregar el comentario"));
    } finally {
      setLoading(false);
    }
  };

  return { posts, handleCommentSubmit, loading, fetchMoreData, hasMore };
};
