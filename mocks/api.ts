import { queryClient } from "@/app/providers";
import axios from "axios";
import toast from "react-hot-toast";

export const fetchMovie = async (movieIndex: number) => {
  const response = await axios.get("/mockApi/movie", {
    params: { movieIndex },
  });
  return response.data;
};

export const removeFavourite = async (movieId: string) => {
  const response = await axios.patch(
    `/mockApi/movies/removeFavourite/${movieId}`
  );
  if (response.status === 200) {
    queryClient.invalidateQueries({ queryKey: ["movie", movieId] });
    toast.success("Successfully removed");
  } else {
    toast.error("An error occured. Try again please.");
  }
};

export const addFavourite = async (movieId: string) => {
  const response = await axios.patch(`/mockApi/movies/addFavourite/${movieId}`);
  if (response.status === 200) {
    queryClient.invalidateQueries({ queryKey: ["movie", movieId] });
    toast.success("Added to favourites");
  } else {
    toast.error("An error occured. Try again please.");
  }
};
