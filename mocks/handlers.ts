/* eslint-disable prettier/prettier */
import { http, HttpResponse } from "msw";

import { MovieInterface } from "@/types";

let movies: MovieInterface[] = [
	{
		id: "1and3011",
		imageURL:
			"https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
		title: "Avengers Endgame",
		summary:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan arcu. Integer tincidunt felis eget urna egestas, a convallis libero maximus. Donec vel bibendum.",
		rating: 5.3,
		status: undefined,
	},
	{
		id: "2301abc",
		imageURL:
			"https://upload.wikimedia.org/wikipedia/en/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg",
		title: "Star Wars: Episode VII - The Force Awakens",
		summary:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan arcu. Integer tincidunt felis eget urna egestas, a convallis libero maximus. Donec vel bibendum.",
		rating: 8.2,
		status: undefined,
	},
	{
		id: "1and3012",
		imageURL:
			"https://static.displate.com/280x392/displate/2021-01-28/61f2a61d84a7c385afb8a4dd139810d3_9180d9b5b158d5b3dd86c841b1f7a500.jpg",
		title: "Guardians of the galaxy",
		summary:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan arcu. Integer tincidunt felis eget urna egestas, a convallis libero maximus. Donec vel bibendum.",
		rating: 7.3,
		status: undefined,
	},
	{
		id: "2301abc3",
		imageURL:
			"https://m.media-amazon.com/images/S/pv-target-images/5cab403b71444056c7ef11d1e299d46b59716e75a62fa879c019ce957db164da.jpg",
		title: "Harry Potter and the prisoner of Azkaban",
		summary:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan arcu. Integer tincidunt felis eget urna egestas, a convallis libero maximus. Donec vel bibendum.",
		rating: 6.9,
		status: undefined,
	},
	{
		id: "1and30115",
		imageURL:
			"https://play-lh.googleusercontent.com/4JYwbRXwa9PnWSZWwzCDkrfm_UaV83aQWR4cfMdoE8fsPxk4XoGF-1uLrFKBSJHihDI",
		title: "Ice age 5 - collision course",
		summary:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan arcu. Integer tincidunt felis eget urna egestas, a convallis libero maximus. Donec vel bibendum.",
		rating: 5.3,
		status: undefined,
	},
	{
		id: "2301abc7",
		imageURL:
			"https://static.posters.cz/image/750/plakaty/thor-ragnarok-one-sheet-i50061.jpg",
		title: "Thor: Ragnarok",
		summary:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan arcu. Integer tincidunt felis eget urna egestas, a convallis libero maximus. Donec vel bibendum.",
		rating: 7.2,
		status: undefined,
	},
];

export const handlers = [
	http.get("/mockApi/movies", async ({ request }) => {
		const url = new URL(request.url);
		const filteredMovies = movies.filter(
			(movie) => movie.status !== "disliked"
		);
		const cursor = Number(url.searchParams.get("cursor")) || 0;
		const limit = Number(url.searchParams.get("limit")) || 2;
		const nextCursor =
			cursor + limit <= filteredMovies.length ? cursor + limit : null;
		const prevCursor = cursor - limit >= 0 ? cursor - limit : null;

		return HttpResponse.json({
			movies: filteredMovies.slice(cursor, cursor + limit),
			nextCursor,
			prevCursor,
		});
	}),
	http.get("/mockApi/movies/favourites", () => {
		return HttpResponse.json(
			movies.filter((movie) => movie.status === "liked")
		);
	}),
	http.patch(
		"/mockApi/movies/removeFavourite/:movieId",
		async ({ params }) => {
			const { movieId } = params;
			const selectedMovie = movies.find((movie) => movie.id === movieId);

			if (!selectedMovie) {
				new HttpResponse("Not found", {
					status: 404,
					headers: {
						"Content-Type": "text/plain",
					},
				});
			}

			movies = movies.map((movie) =>
				movie.id === movieId ? { ...movie, status: undefined } : movie
			);

			return HttpResponse.json("Success", {
				status: 200,
				headers: {
					"Content-Type": "text/plain",
				},
			});
		}
	),
	http.patch("/mockApi/movies/addFavourite/:movieId", async ({ params }) => {
		const { movieId } = params;
		const selectedMovie = movies.find((movie) => movie.id === movieId);

		if (!selectedMovie) {
			new HttpResponse("Not found", {
				status: 404,
				headers: {
					"Content-Type": "text/plain",
				},
			});
		}

		movies = movies.map((movie) =>
			movie.id === movieId ? { ...movie, status: "liked" } : movie
		);

		return HttpResponse.json("Success", {
			status: 200,
			headers: {
				"Content-Type": "text/plain",
			},
		});
	}),
	http.patch("/mockApi/movies/dislikeMovie/:movieId", async ({ params }) => {
		const { movieId } = params;
		const selectedMovie = movies.find((movie) => movie.id === movieId);

		if (!selectedMovie) {
			new HttpResponse("Not found", {
				status: 404,
				headers: {
					"Content-Type": "text/plain",
				},
			});
		}

		movies = movies.map((movie) =>
			movie.id === movieId ? { ...movie, status: "disliked" } : movie
		);

		return HttpResponse.json("Success", {
			status: 200,
			headers: {
				"Content-Type": "text/plain",
			},
		});
	}),
];
