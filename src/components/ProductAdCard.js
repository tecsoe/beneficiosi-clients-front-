const ProductAdCard = ({ title, subtitle, btnText, href, imgSrc, imgAlt }) => {
  return <div className="flex items-center w-full bg-white rounded-sm shadow-sm overflow-hidden p-4">
    <div className="flex flex-col justify-center items-start w-full p-8 space-y-4">
      {subtitle && <p className="uppercase tracking-widest">{subtitle}</p>}
      <div className="uppercase text-3xl font-semibold">
        {title.length > 20 ? `${title.slice(0, 20)}...` : title}
      </div>
      <a
        href={href}
        className="inline-flex items-center justify-center px-5 py-3 space-x-2 leading-4 border border-white rounded bg-main text-white"
      >
        <span>{btnText}</span>
      </a>
    </div>
    <div className="w-full">
      <img
        src={imgSrc}
        alt={imgAlt}
        className="w-56 h-56"
      />
    </div>
  </div>;
};

export default ProductAdCard;