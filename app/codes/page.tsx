"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Copy, Trash } from "lucide-react";
import { toast } from "sonner"; // ✅ Import Sonner toast

export default function CodeList() {
  const [codes, setCodes] = useState([]);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    const { data } = await supabase.from("codes").select("*").order("created_at", { ascending: false });
    setCodes(data || []);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("codes").delete().match({ id });
    fetchCodes();
    
    // ✅ Sonner toast for delete
    toast.error("Code Deleted", {
      description: "The code snippet has been removed.",
    });
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    
    // ✅ Sonner toast for copy
    toast.success("Copied to Clipboard", {
      description: "The code snippet has been copied successfully.",
    });
  };

  const toggleReadMore = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col items-center p-6 transition-colors">
      <Button onClick={() => router.push("/")} className="absolute top-4 left-4">
        Back
      </Button>

      <h2 className="text-2xl mb-4">Saved Code Snippets</h2>

      <div className="w-full max-w-2xl">
        {codes.map((item) => {
          const lines = item.code.split("\n");
          const isLong = lines.length > 5;
          const previewCode = isLong ? lines.slice(0, 5).join("\n") + "\n..." : item.code;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-200 p-4 mb-4 rounded-lg shadow-lg dark:bg-[#0e0e0e] transition-colors"
            >
              <h3 className="text-xl mb-2">{item.title}</h3>
              <pre className="bg-gray-100 p-2 rounded dark:bg-[#222222] transition-all overflow-hidden">
                {expanded[item.id] ? item.code : previewCode}
              </pre>

              <div className="flex justify-between mt-2">
                {isLong && (
                  <Button onClick={() => toggleReadMore(item.id)} variant="outline">
                    {expanded[item.id] ? "Read Less" : "Read More"}
                  </Button>
                )}

                <div className="flex gap-2">
                  <Button onClick={() => handleCopy(item.code)} variant="outline">
                    <Copy size={18} />
                  </Button>
                  <Button onClick={() => handleDelete(item.id)} variant="destructive">
                    <Trash size={18} />
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
