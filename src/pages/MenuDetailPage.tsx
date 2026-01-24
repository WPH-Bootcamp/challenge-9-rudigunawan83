import { useParams } from "react-router-dom";
import { Star, Share2 } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MenuTab from "@/components/menu/MenuTab";
import MenuCard from "@/components/menu/MenuCard";
import ReviewCard from "@/components/menu/ReviewCard";

import { useRestaurantDetailQuery } from "@/services/queries/useRestaurantDetailQuery";

export default function MenuDetailPage() {
  const { id } = useParams();
  const restoId = Number(id);

  const { data, isLoading } =
    useRestaurantDetailQuery(restoId);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="pt-14 px-4">Loading...</main>
      </>
    );
  }

  const resto = data?.data;
  if (!resto) return null;

  return (
    <>
      <Header />

      <main className="pt-14 bg-white">
        {/* HERO */}
        <div className="px-4 mt-4">
          <img
            src={resto.logo}
            alt={resto.name}
            className="w-full h-48 rounded-2xl object-cover"
          />
        </div>

        {/* INFO */}
        <section className="px-4 mt-4">
          <div className="flex justify-between">
            <div>
              <h1 className="font-semibold text-lg">
                {resto.name}
              </h1>
              <div className="flex items-center gap-1 text-xs text-neutral-500">
                <Star size={12} className="text-yellow-500" />
                <span>{resto.star}</span>
                <span>·</span>
                <span>{resto.place}</span>
                <span>·</span>
                <span>{resto.distance} km</span>
              </div>
            </div>

            <button className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center">
              <Share2 size={16} />
            </button>
          </div>
        </section>

        {/* TAB */}
        <section className="px-4 mt-6">
          <div className="flex gap-3">
            <MenuTab label="All Menu" active />
            <MenuTab label="Food" />
            <MenuTab label="Drink" />
          </div>
        </section>

        {/* MENU GRID */}
        <section className="px-4 mt-4 grid grid-cols-2 gap-4">
          {resto.menus.map((menu) => (
            <MenuCard
              key={menu.id}
              item={menu}
              onAdd={() => console.log("ADD", menu)}
            />
          ))}
        </section>

        {/* REVIEW (dummy dulu) */}
        <section className="px-4 mt-10">
          <h2 className="font-semibold mb-3">Review</h2>
          <ReviewCard
            name="Michael Brown"
            date="25 August 2023"
            rating={5}
            comment="Great food and fast service!"
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
