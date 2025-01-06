/* eslint-disable prettier/prettier */
/* eslint-disable import/order */

"use client";

import { Movie } from "@/components/movie";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "@nextui-org/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Spinner } from "@nextui-org/spinner";

import { dislikeMovie, fetchMovies } from "@/mocks/api";
import { title } from "@/components/primitives";
import { FetchMovieProps, MovieDataInterface } from "@/types";

export default function MoviesPage() {
	const limit = 1;
	const swiperRef = useRef<SwiperRef>(null);
	const [index, setIndex] = useState(0);
	const [hasNext, setHasNext] = useState(false);
	let isSliding = false;

	const {
		data: moviesData,
		error,
		fetchNextPage,
		isLoading,
		hasNextPage,
	} = useInfiniteQuery<MovieDataInterface>({
		queryKey: ["movies"],
		queryFn: ({ pageParam }) =>
			fetchMovies(pageParam as unknown as FetchMovieProps),
		initialPageParam: { cursor: 0, limit: 2 },
		getNextPageParam: (lastPage) => {
			if (!lastPage.nextCursor) {
				return undefined;
			}

			return { cursor: lastPage.nextCursor, limit: limit };
		},
		staleTime: Infinity,
	});

	const displayedMovies = moviesData?.pages.flatMap(
		(moviePage) => moviePage.movies
	);

	const handleSlideNext = async () => {
		await fetchNextPage();
		if (swiperRef.current && !isSliding) {
			isSliding = true;
			setIndex(swiperRef.current.swiper.activeIndex);
			if (displayedMovies && displayedMovies[index].status !== "liked") {
				dislikeMovie(displayedMovies[index].id);
				swiperRef.current.swiper.activeIndex = index;
				setIndex(swiperRef.current.swiper.activeIndex);
			}
		}
	};

	const handleSlidePrev = async () => {
		if (swiperRef.current && !isSliding) {
			isSliding = true;

			setIndex(swiperRef.current.swiper.activeIndex);
		}
	};

	const handleSlideOnAction = async () => {
		await fetchNextPage();
		if (swiperRef.current && !isSliding) {
			isSliding = true;
			swiperRef.current.swiper.slideNext();
			setIndex(swiperRef.current.swiper.activeIndex);
		}
	};

	useEffect(() => {
		if (!moviesData) {
			return;
		}
		if (moviesData?.pages.length > index + 1 || hasNextPage) {
			setHasNext(true);
		} else {
			setHasNext(false);
		}
	}, [hasNextPage, index]);

	if (isLoading) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<Spinner size="md" />
			</div>
		);
	}

	if (error) {
		// eslint-disable-next-line no-console
		console.error(error);
	}

	return (
		<div className="flex flex-col gap-12">
			<h1 className={title()}>
				Explore{" "}
				<span className={title({ color: "violet" })}>movies</span>
			</h1>
			<div className="flex items-center gap-2 w-full max-w-2xl">
				{displayedMovies && displayedMovies.length > 0 ? (
					<>
						<Button
							isIconOnly
							className="prev-btn hidden sm:flex"
							isDisabled={index === 0}
							radius="full"
							size="lg"
							title="Slide to previous movie">
							<ChevronLeft size={32} strokeWidth={1} />
						</Button>
						<Swiper
							ref={swiperRef}
							centeredSlides
							grabCursor
							className="max-w-full !pt-4"
							modules={[Navigation]}
							navigation={{
								prevEl: ".prev-btn",
								nextEl: ".next-btn",
							}}
							slidesPerView={1}
							spaceBetween={16}
							onSlideNextTransitionEnd={() => (isSliding = false)}
							onSlideNextTransitionStart={handleSlideNext}
							onSlidePrevTransitionEnd={() => (isSliding = false)}
							onSlidePrevTransitionStart={handleSlidePrev}>
							{displayedMovies.map((movie) => (
								<SwiperSlide key={crypto.randomUUID()}>
									<Movie
										id={movie.id}
										imageURL={movie.imageURL}
										rating={movie.rating}
										slideNextFunc={handleSlideOnAction}
										status={movie.status}
										summary={movie.summary}
										title={movie.title}
									/>
								</SwiperSlide>
							))}
						</Swiper>
						<Button
							isIconOnly
							className="next-btn hidden sm:flex"
							isDisabled={!hasNext}
							radius="full"
							size="lg"
							title="Slide to next movie">
							<ChevronRight size={32} strokeWidth={1} />
						</Button>
					</>
				) : (
					<p>
						There are no more movies right now. Thank you for
						testing, if you wish you can refresh to start again :)
					</p>
				)}
			</div>
		</div>
	);
}
