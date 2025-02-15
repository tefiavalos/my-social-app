import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPosts, addComment } from "@/state/feedSlice";
import { RootState, AppDispatch } from "@/state/store";

export const useFeed = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.feed.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/posts");
        dispatch(setPosts(res.data));
      } catch (error) {
        console.error("Error al obtener los posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [dispatch]);

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

  return { posts, handleCommentSubmit, loading };
};
