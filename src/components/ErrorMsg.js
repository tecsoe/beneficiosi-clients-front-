import clsx from "clsx";
import errorImg from "../assets/images/error.png";

const ErrorMsg = ({message, className}) => {

  return <div className={clsx('flex flex-col items-center space-y-3 text-lg', className)}>
    <img
      src={errorImg}
      alt=""
      className="w-40 h-40"
    />
    <span>{message}</span>
  </div>;
};

export default ErrorMsg;