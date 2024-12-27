"use client";
import Terminal from "@/components/Terminal/Terminal";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-2 bg-neutral-300">
      <div className="flex gap-5">
        <span className="text-3xl text-black font-black">
          SPHERON ASSIGNMENT BY
        </span>
        <button className="disabled:opacity-50 disabled:cursor-not-allowed relative h-8  overflow-hidden group duration-150 flex justify-center items-center gap-2 text-sm bg-black text-white hover:bg-[#44444B] px-8 py-4">
          <span className="inline-block duration-300 ease-out w-2.5 h-2.5 absolute border-white top-0.5 border-t-2 group-hover:border-t-3 group-hover:top-1 group-focus:border-t-3 group-focus-within:border-t-3 group-focus:top-1 group-focus-within:top-1 left-0.5 border-l-2 group-hover:border-l-3 group-focus:border-l-3 group-focus-within:border-l-3 group-hover:left-1 group-focus:left-1 group-focus-within:left-1"></span>
          <span className="inline-block duration-300 ease-out w-2.5 h-2.5 absolute border-white top-0.5 border-t-2 group-hover:border-t-3 group-hover:top-1 group-focus:border-t-3 group-focus-within:border-t-3 group-focus:top-1 group-focus-within:top-1 right-0.5 border-r-2 group-hover:border-r-3 group-focus:border-r-3 group-focus-within:border-r-3 group-hover:right-1 group-focus:right-1 group-focus-within:right-1"></span>
          <span className="inline-block duration-300 ease-out w-2.5 h-2.5 absolute border-white bottom-0.5 border-b-2 group-hover:border-b-3 group-focus:border-b-3 group-focus-within:border-b-3 group-hover:bottom-1 group-focus:bottom-1 group-focus-within:bottom-1 left-0.5 border-l-2 group-hover:border-l-3 group-focus:border-l-3 group-focus-within:border-l-3 group-hover:left-1 group-focus:left-1 group-focus-within:left-1"></span>
          <span className="inline-block duration-300 ease-out w-2.5 h-2.5 absolute border-white bottom-0.5 border-b-2 group-hover:border-b-3 group-focus:border-b-3 group-focus-within:border-b-3 group-hover:bottom-1 group-focus:bottom-1 group-focus-within:bottom-1 right-0.5 border-r-2 group-hover:border-r-3 group-focus:border-r-3 group-focus-within:border-r-3 group-hover:right-1 group-focus:right-1 group-focus-within:right-1"></span>
          <a href="https://github.com/utkarsh575" target="__blank">
            utkarsh575
          </a>
        </button>
      </div>
      <Terminal />
    </section>
  );
}
