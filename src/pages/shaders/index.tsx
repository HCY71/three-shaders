import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const links = [
  {
    href: "/coffeeSmoke",
    title: "CoffeeSmoke",
    description:
      "The CoffeeSmoke shader generates swirling, coffee-colored smoke for a warm, elegant visual effect.",
  },
  {
    href: "/hologram",
    title: "Hologram",
    description:
      "The Hologram shader creates a mesmerizing, contour-lined holographic effect, perfect for futuristic and sci-fi visuals.",
  },
];

const Index = () => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between  p-4 pb-24 pt-24 md:p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <a
          href="/"
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 font-bold backdrop-blur-2xl lg:static lg:h-auto lg:w-auto lg:rounded-lg lg:border lg:bg-gray-200  lg:p-3 lg:px-6 lg:font-normal dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:dark:bg-zinc-800/30"
        >
          Home
        </a>
      </div>
      <div className="flex before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:-translate-y-1/4 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] sm:before:w-[480px] sm:after:w-[240px] after:md:translate-x-1/2 after:md:translate-y-0 before:lg:h-[120px] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40">
        <h1 className="mb-10 text-4xl text-[48px] font-semibold leading-tight drop-shadow-[0_0_0.3rem_#ffffff70] sm:mt-20 lg:text-[52px]">
          Collections
        </h1>
      </div>
      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={"/shaders" + link.href}
            className="group rounded-lg border border-transparent px-5 py-8 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              {link.title}{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              {link.description}
            </p>
          </a>
        ))}
      </div>
    </main>
  );
};

export default Index;
