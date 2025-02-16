import { useState, useEffect, useCallback, useRef } from "react";
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

  const fetchPosts = useCallback(async (pageNumber: number) => {
    if (loading || !hasMore) return;  // No hacer petición si ya está cargando o no hay más
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
  }, [dispatch, loading, hasMore]);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);  // Se ejecuta solo cuando cambia la página

  const lastPostRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || !hasMore) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);  // Incrementa la página solo cuando sea necesario
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);

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
