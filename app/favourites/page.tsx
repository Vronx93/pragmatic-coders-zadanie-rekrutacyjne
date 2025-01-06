/* eslint-disable prettier/prettier */
"use client";

import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@nextui-org/spinner";

import { title } from "@/components/primitives";
import { FavouriteMovie } from "@/components/favourite-movie";
import { MovieInterface } from "@/types";
import { fetchFavourites, removeFavourite } from "@/mocks/api";

export default function FavouritesPage() {
	const { data: favouritesData, isLoading } = useQuery<MovieInterface[]>({
		queryKey: ["favourites"],
		queryFn: fetchFavourites,
		staleTime: Infinity,
	});

	if (isLoading) {
		return (
			<div className="flex items-center justify-center w-full h-full">
				<Spinner size="lg" />
			</div>
		);
	}

	return (
		<section className="flex flex-col gap-12">
			<h1 className={title()}>Favourites</h1>
			{favouritesData && favouritesData.length > 0 ? (
				<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{favouritesData.map((movie) => (
						<li key={movie.id}>
							<FavouriteMovie
								id={movie.id}
								imageURL={movie.imageURL}
								rating={movie.rating}
								removeFunc={removeFavourite}
								title={movie.title}
							/>
						</li>
					))}
				</ul>
			) : (
				<p>Your favourites list is empty</p>
			)}
		</section>
	);
}
