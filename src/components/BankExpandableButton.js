import clsx from "clsx";
import { useState } from "react";

const BankExpandableButton = ({text}) => {  
  const [isActive, setIsActive] = useState(false);
  
  return <div>
    <button
      className={clsx([
        'px-3.5 py-3 w-full text-center text-lg font-semibold rounded-md hover:bg-main hover:text-white transition focus:outline-none',
        {
          'bg-main text-white': isActive,
          'bg-gray-300': !isActive
        }
      ])}
      onClick={() => setIsActive(prevIsActive => !prevIsActive)}
    >
      {text}
    </button>

    {isActive && <ul className="space-y-3 mt-3">
      <li><a href="/#">Panadería y Repostería: (15)</a></li>
      <li><a href="/#">Carnes, pollos y pescados: (40)</a></li>
      <li><a href="/#">Enlatados y conservas: (20)</a></li>
      <li className="font-semibold"><a href="/#">Ver más</a></li>
    </ul>}
  </div>;
};

export default BankExpandableButton;