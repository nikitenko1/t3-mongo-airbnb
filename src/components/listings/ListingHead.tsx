import { User } from "@prisma/client";
import React from "react";
import Meta from "../Meta";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { useCountries } from "@/hooks";

interface IProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser: User | null | undefined;
}

const ListingHead = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}: IProps) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Meta
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="w-full object-cover"
        />
        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
