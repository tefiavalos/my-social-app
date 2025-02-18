interface HamburgerButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function HamburgerButton({
  toggle,
}: HamburgerButtonProps) {
  return (
    <button className="md:hidden flex flex-col gap-1 w-8 h-6" onClick={toggle}>
      <span className="w-full h-1 bg-white rounded" />
      <span className="w-full h-1 bg-white rounded" />
      <span className="w-full h-1 bg-white rounded" />
    </button>
  );
}
