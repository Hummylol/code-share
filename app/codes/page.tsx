import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen w-full flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-24 p-6">
      {/* Back Button */}
      <Link href="/">
        <Button variant="outline" className="absolute top-4 left-4">
          <ArrowLeft className="mr-2" size={18} />
          Add Code
        </Button>
      </Link>

      {/* Category Cards */}
      <Link
        href={"/bda"}
        className="h-40 sm:h-52 w-full sm:w-60 cursor-pointer rounded-lg flex justify-center items-center bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white text-lg font-medium shadow"
      >
        BDA
      </Link>

      <Link
        href={"/cc"}
        className="h-40 sm:h-52 w-full sm:w-60 cursor-pointer rounded-lg flex justify-center items-center bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white text-lg font-medium shadow"
      >
        CC
      </Link>

      <Link
        href={"/other"}
        className="h-40 sm:h-52 w-full sm:w-60 cursor-pointer rounded-lg flex justify-center items-center bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white text-lg font-medium shadow"
      >
        OTHER
      </Link>
    </div>
  );
};

export default Page;
