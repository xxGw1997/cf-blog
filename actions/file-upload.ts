"use server";

import { createR2 } from "@/lib/r2";

type UploadFileOptions = {
  prefix: string;
};

export async function uploadFile(
  formData: FormData,
  { prefix = "" }: UploadFileOptions
) {
  try {
    const file = formData.get("file") as File | null;

    if (!file || file.size === 0)
      throw new Error("No file to upload, please select a file!");

    const sanitizedFilename = `${prefix ? prefix + "/" : ""}${file.name.replace(
      /[^a-zA-Z0-9.-]/g,
      "-"
    )}`;

    const r2 = createR2();
    const fileFromR2 = await r2.head(sanitizedFilename);

    if (fileFromR2)
      throw new Error(
        `File name "${sanitizedFilename}" already exist! please change another name.`
      );

    const fileBuffer = await file.arrayBuffer();
    await r2.put(sanitizedFilename, fileBuffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    return {
      success: true,
      message: `File upload success~`,
      url: `${process.env.NEXT_PUBLIC_R2_DOMAIN}/${sanitizedFilename}`,
      filename: sanitizedFilename,
    };
  } catch (error) {
    throw error;
  }
}

export async function getFileList(r2ListOptions?: R2ListOptions) {
  try {
    const r2 = createR2();

    const fileList = await r2.list(r2ListOptions);

    const keys = fileList.objects.map(
      (file) => `${process.env.NEXT_PUBLIC_R2_DOMAIN}/${file.key}`
    );

    return keys;
  } catch (error) {
    throw error;
  }
}

export async function validatePassword(password: string) {
  if (password === process.env.NEXT_PUBLIC_PHOTOS_PASSWORD) {
    return true;
  } else {
    return false;
  }
}
