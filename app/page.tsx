"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner"; // ✅ Sonner toast

export default function Home() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("BDA"); // ✅ Default value
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title || !code || !category) {
      toast.error("All fields are required!");
      return;
    }

    const { error } = await supabase
      .from("codes")
      .insert([{ title, code, category }]); // ✅ include category

    if (!error) {
      setTitle("");
      setCode("");
      setCategory("BDA");

      toast.success("Code Saved", {
        description: "Your code snippet has been added.",
      });

      router.push("/codes");
    } else {
      toast.error("Error saving code", {
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-black dark:bg-black dark:text-white transition-colors">
      <Link href="/codes">
        <Button variant="outline" className="absolute top-4 left-4">
          <ArrowLeft className="mr-2" size={18} />
          View Codes
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-gray-200 p-6 rounded-lg shadow-lg dark:bg-[#0e0e0e] transition-colors"
      >
        <h2 className="text-2xl mb-4">Submit Your Code</h2>

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />

        <Textarea
          placeholder="Your Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mb-4"
        />

        {/* ✅ Controlled Select */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-[#E5E7EB] w-full border-2 border-black rounded mb-4 p-2 text-black dark:text-white dark:bg-zinc-800"
        >
          <option value="BDA">BDA</option>
          <option value="CC">CC</option>
          <option value="OTHER">OTHER</option>
        </select>

        <Button
          onClick={handleSubmit}
          className="w-full bg-black text-white dark:bg-white dark:text-black"
        >
          Submit
        </Button>
      </motion.div>
    </div>
  );
}
