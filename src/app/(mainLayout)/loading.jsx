const Loading = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl border bg-white p-4 shadow"
          >
            <div className="h-64 rounded-md bg-slate-200"></div>
            <div className="mt-4 h-5 w-3/4 rounded bg-slate-200"></div>
            <div className="mt-2 h-4 w-1/2 rounded bg-slate-200"></div>
            <div className="mt-6 h-9 rounded bg-slate-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;