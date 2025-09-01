import Link from "next/link";
import React from "react";
import { BookText, BookImage } from "lucide-react";

import { Highlighter } from "@/components/magicui/highlighter";

const AdminPage = () => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-center">管理后台</h1>
      <div className="mt-16 w-full flex flex-col gap-y-10">
        <Link href="/admin/posts" className="flex gap-2">
          <BookText />
          <Highlighter action="highlight" color="#FF9800">
            文章管理
          </Highlighter>
        </Link>
        <Link href="/admin/upload" className="flex gap-2">
          <BookImage />
          <Highlighter action="highlight" color="#FF9800">
            文件管理
          </Highlighter>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
