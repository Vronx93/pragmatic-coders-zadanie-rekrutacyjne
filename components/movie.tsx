/* eslint-disable prettier/prettier */
import { FC } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Check, Trash, X } from "lucide-react";

import { subtitle } from "./primitives";

import { addFavourite, dislikeMovie, removeFavourite } from "@/mocks/api";

interface MovieProps {
	id: string;
	title: string;
	rating: number;
	imageURL: string;
	summary: string;
	status: "liked" | "disliked" | undefined;
	slideNextFunc: () => void;
}

export const Movie: FC<MovieProps> = ({
	id,
	title,
	rating,
	imageURL,
	summary,
	status,
	slideNextFunc,
}) => {
	const handleAccept = async () => {
		await addFavourite(id);
		slideNextFunc();
	};

	const handleRemove = async () => {
		await removeFavourite(id);
	};

	const handleReject = async () => {
		await dislikeMovie(id);
	};

	return (
		<section className="flex flex-col gap-10">
			<Card className="mx-auto w-[256px] sm:w-[400px]">
				<CardHeader className="h-28">
					<span className={subtitle()}>
						{title} ({rating}/10)
					</span>
				</CardHeader>
				<Divider />
				<CardBody className="items-center justify-center h-96">
					<Image
						alt={`Cover image of ${title}`}
						className="object-cover"
						height={300}
						src={imageURL}
					/>
				</CardBody>
				<Divider />
				<CardFooter
					className={
						status === "liked"
							? "h-24"
							: "grid grid-cols-2 gap-3 h-24"
					}>
					{status === "liked" ? (
						<Button
							className="mx-auto"
							color="danger"
							endContent={<Trash size={18} />}
							radius="full"
							size="md"
							onPressEnd={handleRemove}>
							Remove
						</Button>
					) : (
						<>
							<Button
								color="success"
								endContent={<Check size={18} />}
								radius="full"
								size="md"
								onPressEnd={handleAccept}>
								Accept
							</Button>
							<Button
								color="danger"
								endContent={<X size={18} />}
								radius="full"
								size="md"
								onPressEnd={handleReject}>
								Reject
							</Button>
						</>
					)}
				</CardFooter>
			</Card>
			<p className="text-left max-w-lg mx-auto">{summary}</p>
		</section>
	);
};
