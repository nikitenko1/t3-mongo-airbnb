import { ClientOnly, NoResults } from "@/components";
import { FavoritesClient } from "@/components/favorites";
import { api } from "@/utils/api";

const FavoritesPage = () => {
  const { data } = api.favorites.getFavorites.useQuery();
  const { data: user } = api.user.getCurrentUser.useQuery();

  if (data && data.favorites.length === 0) {
    return (
      <ClientOnly>
        <NoResults
          title="No favorites found"
          subtitle="Looks like you have no favorite listings"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={data?.favorites} currentUser={user!} />
    </ClientOnly>
  );
};

export default FavoritesPage;
