const LeftSidebarLayout = ({children, leftSide}) => {
  return <div className="flex space-x-6">
    {leftSide && <div className="w-60 space-y-6 flex-shrink-0">{leftSide}</div>}
    <div className="flex-grow min-w-0">{children}</div>
  </div>;
};

export default LeftSidebarLayout;