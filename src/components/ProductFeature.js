import clsx from "clsx";

const ProductFeature = ({name, value, className}) => {
  return <div className={clsx(['flex', className])}>
    <span className="w-1/2 text-gray-600 opacity-75">{name}:</span>
    <span className="w-1/2">{value}</span>
  </div>
};

export default ProductFeature;