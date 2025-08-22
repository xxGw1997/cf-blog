import Link from "next/link";
import { format } from "date-fns";

import ImgUploadButton from "@/components/admin/img-upload-button";
import { formatFileSize } from "@/lib/utils";
import { getFileDetailList } from "@/actions/file-upload";
import ZoomInImageButton from "./zoom-in-image-button";
import RemoveFileButton from "./remove-button";

const UploadPage = async () => {
  const files = await getFileDetailList();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center">文件管理</h1>
        <div className="mt-6 w-full">
          <ImgUploadButton />
        </div>
      </div>
      <div className="border-border bg-card overflow-hidden rounded-lg border shadow">
        <table className="divide-border min-w-full divide-y">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                缩略图
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                URL
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                文件大小
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                上传时间
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-border bg-card divide-y">
            {files.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-muted-foreground px-6 py-4 text-center"
                >
                  未找到文件
                </td>
              </tr>
            ) : (
              files.map((file) => (
                <tr key={file.key}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ZoomInImageButton url={file.key} />
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    <Link
                      href={file.key}
                      target="_blank"
                      className="underline text-blue-500"
                    >
                      {file.key}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs">
                    {formatFileSize(file.size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs">
                    {format(file.uploaded, "yyyy年M月d日 HH:mm:ss")}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <RemoveFileButton url={file.key}/>
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

export default UploadPage;
