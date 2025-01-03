import { title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-12 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Tinder for&nbsp;</span>
        <span className={title({ color: "violet" })}>movies&nbsp;</span>
        <br />
      </div>
      <Button as={Link} href="/movies" color="primary" size="lg" radius="full">
        Explore movies
      </Button>
    </section>
  );
}
