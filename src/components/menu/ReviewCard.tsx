import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  date: string;
  rating: number;
  comment: string;
}

export default function ReviewCard({
  name,
  date,
  rating,
  comment,
}: ReviewCardProps) {
  return (
    <div className="border-b py-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-8 w-8 rounded-full bg-neutral-300" />

        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-neutral-400">{date}</p>
        </div>
      </div>

      <div className="flex gap-1 mb-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            size={12}
            className="text-yellow-500"
          />
        ))}
      </div>

      <p className="text-sm text-neutral-600">{comment}</p>
    </div>
  );
}
