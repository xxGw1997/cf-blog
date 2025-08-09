import Link from "next/link";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/actions/post";
import { formatDate } from "@/lib/utils";

const PostsPage = async () => {
  const posts = await getAllPosts();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center">文章管理</h1>
        <div className="mt-6 w-[700px] text-right">
          <Link href="/admin/posts/create">
            <Button className="ml-4" variant="default">
              创建
            </Button>
          </Link>
        </div>
      </div>

      <div className="border-border bg-card overflow-hidden rounded-lg border shadow">
        <table className="divide-border min-w-full divide-y">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                标题
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                创建日期
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                语言
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                状态
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-border bg-card divide-y">
            {posts.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-muted-foreground px-6 py-4 text-center"
                >
                  未找到文章
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{post.title}</div>
                    <div className="text-muted-foreground truncate text-sm">
                      {post.slug}
                    </div>
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="outline">en</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge>已发布</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <Link
                      href={`/admin/posts/edit/${post.slug}`}
                      className="text-primary hover:text-primary/80 mr-4"
                    >
                      编辑
                    </Link>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary hover:text-primary/80 mr-4"
                      target="_blank"
                    >
                      查看
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PostsPage;
