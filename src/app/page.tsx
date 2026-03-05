import NavBar from "./MyComponents/NavBar";
import Hero from "./MyComponents/Hero";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    sort?: "relevant" | "latest" | "oldest";
  }>;
}) {
  return (
    <div className="flex flex-col">
      <NavBar />
      <Hero searchParams={searchParams} />
    </div>
  );
}
