import { getFileList } from "@/actions/file-upload";
import React from "react";

const Pictures = async () => {
  const files = await getFileList();

  return (
    <div>
      <ul>
        {files.objects.map((file, index) => (
          <li key={index}>
            {index + 1} : {file.key}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pictures;
