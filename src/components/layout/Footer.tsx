import {
  Facebook,
  Instagram,
  Linkedin,
  Music2,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-black text-white px-6 py-10">
      <div className="max-w-[1440px] mx-auto">
        {/* ================= MOBILE ================= */}
        <div className="lg:hidden">
          <div className="flex items-center gap-3 mb-4">
            <img src="/Foody.png" alt="Foody" className="h-8 w-8" />
            <span className="text-xl font-semibold">Foody</span>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed mb-6">
            Enjoy homemade flavors & chef’s signature dishes,
            freshly prepared every day. Order online or visit our
            nearest branch.
          </p>

          <div className="mb-8">
            <p className="text-sm font-semibold mb-3">
              Follow on Social Media
            </p>

            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Linkedin, Music2].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="h-9 w-9 rounded-full bg-neutral-800 flex items-center justify-center"
                  >
                    <Icon size={18} />
                  </div>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
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
        </div>

        {/* ================= WEB ================= */}
        <div className="hidden lg:grid grid-cols-4 gap-12 py-10">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/Foody.png" alt="Foody" className="h-8 w-8" />
              <span className="text-xl font-semibold">Foody</span>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed max-w-md mb-6">
              Enjoy homemade flavors & chef’s signature dishes,
              freshly prepared every day. Order online or visit our
              nearest branch.
            </p>

            <p className="text-sm font-semibold mb-3">
              Follow on Social Media
            </p>

            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Linkedin, Music2].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="
                      h-10 w-10 rounded-full
                      bg-neutral-800
                      flex items-center justify-center
                      hover:bg-red-600
                      transition
                      cursor-pointer
                    "
                  >
                    <Icon size={18} />
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="hover:text-white cursor-pointer">All Food</li>
              <li className="hover:text-white cursor-pointer">Nearby</li>
              <li className="hover:text-white cursor-pointer">Discount</li>
              <li className="hover:text-white cursor-pointer">Best Seller</li>
              <li className="hover:text-white cursor-pointer">Delivery</li>
              <li className="hover:text-white cursor-pointer">Lunch</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="hover:text-white cursor-pointer">How to Order</li>
              <li className="hover:text-white cursor-pointer">Payment Methods</li>
              <li className="hover:text-white cursor-pointer">Track My Order</li>
              <li className="hover:text-white cursor-pointer">FAQ</li>
              <li className="hover:text-white cursor-pointer">Contact Us</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
