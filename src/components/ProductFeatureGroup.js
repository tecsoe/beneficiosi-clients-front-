const ProductFeatureGroup = ({ name, children }) => {
  return <div className="text-center mb-8 bg-white p-8 rounded shadow-lg">
    <h3 className="text-xl text-gray-700 font-bold mb-4">{name}</h3>
    <div className="grid grid-cols-3 w-full">
      {children}
    </div>
  </div>;
};

export default ProductFeatureGroup;