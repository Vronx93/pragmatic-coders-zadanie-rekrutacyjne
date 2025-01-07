/* eslint-disable prettier/prettier */
import axios from "axios";
import toast from "react-hot-toast";

import { queryClient } from "@/app/providers";
import { FetchMovieProps, PaginationOldDataInterface } from "@/types";

export const fetchMovies = async ({ cursor, limit }: FetchMovieProps) => {
  const response = await axios.get("/mockApi/movies", {
    params: { cursor, limit },
  });

  return response.data;
};

export const fetchFavourites = async () => {
  const response = await axios.get("mockApi/movies/favourites");

  return response.data;
};

export const removeFavourite = async (movieId: string) => {
  const response = await axios.patch(
    `/mockApi/movies/removeFavourite/${movieId}`
  );

  if (response.status === 200) {
    // favourites page
    queryClient.invalidateQueries({ queryKey: ["favourites"] });
    // movies page
    queryClient.setQueryData(
      ["movies"],
      (oldData: PaginationOldDataInterface) => {
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            movies: page.movies.map((movie) =>
              movie.id === movieId ? { ...movie, status: undefined } : movie
            ),
          })),
        };
      }
    );
    toast.success("Removed from favourites");
  } else {
    toast.error("An error occured. Try again please.");
  }
};

export const addFavourite = async (movieId: string) => {
  const response = await axios.patch(`/mockApi/movies/addFavourite/${movieId}`);

  if (response.status === 200) {
    queryClient.setQueryData(
      ["movies"],
      (oldData: PaginationOldDataInterface) => {
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            movies: page.movies.map((movie) =>
              movie.id === movieId ? { ...movie, status: "liked" } : movie
            ),
          })),
        };
      }
    );

    toast.success("Added to favourites");
  } else {
    toast.error("An error occured. Try again please.");
  }
};

export const dislikeMovie = async (movieId: string) => {
  const response = await axios.patch(`/mockApi/movies/dislikeMovie/${movieId}`);

  if (response.status === 200) {
    queryClient.invalidateQueries({ queryKey: ["movies"] });
    toast.success("Disliked");
  } else {
    toast.error("An error occured. Try again please.");
  }
};
