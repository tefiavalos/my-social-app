"use client";

interface Props {
  text: string;
}

const Header: React.FC<Props> = ({ text }) => {
  return <h1 className="text-2xl font-bold mb-4 text-accent">{text}</h1>;
};

export default Header;
