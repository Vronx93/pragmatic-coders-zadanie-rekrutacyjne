/* eslint-disable prettier/prettier */
export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block text-center justify-center max-w-[100vw] px-6 sm:px-9">
        {children}
      </div>
    </section>
  );
}
