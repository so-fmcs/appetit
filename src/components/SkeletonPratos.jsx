function SkeletonPratos({ quantidade }) {
  return (
    <ul
      className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5"
      aria-hidden="true"
    >
      {Array.from({ length: quantidade }, (_, i) => (
        <li
          key={i}
          className="overflow-hidden rounded-3xl border border-bege-areia bg-white motion-safe:animate-pulse"
        >
          <div className="aspect-4/3 bg-bege-areia/50" />
          <div className="flex flex-col gap-2.5 px-4.5 py-4">
            <div className="h-6 w-3/4 rounded-md bg-bege-areia/50" />
            <div className="h-3.5 w-1/2 rounded-md bg-bege-areia/50" />
            <div className="flex justify-between pt-3">
              <div className="h-5 w-24 rounded-md bg-bege-areia/50" />
              <div className="h-11 w-28 rounded-full bg-bege-areia/50" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SkeletonPratos;
