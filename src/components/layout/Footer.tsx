import {
  Facebook,
  Instagram,
  Linkedin,
  Music2,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-black text-white px-6 py-10 rounded-t-3xl">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-4">
        <img src="/Foody.png" alt="Foody" className="h-8 w-8" />
        <span className="text-xl font-semibold">Foody</span>
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-300 leading-relaxed mb-6">
        Enjoy homemade flavors & chef’s signature dishes, freshly
        prepared every day. Order online or visit our nearest branch.
      </p>

      {/* Social Media */}
      <div className="mb-8">
        <p className="text-sm font-semibold mb-3">
          Follow on Social Media
        </p>

        <div className="flex items-center gap-4">
          <div className="h-9 w-9 rounded-full bg-neutral-800 flex items-center justify-center">
            <Facebook size={18} />
          </div>
          <div className="h-9 w-9 rounded-full bg-neutral-800 flex items-center justify-center">
            <Instagram size={18} />
          </div>
          <div className="h-9 w-9 rounded-full bg-neutral-800 flex items-center justify-center">
            <Linkedin size={18} />
          </div>
          <div className="h-9 w-9 rounded-full bg-neutral-800 flex items-center justify-center">
            <Music2 size={18} />
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="grid grid-cols-2 gap-6 text-sm">
        {/* Explore */}
        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-neutral-400">
            <li>All Food</li>
            <li>Nearby</li>
            <li>Discount</li>
            <li>Best Seller</li>
            <li>Delivery</li>
            <li>Lunch</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-semibold mb-3">Help</h4>
          <ul className="space-y-2 text-neutral-400">
            <li>How to Order</li>
            <li>Payment Methods</li>
            <li>Track My Order</li>
            <li>FAQ</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
