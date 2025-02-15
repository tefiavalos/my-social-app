import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  id: number;
  title: string;
  comments: string[];
}

interface FeedState {
  posts: Post[];
}

const initialState: FeedState = {
  posts: [],
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addComment: (state, action: PayloadAction<Post>) => {
      state.posts = state.posts.map(post =>
        post.id === action.payload.id ? action.payload : post
      );
    },
  },
});

export const { setPosts, addComment } = feedSlice.actions;
export default feedSlice.reducer;
