/* eslint-disable prettier/prettier */
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export interface MovieInterface {
	id: string;
	title: string;
	rating: number;
	imageURL: string;
	summary: string;
	status: "liked" | "disliked" | undefined;
}

export interface MovieDataInterface {
	movies: MovieInterface[];
	nextCursor: number;
	prevCursor: number;
}

export interface FetchMovieProps {
	cursor: number;
	limit: number;
}
