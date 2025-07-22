import Link from "next/link";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 rounded-full bg-orange-700 text-white shadow-md hover:bg-orange-800 transition"
        >
          Documentation
        </Link>
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 rounded-full border border-gray-400 text-gray-800 flex items-center gap-2 hover:bg-gray-100 transition"
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8 border rounded-lg p-4 bg-gray-50 text-gray-800 font-mono text-sm">
        <span>
          Get started by editing <span className="text-blue-600">app/page.tsx</span>
        </span>
      </div>
    </section>
  );
}