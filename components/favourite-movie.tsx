import { FC } from "react";
import { subtitle } from "./primitives";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Trash } from "lucide-react";

interface FavouriteMovieProps {
  id: string;
  title: string;
  rating: number;
  imageURL?: string;
  removeFunc: (id: string) => void;
}

export const FavouriteMovie: FC<FavouriteMovieProps> = ({
  id,
  title,
  rating,
  imageURL,
  removeFunc,
}) => {
  return (
    <Card className="w-full">
      <CardHeader className="h-24">
        <span className={subtitle()}>
          {title} ({rating}/10)
        </span>
      </CardHeader>
      <Divider />
      <CardBody className="items-center h-48">
        <Image
          src={imageURL}
          alt={`Cover image of ${title}`}
          height={160}
          className="object-cover"
        />
      </CardBody>
      <Divider />
      <CardFooter className="h-20">
        <Button
          size="md"
          radius="full"
          color="danger"
          endContent={<Trash size={18} />}
          onPressEnd={() => removeFunc(id)}
          className="mx-auto"
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};
