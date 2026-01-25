import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import HeroImage from "@/assets/Hero.png";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchRestoQuery } from "@/services/queries/useSearchRestoQuery";

export default function HeroSection() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 300);

  const { data, isLoading, isError } =
    useSearchRestoQuery(debouncedKeyword, 1, 5);

  const restaurants = data?.data?.restaurants ?? [];

  const handleClickResto = (id: number) => {
  const token = localStorage.getItem("access_token");

    if (!token) {
        navigate("/login");
        return;
    }

    navigate(`/restaurant/${id}`);
    };

  return (
    <section
      className="
        relative w-full
        h-[420px] md:h-[560px] lg:h-[827px]
        pt-14
        bg-black
      "
    >
      {/* Background Image */}
      <img
        src={HeroImage}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div
        className="
          relative z-10 h-full
          max-w-[1440px] mx-auto
          flex flex-col justify-center
          px-6 md:px-12 lg:px-24
        "
      >
        {/* Title */}
        <h1
          className="
            text-white font-extrabold tracking-tight
            text-[32px] leading-[40px]
            md:text-[48px] md:leading-[56px]
            lg:text-[64px] lg:leading-[72px]
            max-w-[760px]
          "
        >
          Explore Culinary Experiences
        </h1>

        {/* Subtitle */}
        <p
          className="
            mt-5 text-neutral-200
            text-sm md:text-base
            max-w-[560px]
          "
        >
          Search and refine your choice to discover the perfect restaurant.
        </p>

        {/* Search Input */}
        <div className="relative mt-10 w-full max-w-[900px]">
          <Search
            size={22}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search restaurants, food and drink"
            className="
              w-full
              h-[56px] md:h-[64px]
              pl-14 pr-6
              rounded-full
              bg-white
              text-base
              outline-none
              shadow-xl
              focus:ring-2 focus:ring-red-600
            "
          />
        </div>

        {/* Search Result Preview */}
        {debouncedKeyword && (
          <div className="mt-4 bg-white rounded-xl shadow-lg max-w-[900px] p-4">
            {isLoading && (
              <p className="text-sm text-neutral-500">
                Searching...
              </p>
            )}

            {isError && (
              <p className="text-sm text-red-600">
                Failed to fetch data
              </p>
            )}

            {!isLoading && restaurants.length === 0 && (
              <p className="text-sm text-neutral-500">
                No restaurant found
              </p>
            )}

            {restaurants.map((item: any) => (
              <button
                key={item.id}
                onClick={() => handleClickResto(item.id)}
                className="
                  w-full text-left
                  flex items-center gap-3
                  py-3 px-2
                  rounded-lg
                  hover:bg-neutral-100
                  transition
                "
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-10 w-10 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {item.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    ⭐ {item.star} · {item.place}
                  </p>
                </div>

                <span className="text-xs text-neutral-400 whitespace-nowrap">
                  {item.distance} km
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
