import { useRouter } from "next/router";
import Container from "./Container";
import { Listing } from "@prisma/client";
import ClientOnly from "./ClientOnly";
import NoResults from "./NoResults";
import { ListingCard } from "./listings";
import { api } from "@/utils/api";

const Main = () => {
  const router = useRouter();
  const { data } = api.listing.getAll.useQuery(router.query);
  const { data: user } = api.user.getCurrentUser.useQuery();

  if (data?.listings.length === 0) {
    return (
      <ClientOnly>
        <NoResults showReset />
      </ClientOnly>
    );
  }

  return (
    <div className="pb-20 pt-28">
      <Container>
        <div
          className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
         xl:grid-cols-5 2xl:grid-cols-6"
        >
          {data?.listings?.map((listing: Listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              currentUser={user}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};
export default Main;
