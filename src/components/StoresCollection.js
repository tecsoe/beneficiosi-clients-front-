import StoreCard from "./StoreCard";
import StoreHorizontalCard from "./StoreHorizontalCard";

const StoresCollection = ({ isInGridView, stores }) => {
  return isInGridView
    ? <div className="grid md:grid-cols-3 gap-8">
      {stores.map((store, i) => <div
        key={i}
        className="flex justify-center"
      >
        <StoreCard
          id={store?.storeId}
          imgSrc={store?.storeProfile?.logo ? `${store.storeProfile.logo}` : null}
          imgAlt={store.imgAlt}
          name={store.name}
          description={store.shortDescription}
          rating={store.rating}
          key={i}
          isFavorite={store?.isFavorite}
          slug={store.slug}
          cheapestProduct={store.cheapestProduct}
          open={store?.isOpen}
        />
      </div>)}
    </div>
    : <div className="space-y-4">
      {stores.map((store, i) => <StoreHorizontalCard
        key={i}
        id={store.storeId}
        imgSrc={store?.storeProfile?.logo ? `${store.storeProfile.logo}` : null}
        imgAlt={store.imgAlt}
        name={store.name}
        shortDescription={store.shortDescription}
        description={store.description}
        rating={store.rating}
        isFavorite={store?.isFavorite}
        slug={store?.slug}
        cheapestProduct={store?.cheapestProduct}
        open={store?.isOpen}
      />)}
    </div>;
};

export default StoresCollection;