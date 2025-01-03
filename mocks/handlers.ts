import { http, HttpResponse } from "msw";

interface Movie {
  id: string;
  imageURL: string;
  title: string;
  summary: string;
  rating: number;
  isFavourite: boolean;
}

let movies: Movie[] = [
  {
    id: "1and3011",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
    title: "Avengers Endgame",
    summary: "Lorem ipsum....",
    rating: 5.3,
    isFavourite: false,
  },
  {
    id: "2301abc",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg",
    title: "Star Wars: Episode VII - The Force Awakens",
    summary: "Lorem ipsum....",
    rating: 8.2,
    isFavourite: false,
  },
  {
    id: "1and3012",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
    title: "Avengers Endgame",
    summary: "Lorem ipsum....",
    rating: 5.3,
    isFavourite: false,
  },
  {
    id: "2301abc3",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg",
    title: "Star Wars: Episode VII - The Force Awakens",
    summary: "Lorem ipsum....",
    rating: 8.2,
    isFavourite: false,
  },
  {
    id: "1and30115",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
    title: "Avengers Endgame",
    summary: "Lorem ipsum....",
    rating: 5.3,
    isFavourite: false,
  },
  {
    id: "2301abc7",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg",
    title: "Star Wars: Episode VII - The Force Awakens",
    summary: "Lorem ipsum....",
    rating: 8.2,
    isFavourite: false,
  },
];

export const handlers = [
  http.get("/mockApi/movie", ({ request }) => {
    const url = new URL(request.url);
    const index = Number(url.searchParams.get("index")) || 0;
    const hasPrevPage = index - 1 >= 0;
    const hasNextPage = index + 1 < movies.length;
    const shouldReturnMovie = index > 0 && index < movies.length;
    return HttpResponse.json({
      movie: shouldReturnMovie ? movies[index] : null,
      hasNextPage,
      hasPrevPage,
    });
  }),
  http.get("/mockApi/movies/favourites", () => {
    return HttpResponse.json(
      movies.filter((movie) => movie.isFavourite === true)
    );
  }),
  http.patch(
    "/mockApi/movies/removeFavourite/:movieId",
    async ({ request, params, cookies }) => {
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
        movie.id === movieId ? { ...movie, isFavourite: false } : movie
      );
      return HttpResponse.json("Success", {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }
  ),
  http.patch(
    "/mockApi/movies/addFavourite/:movieId",
    async ({ request, params, cookies }) => {
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
        movie.id === movieId ? { ...movie, isFavourite: true } : movie
      );
      return HttpResponse.json("Success", {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }
  ),
];
