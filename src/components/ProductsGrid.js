const ProductsGrid = ({ children }) => {
  return <div className="grid justify-center md:grid-cols-3 gap-8">{children}</div>;
};

export default ProductsGrid;