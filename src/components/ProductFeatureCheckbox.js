const ProductFeatureCheckbox = ({
  id,
  name,
  price,
  value,
  isSelectable,
}) => {
  return <div className="flex mx-8 items-center space-x-8">
    {
      isSelectable && <input
        className="text-main ring-main border-main focus:ring-main"
        type="checkbox"
        name=""
        id={`${name}-${id}`}
        readOnly={!isSelectable}
      />
    }

    <div className="text-left w-1/4">
      <p className="text-lg font-bold text-gray-500">{name}</p>
    </div>
    {
      value.length > 0 && <div className="text-left w-1/4">
        <p className="text-lg font-bold text-gray-500">{value}</p>
      </div>
    }
    <div className="text-left w-2/4">
      <p className="text-md font-bold text-gray-500">
        {price > 0 ? price : isSelectable ? "Gratis." : "Incluido en el producto."}
      </p>
    </div>
  </div>;
};

export default ProductFeatureCheckbox;