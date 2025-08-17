"use client";

import { useEffect, useState } from "react";

import { getFileList } from "@/actions/file-upload";

const Pictures = () => {
  const [keys, setKeys] = useState<string[]>([]);
  useEffect(() => {
    async function getFiles() {
      const keys = await getFileList();

      setKeys(keys);
    }
    getFiles();
  }, []);

  return (
    <div>
      <ul>
        {keys.map((key, index) => (
          <li key={index}>
            {index + 1} : {key}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pictures;
