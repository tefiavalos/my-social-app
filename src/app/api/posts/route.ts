import { NextResponse } from "next/server";

const posts = [
  {
    id: 1,
    title: "Ramones",
    comments: [{ id: 1, userId: "123", userName: "Juan", text: "Muy bueno" }],
    images: ["/imagen3.jpg", "/imagen4.jpg"],
  },
  {
    id: 2,
    title: "Mi gata",
    comments: [
      { id: 1, userId: "123", userName: "Juan", text: "Que linda!" },
      { id: 2, userId: "456", userName: "María", text: "Hermosa" },
    ],
    images: ["/imagen1.jpg"],
  },
  { id: 3, title: "Hola mundo!!", comments: [], images: [] },
  {
    id: 4,
    title: "Pitufo, mi perro",
    comments: [{ id: 2, userId: "456", userName: "María", text: "Hermoso" }],
    images: ["/imagen2.jpeg"],
  },
  {
    id: 5,
    title: "Mi cerveza favorita",
    comments: [],
    images: ["/imagen5.png", "/imagen6.jpg"],
  },
  { id: 6, title: "Hola de nuevo, mundo!", comments: [], images: [] },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 2;
  const start = (page - 1) * limit;
  const end = start + limit;
  const totalPosts = posts.length;

  const paginatedPosts = posts.slice(start, end);

  return NextResponse.json({
    posts: paginatedPosts,
    totalPosts: totalPosts,
    limit: limit,
  });
}

export async function POST(req: Request) {
  try {
    const { comment, postId, userId, userName } = await req.json();

    if (!comment || !postId || !userId || !userName) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    const post = posts.find((p) => p.id === postId);

    if (!post) {
      return NextResponse.json(
        { error: "Post no encontrado" },
        { status: 404 }
      );
    }

    const newComment = {
      id: Date.now(),
      userId,
      userName,
      text: comment,
    };

    post.comments.push(newComment);

    return NextResponse.json(post);
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
