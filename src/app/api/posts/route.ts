import { NextResponse } from "next/server";

const posts = [
  {
    id: 1,
    title: "Post de prueba",
    comments: ["¡Hola mundo!"],
    images: [
      "https://picsum.photos/300/200.jpg",
      "https://picsum.photos/300/300.jpg",
    ],
  },
  { id: 2, title: "Otro post", comments: [], images: [] },
  {
    id: 3,
    title: "Post con imagen",
    comments: ["Interesante!"],
    images: ["https://picsum.photos/300/200.jpg"],
  },
  {
    id: 4,
    title: "Post de prueba",
    comments: ["¡Hola mundo!"],
    images: [
      "https://picsum.photos/300/200.jpg",
      "https://picsum.photos/300/300.jpg",
    ],
  },
  { id: 5, title: "Otro post", comments: [], images: [] },
  {
    id: 6,
    title: "Post con imagen",
    comments: ["Interesante!"],
    images: ["https://picsum.photos/300/200.jpg"],
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 2;
  const start = (page - 1) * limit;
  const end = start + limit;

  return NextResponse.json({
    posts: posts.slice(start, end),
    hasMore: end < posts.length,
  });
}

export async function POST(req: Request) {
  const { comment, postId } = await req.json();
  const post = posts.find((p) => p.id === postId);

  if (post) post.comments.push(comment);

  return NextResponse.json(post);
}
