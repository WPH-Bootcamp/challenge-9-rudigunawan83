interface MenuTabProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function MenuTab({
  label,
  active,
  onClick,
}: MenuTabProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-xs whitespace-nowrap
        transition
        ${
          active
            ? "bg-red-700 text-white"
            : "bg-neutral-100 text-neutral-600"
        }
      `}
    >
      {label}
    </button>
  );
}
