import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type Props = {
  open: boolean;
  onClose: () => void;
  transactionId: string;
  restaurantId: number;
  menuIds: number[];
};

export default function GiveReviewModal({
  open,
  onClose,
  transactionId,
  restaurantId,
  menuIds,
}: Props) {
  const token = localStorage.getItem("access_token");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!rating) {
      alert("Please give a rating");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/review`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId,
          restaurantId,
          star: rating,
          comment,
          menuIds,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to submit review");
      }

      // ✅ MARK AS REVIEWED (FRONTEND FLAG)
      localStorage.setItem(
        `reviewed_${transactionId}_${restaurantId}`,
        "true"
      );

      onClose();
    } catch (error: any) {
      alert(error.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Give Review</h3>
          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        {/* STAR RATING */}
        <p className="text-sm font-medium mb-2 text-center">
          Give Rating
        </p>
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="text-3xl"
            >
              <span
                className={
                  star <= rating ? "text-yellow-400" : "text-neutral-300"
                }
              >
                ★
              </span>
            </button>
          ))}
        </div>

        {/* COMMENT */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Please share your thoughts about our service!"
          rows={4}
          className="w-full border rounded-xl px-4 py-3 text-sm resize-none mb-6"
        />

        {/* ACTION */}
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="w-full bg-red-600 disabled:opacity-50 text-white py-3 rounded-full font-medium"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
