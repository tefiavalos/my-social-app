import { Comment } from "@/types/posts";
import Image from "next/image";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: {
    id: number;
    title: string;
    comments: Comment[];
    images?: string[];
  };
  currentImage: number;
  handleNextImage: () => void;
  handlePrevImage: () => void;
}

const Modal: React.FC<Props> = ({
  setIsModalOpen,
  post,
  currentImage,
  handlePrevImage,
  handleNextImage,
}) => {
  return (
    post.images &&
    post.images.length && (
      <div
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        onClick={() => setIsModalOpen(false)}
      >
        <div className="relative p-4 max-w-full max-h-full">
          <Image
            src={post.images[currentImage] ?? "/imagen1"}
            alt={`Imagen ${currentImage + 1}`}
            className="w-auto h-auto max-w-screen max-h-screen object-contain rounded-xl"
            width={350}
            height={350}
            onClick={(e) => e.stopPropagation()}
          />
          {post.images.length > 1 && (
            <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
              <button onClick={handlePrevImage} className="text-white text-3xl">
                ◀
              </button>
              <button onClick={handleNextImage} className="text-white text-3xl">
                ▶
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Modal;
