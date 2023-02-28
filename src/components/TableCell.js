const TableCell =  ({children, variant}) => {
  
  if (variant === 'head') {
    return <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">{children}</th>;
  }

  return <td className="px-6 py-4 whitespace-nowrap">{children}</td>;
};

export default TableCell;