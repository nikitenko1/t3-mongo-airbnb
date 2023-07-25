"use client";
import Image from "next/image";

interface IProps {
  profilePicture: string | null | undefined;
}

const Avatar = ({ profilePicture }: IProps) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={profilePicture || "/placeholder.jpg"}
    />
  );
};

export default Avatar;
