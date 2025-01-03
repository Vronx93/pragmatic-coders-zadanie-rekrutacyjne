"use client";

import { title } from "@/components/primitives";
import { useCallback, useEffect, useState } from "react";
import { Movie as MovieInterface } from "../movies/page";
import axios from "axios";
import useMockServiceWorkerState from "@/hooks/useMockServiceWorkerState";
import { FavouriteMovie } from "@/components/favourite-movie";
import toast from "react-hot-toast";

export default function FavouritesPage() {
  const isWorkerReady = useMockServiceWorkerState((state) => state.isReady);
  const [favourites, setFavourites] = useState<MovieInterface[]>();
  const getFavourites = async () => {
    const response = await axios.get("/mockApi/movies/favourites");
    setFavourites(response.data);
  };

  const removeFromFavourites = useCallback(async (id: string) => {
    const response = await axios.patch(`/mockApi/movies/removeFavourite/${id}`);
    if (response.status === 200) {
      getFavourites();
      toast.success("Successfully removed");
    } else {
      toast.error("An error occured. Try again please.");
    }
  }, []);

  useEffect(() => {
    if (isWorkerReady) {
      getFavourites();
    }
  }, [isWorkerReady, removeFromFavourites]);

  return (
    <section className="flex flex-col gap-12">
      <h1 className={title()}>Favourites</h1>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {favourites &&
          favourites.map((movie) => (
            <li key={movie.id}>
              <FavouriteMovie
                id={movie.id}
                title={movie.title}
                rating={movie.rating}
                imageURL={movie.imageURL}
                removeFunc={removeFromFavourites}
              />
            </li>
          ))}
      </ul>
    </section>
  );
}
