import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type PaymentState = {
  orderId?: string;
  paymentMethod: string;
  totalPrice: number;
  totalItems: number;
  deliveryFee: number;
  serviceFee: number;
  createdAt: string;
};

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as PaymentState | null;

  // ⛔ kalau user akses langsung halaman ini
  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  if (!state) return null;

  const {
    orderId,
    paymentMethod,
    totalPrice,
    totalItems,
    deliveryFee,
    serviceFee,
    createdAt,
  } = state;

  const total = totalPrice + deliveryFee + serviceFee;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <Header />

      <main className="min-h-screen bg-neutral-100 flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 text-center">
          {/* BRAND */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-red-600 rounded-full" />
            <span className="font-bold text-lg">Foody</span>
          </div>

          {/* ICON */}
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl">
              ✓
            </div>
          </div>

          <h1 className="font-semibold text-lg mb-1">
            Payment Success
          </h1>
          <p className="text-sm text-neutral-500 mb-6">
            Your payment has been successfully processed.
          </p>

          {/* DETAIL */}
          <div className="text-sm text-neutral-600 space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Date</span>
              <span className="font-medium text-neutral-800">
                {formattedDate}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Payment Method</span>
              <span className="font-medium text-neutral-800">
                {paymentMethod}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Price ({totalItems} items)</span>
              <span className="font-medium text-neutral-800">
                Rp{totalPrice.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-medium text-neutral-800">
                Rp{deliveryFee.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Service Fee</span>
              <span className="font-medium text-neutral-800">
                Rp{serviceFee.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <div className="border-t border-dashed my-4" />

          <div className="flex justify-between font-semibold mb-6">
            <span>Total</span>
            <span className="text-red-600">
              Rp{total.toLocaleString("id-ID")}
            </span>
          </div>

          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-red-600 text-white py-3 rounded-full font-medium hover:bg-red-700 transition"
          >
            See My Orders
          </button>

          {orderId && (
            <p className="mt-4 text-xs text-neutral-400">
              Order ID: {orderId}
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
