import { NextResponse } from "next/server";

let posts = [
  { id: 1, title: "Post de prueba", comments: ["¡Hola mundo!"] },
];

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const { comment, postId } = await req.json();
  const post = posts.find(p => p.id === postId);
  
  if (post) {
    post.comments.push(comment);
  }

  return NextResponse.json(post);
}
