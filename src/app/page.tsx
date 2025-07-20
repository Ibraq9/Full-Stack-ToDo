import Image from "next/image";
import NavBar from "./MyComponents/NavBar";
import Hero from "./MyComponents/Hero";

export default function Home() {
  return (
    <div className="flex flex-col bg-orange-50 dark:bg-gray-900">
      <NavBar />

      <Hero/>
    </div>
  );
}