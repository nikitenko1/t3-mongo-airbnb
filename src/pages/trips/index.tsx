import { ClientOnly, NoResults } from "@/components";
import { TripsClient } from "@/components/trips";
import { api } from "@/utils/api";
import React from "react";

const Trips = () => {
  const { data: user } = api.user.getCurrentUser.useQuery();

  const { data } = api.reservations.getReservations.useQuery({
    userId: user?.id,
  });

  if (data && data?.reservations.length === 0) {
    return (
      <ClientOnly>
        <NoResults
          title="No Trips found"
          subtitle="Looks like you havent booked any trips."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={data?.reservations} currentUser={user!} />
    </ClientOnly>
  );
};

export default Trips;
