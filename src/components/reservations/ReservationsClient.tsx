import { api } from "@/utils/api";
import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Container from "../Container";
import Meta from "../Meta";
import { ListingCard } from "../listings";

interface IProps {
  reservations: (Reservation & { listing: Listing })[] | undefined;
  currentUser: User;
}

const ReservationsClient = ({ reservations, currentUser }: IProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");

  const { mutateAsync } = api.reservations.cancelReservation.useMutation({
    onSuccess: () => {
      toast.success("Booking Cancled!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      await mutateAsync({ reservationId: id });

      setDeletingId("");
      router.refresh();
    },
    [router]
  );

  return (
    <div className="pb-20 pt-28">
      <Container>
        <Meta title="Reservations" subtitle="Bookings on your properties" />
        <div
          className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        xl:grid-cols-5 2xl:grid-cols-6"
        >
          {reservations?.map((reservation) => (
            <ListingCard
              key={reservation.id}
              reservation={reservation}
              listing={reservation.listing}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel Booking"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ReservationsClient;
