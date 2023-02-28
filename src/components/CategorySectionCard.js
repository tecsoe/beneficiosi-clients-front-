const CategorySectionCard = ({ text, imgSrc, categoryId }) => {
  return <a href={`/products?storeCategoryId=${categoryId}`} className="group hidden md:block w-1/2 relative rounded-md overflow-hidden bg-full shadow-md">
    <div className="absolute inset-0">
      <img
        src={imgSrc}
        alt={text}
        className="h-full w-full transform transition duration-[400ms] group-hover:scale-125"
      />
    </div>
    <div className="absolute inset-0 bg-black opacity-30" />
    <div className="flex justify-center capitalize items-center absolute inset-0 text-white text-5xl font-semibold">
      {text}
    </div>
  </a>;
};

export default CategorySectionCard;