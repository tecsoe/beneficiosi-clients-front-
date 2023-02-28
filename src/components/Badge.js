const Badge = ({children}) => {
  return <span
    className="px-1.5 py-0.5 text-xs bg-yellow-100 text-red-500 font-semibold rounded-lg"
  >
    {children}
  </span>;
};

export default Badge;