import { api } from "@/utils/api";
import { Listing, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { ListingCard } from "../listings";
import Meta from "../Meta";
import Container from "../Container";

interface IProps {
  properties: Listing[] | undefined;
  currentUser: User;
}

const PropertiesClient = ({ currentUser, properties }: IProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");

  const { mutateAsync } = api.listing.delete.useMutation({
    onSuccess: () => {
      toast.success("Property deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting property");
    },
  });

  const onDelete = useCallback(
    async (listingId: string) => {
      setDeletingId(listingId);

      await mutateAsync({ listingId });

      setDeletingId("");
      router.refresh();
    },
    [router]
  );

  return (
    <div className="pb-20 pt-28">
      <Container>
        <Meta title="Properties" subtitle="List of your properties" />
        <div
          className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        xl:grid-cols-5 2xl:grid-cols-6"
        >
          {properties?.map((property) => (
            <ListingCard
              key={property.id}
              listing={property}
              actionId={property.id}
              onAction={onDelete}
              actionLabel="Delete Property"
              disabled={deletingId === property.id}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PropertiesClient;
