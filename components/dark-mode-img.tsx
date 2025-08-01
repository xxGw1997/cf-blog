"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useTheme } from "next-themes";

type Props = {
  darkImg: StaticImageData;
  lightImg: StaticImageData;
  width?: number;
  height?: number;
  alt?: string;
  priority?: boolean;
};

const DarkModeImg = ({
  darkImg,
  lightImg,
  width = 25,
  height = 25,
  alt = "img",
  priority = false,
}: Props) => {
  const { theme } = useTheme();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  });

  if (!isClient) return "";

  const imgSrc = theme === "light" ? lightImg : darkImg;

  return (
    <Image
      width={width}
      height={height}
      src={imgSrc}
      alt={alt}
      priority={priority}
      className="select-none"
    ></Image>
  );
};

export default DarkModeImg;
