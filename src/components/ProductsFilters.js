import RatingsFilter from "./RatingsFilter";
import StoreCategoryFilter from "./StoreCategoryFilter";
import TagsFilter from "./TagsFilters";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const ProductsFilters = ({ onChange, filters, hiddenEvents }) => {
  return (
    <div className="space-y-5">
      <StoreCategoryFilter
        name="storeCategoryIds"
        values={filters?.storeCategoryIds}
        onChange={onChange}
      />
      {filters?.showDate && !hiddenEvents ? (
        <>
          <h4 className="text-xl font-semibold mb-2">Fecha de eventos</h4>
          <div
            title="Quitar filtro"
            onClick={() => {
              onChange({ target: { name: "showDate", value: "" } });
            }}
            className="flex items-center justify-between text-white bg-main rounded-full px-2 py-1 cursor-pointer transition duration-500 hover:bg-white hover:text-main hover:shadow-xl"
            style={{ fontSize: 13 }}
          >
            <span className="capitalize">{`${format(
              new Date(filters?.showDate),
              "EEEE",
              { locale: es }
            )}, ${format(new Date(filters?.showDate), "dd", {
              locale: es,
            })} de ${format(new Date(filters?.showDate), "LLLL", {
              locale: es,
            })} de ${format(new Date(filters?.showDate), "yyyy", {
              locale: es,
            })}`}</span>
          </div>
        </>
      ) : null}
      {!filters?.showDate && !hiddenEvents ? (
        <CalendarComponent
          name="showDate"
          value={filters?.showDate}
          format="dd/MM/yyyy"
          onChange={onChange}
          allowEdit={false}
          floatLabelType="auto"
          openOnFocus={true}
        />
      ) : null}

      {/* Rating */}
      <RatingsFilter
        className="my-8"
        onChange={onChange}
        name="minRating"
        values={filters?.minRating}
      />

      <TagsFilter
        name="tagIds"
        values={filters?.tagIds}
        onChange={onChange}
        filters={filters}
      />
    </div>
  );
};

export default ProductsFilters;
