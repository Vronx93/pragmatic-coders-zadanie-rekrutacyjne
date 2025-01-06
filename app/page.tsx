/* eslint-disable prettier/prettier */
import { Button } from "@nextui-org/button";
import Link from "next/link";

import { title } from "@/components/primitives";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-12 py-8 md:py-10">
			<div className="inline-block max-w-xl text-center justify-center">
				<span className={title()}>Tinder for&nbsp;</span>
				<span className={title({ color: "violet" })}>movies&nbsp;</span>
				<br />
			</div>
			<Button
				as={Link}
				color="primary"
				href="/movies"
				radius="full"
				size="lg">
				Explore movies
			</Button>
		</section>
	);
}
