import { IoLocationOutline } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IoPencilSharp } from "react-icons/io5";
import { IoMapOutline } from "react-icons/io5";
import { Link } from "react-router-dom";


const UserAddressCard = (props) => {

  const { id, name, address, className, onClick, onDelete } = props;

  return (
    <div className={className} onClick={onClick}>
      <IoCloseCircleSharp
        onClick={onDelete}
        className="absolute -top-2 -right-2 text-2xl hover:text-main cursor-pointer transition duration-500"
      />
      <h3 className="font-bold text-2xl my-4">
        <IoLocationOutline></IoLocationOutline> {name}
      </h3>
      <p className="text-md">
        {address}
      </p>
      <div className="my-4 flex items-center justify-between">
        <Link to={`/my-account/address/${id}/edit`} className="text-main hover:text-gray-500 transition duration-300 font-bold flex">
          <IoPencilSharp></IoPencilSharp>
          Editar
        </Link>
        <button className="text-main hover:text-gray-500 transition duration-300 font-bold flex">
          <IoMapOutline></IoMapOutline>
          Ver en mapa
        </button>
      </div>
    </div>
  )
}

export default UserAddressCard;