import clsx from "clsx";
import { Link } from "react-router-dom";

const getColorClass = (color) => {
  switch (color) {
    case 'main':
      return 'bg-main hover:bg-main-dark';
    case 'blue':
      return 'bg-blue-500 hover:bg-blue-600';
    case 'white':
      return 'bg-white hover:bg-gray-100 text-black';
    default:
      return '';
  }
};

const Button = ({ children, className, href, to, color, onClick, startAdorment, endAdorment }) => {
  const Tag = to
    ? Link
    : href
      ? 'a'
      : 'button'
    ;

  return <Tag
    href={href}
    to={to}
    className={clsx([
      'inline-flex items-center justify-center px-4 py-2 space-x-2 leading-4 border rounded-full text-white font-semibold shadow',
      getColorClass(color),
      className,
    ])}
    onClick={onClick}
  >
    {startAdorment && <span>{startAdorment}</span>}
    <span>{children}</span>
    {endAdorment && <span>{endAdorment}</span>}
  </Tag>
};

export default Button;