interface RememberCheckboxProps {
  id?: string;
  label: string;
}

export default function RememberCheckbox({
  id = "remember",
  label,
}: RememberCheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-3 cursor-pointer select-none"
    >
      {/* Checkbox */}
      <span className="relative">
        <input
          id={id}
          type="checkbox"
          className="
            peer
            appearance-none
            w-[20px] h-[20px]
            border border-[#D0D5DD]
            rounded-sm
            bg-white
            cursor-pointer

            focus:outline-none
            focus:ring-2
            focus:ring-[#D0D5DD]
            focus:ring-offset-2
          "
        />

        {/* CHECK ICON */}
        <svg
          className="
            pointer-events-none
            absolute inset-0
            m-auto
            h-3 w-3
            text-[#101828]
            opacity-0
            peer-checked:opacity-100
          "
          viewBox="0 0 12 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="1 5.5 4.5 9 11 1" />
        </svg>
      </span>

      {/* Label */}
      <span className="text-sm text-[#667085]">
        {label}
      </span>
    </label>
  );
}
