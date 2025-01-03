import { FC } from "react";
import { subtitle, title as titleClass } from "./primitives";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Check, Trash, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { addFavourite, fetchMovie, removeFavourite } from "@/mocks/api";
import { Spinner } from "@nextui-org/spinner";

interface MovieProps {
  // id: string;
  // title: string;
  // rating: number;
  // imageURL?: string;
  // summary: string;
  // isFavourite?: boolean;
  // addToFavouritesFunc: (id: string) => void;
  // removeFunc: (id: string) => void;
  movieIndex: number;
}

interface MovieInterface {
  id: string;
  title: string;
  rating: number;
  imageURL: string;
  summary: string;
  isFavourite: boolean;
}

interface DataInterface {
  movie: MovieInterface;
  hasNexPage: boolean;
  hasPrevPage: boolean;
}

export const Movie: FC<MovieProps> = ({
  // id,
  // title,
  // rating,
  // imageURL,
  // summary,
  // isFavourite,
  // addToFavouritesFunc,
  // removeFunc,
  movieIndex,
}) => {
  const { data, isLoading, error } = useQuery<DataInterface | null>({
    queryKey: ["movie", movieIndex],
    queryFn: () => fetchMovie(movieIndex),
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    console.error(error);
    return;
  }

  if (data?.movie === null) {
    return <p>no data</p>;
  }

  console.log(`movie number ${movieIndex} data`, data);
  return (
    <section className="flex flex-col gap-10">
      <Card className="mx-auto w-[256px] sm:w-[400px]">
        <CardHeader className="h-24">
          <span className={subtitle()}>
            {data?.movie.title} ({data?.movie.rating}/10)
          </span>
        </CardHeader>
        <Divider />
        <CardBody className="items-center justify-center h-96">
          <Image
            src={data?.movie.imageURL}
            alt={`Cover image of ${data?.movie.title}`}
            height={300}
            className="object-cover"
          />
        </CardBody>
        <Divider />
        <CardFooter
          className={
            data?.movie.isFavourite ? "" : "grid grid-cols-2 gap-3 h-20"
          }
        >
          {data?.movie.isFavourite ? (
            <Button
              size="md"
              radius="full"
              color="danger"
              endContent={<Trash size={18} />}
              onPressEnd={() => removeFavourite(data?.movie.id)}
              className="mx-auto"
            >
              Remove
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                radius="full"
                color="success"
                endContent={<Check size={18} />}
                onPressEnd={() => addFavourite(data?.movie.id!)}
              >
                Accept
              </Button>
              <Button
                size="sm"
                radius="full"
                color="danger"
                endContent={<X size={18} />}
              >
                Reject
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
      <p className="text-left max-w-lg mx-auto">{data?.movie.summary}</p>
    </section>
  );
};
