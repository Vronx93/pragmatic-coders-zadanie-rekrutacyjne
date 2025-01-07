/* eslint-disable prettier/prettier */
export default function FavouritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-screen text-center justify-center">
        {children}
      </div>
    </section>
  );
}
