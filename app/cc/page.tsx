"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export default function CC() {
  const [codes, setCodes] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    const { data, error } = await supabase
      .from("codes")
      .select("*")
      .eq("category", "CC")
      .order("created_at", { ascending: false });

    if (!error && data) setCodes(data);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied!", { description: "Snippet copied to clipboard." });
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("codes").delete().eq("id", id);
    if (!error) {
      toast.success("Deleted!", { description: "Code removed successfully." });
      fetchCodes();
    } else {
      toast.error("Error deleting code", { description: error.message });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6">
      <Link href="/codes">
        <Button variant="outline" className="mb-6">Back</Button>
      </Link>

      <h1 className="text-3xl font-bold mb-6">CC Code</h1>

      {codes.length === 0 ? (
        <p>No codes yet.</p>
      ) : (
        <div className="space-y-6">
          {codes.map((item) => {
            const isExpanded = expanded[item.id] || false;
            const codePreview = item.code.split("\n").slice(0, 8).join("\n");
            return (
              <div
                key={item.id}
                className="p-4 rounded-lg shadow bg-zinc-200 dark:bg-zinc-800"
              >
                <h2 className="font-semibold mb-2">{item.title}</h2>

                <pre className="p-2 bg-black text-white rounded overflow-x-auto text-sm">
                  {isExpanded ? item.code : codePreview}
                </pre>

                <div className="flex gap-3 mt-3">
                  {item.code.split("\n").length > 8 && (
                    <Button
                      size="sm"
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [item.id]: !isExpanded,
                        }))
                      }
                    >
                      {isExpanded ? "See Less" : "See More"}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleCopy(item.code)}
                  >
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
