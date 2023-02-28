import Button from "./Button";
import ChevronRightIcon from "./ChevronRightIcon";
import RatingsFilter from "./RatingsFilter";
import SearchAddressFilter from "./SearchAddressFilter";
import StoreCategoryFilter from "./StoreCategoryFilter";
import StoreFeatureFilter from "./StoreFeatureFilter";

const StoresFilters = ({ onChange, filters }) => {

    return (
        <div className="space-y-5">

            <SearchAddressFilter                
                name="locationIds"
                values={filters?.locationIds}
                onChange={onChange}
            />

            <StoreCategoryFilter
                name="storeCategoryIds"
                values={filters?.storeCategoryIds}
                onChange={onChange} />

            {/* Rating */}
            <RatingsFilter
                className="my-8"
                onChange={onChange}
                name="minRating"
                values={filters?.minRating}
            />

            <StoreFeatureFilter
                onChange={onChange}
                name="storeFeatureIds"
                values={filters?.storeFeatureIds}
                filters={filters} />

            <Button
                color="white"
                endAdorment={<ChevronRightIcon className="w-3 h-3" fill="none" />}
                to="/benefits"
            >
                Beneficios
            </Button>
        </div>
    )
}

export default StoresFilters;