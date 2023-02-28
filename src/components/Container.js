import clsx from "clsx";

const Container = ({ children, withMargin = false, className }) => {
  return <div className={clsx('container', withMargin && 'mt-20', className)}>
    {children}
  </div>;
};

export default Container;