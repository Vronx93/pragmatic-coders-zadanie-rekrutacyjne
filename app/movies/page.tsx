"use client";

import { Movie } from "@/components/movie";
import { title } from "@/components/primitives";
import { Navigation } from "swiper/modules";
import {
  Swiper,
  SwiperClass,
  SwiperRef,
  SwiperSlide,
  useSwiper,
} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "@nextui-org/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import useMockServiceWorkerState from "@/hooks/useMockServiceWorkerState";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export interface Movie {
  id: string;
  imageURL: string;
  rating: number;
  summary: string;
  title: string;
  isFavourite?: boolean;
}

export default function MoviesPage() {
  const swiperRef = useRef<SwiperRef>(null);
  const [index, setIndex] = useState(0);
  const [isFirst, setIsFirst] = useState<boolean>();
  const [isLast, setIsLast] = useState<boolean>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const isWorkerReady = useMockServiceWorkerState((state) => state.isReady);

  // const { data, isLoading } = useQuery();

  // setMovies(data.movies);
  // setIsFirst(!data.hasPrevPage);
  // setIsLast(!data.hasNextPage);

  // useEffect(() => {
  //   if (isWorkerReady) {
  //     fetchMovie(index);
  //   }
  // }, [isWorkerReady, index]);

  return (
    <div className="flex flex-col gap-12">
      <h1 className={title()}>
        Explore <span className={title({ color: "violet" })}>movies</span>
      </h1>
      <div className="flex items-center gap-2 w-full max-w-2xl">
        {movies.length > 0 && (
          <Button
            isIconOnly
            size="lg"
            radius="full"
            isDisabled={isFirst}
            className="prev-btn hidden sm:flex"
            title="Slide to previous movie"
            // onClick={handlePrevClick}
          >
            <ChevronLeft size={32} strokeWidth={1} />
          </Button>
        )}
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          navigation={{
            prevEl: ".prev-btn",
            nextEl: ".next-btn",
          }}
          slidesPerView={1}
          spaceBetween={16}
          centeredSlides
          className="max-w-full !pt-4"
          grabCursor
          // initialSlide={movies.length === 2 ? 1 : isFirst ? 0 : 1}
          // onSlideChange={handleSlideChange}
          // onSlideNextTransitionEnd={() => handleNextClick()}
          // onSlidePrevTransitionEnd={() => handlePrevClick()}
        >
          <SwiperSlide key={crypto.randomUUID()}>
            <Movie movieIndex={index - 1} />
          </SwiperSlide>
          <SwiperSlide key={crypto.randomUUID()}>
            <Movie movieIndex={index} />
          </SwiperSlide>
          <SwiperSlide key={crypto.randomUUID()}>
            <Movie movieIndex={index + 1} />
          </SwiperSlide>
        </Swiper>
        {movies.length > 0 && (
          <Button
            isIconOnly
            size="lg"
            radius="full"
            className="next-btn hidden sm:flex"
            isDisabled={isLast}
            title="Slide to next movie"
            // onClick={handleNextClick}
          >
            <ChevronRight size={32} strokeWidth={1} />
          </Button>
        )}
      </div>
    </div>
  );
}
