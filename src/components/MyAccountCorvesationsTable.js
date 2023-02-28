import clsx from "clsx";
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoImage } from "react-icons/io5";
import { Link } from "react-router-dom";


const MyAccountConversationsTable = (props) => {


  const { conversations, className } = props;

  return (
    <div className={className}>
      <div className="flex w-full items-center font-bold">
        <div className="w-2/12 p-2 text-center">
          Imagen
        </div>
        <div className="w-3/12 p-2">
          <p>Tienda</p>
          <input type="text" className="max-w-full border-gray-200 mt-2 rounded p-1" />
        </div>
        <div className="w-3/12 p-2">
          Hilo de conversacion
          <input type="text" className="max-w-full border-gray-200 mt-2 rounded p-1" />
        </div>
        <div className="w-3/12 p-2">
          <p>Estado</p>
          <select type="text" className="max-w-full border-gray-200 mt-2 rounded p-1">
            <option value="">En proceso de pago</option>
            <option value="">Pago aceptado</option>
            <option value="">En proceso de envio</option>
            <option value="">Finalizada</option>
            <option value="">Error en pago</option>
          </select>
        </div>
        <div className="w-1/12 p-2">
          <button className="bg-main px-8 py-2 text-white font-bold">
            Buscar
          </button>
        </div>
      </div>
      <div className="w-full text-center">
        {
          conversations.map((conversation, i) => <div key={i} className="flex bg-white my-4 p-6 items-center rounded-lg transition duration-300 transform hover:shadow-xl hover:-translate-y-2">
            <div className="w-2/12">
              {
                conversation?.store ?
                  <img className="w-[50px] m-auto" src={conversation?.store?.img} alt="" />
                  :
                  <IoImage className="m-auto text-[50px]"></IoImage>
              }
            </div>
            <div className="w-3/12">
              {
                conversation.store ?
                  <Link to={`/stores/${conversation?.store?.slug}`} className="text-blue-500">
                    {conversation?.store?.name}
                  </Link>
                  :
                  'No tiene tienda asociada'
              }
            </div>
            <div className="w-3/12">
              {conversation?.subject}
            </div>
            <div className={clsx(["w-3/12 font-bold bg-opacity-10"], {
              'text-green-500': conversation?.status?.id === 2,
              'text-red-500': conversation?.status?.id === 1
            })}>
              {conversation?.status?.title}
            </div>
            <div className="w-1/12">
              <Link to={`/my-account/conversations/${conversation?.id}`} className="hover:text-main transition duration-300">
                Abrir chat
                <IoArrowForwardOutline className="m-auto text-2xl"></IoArrowForwardOutline>
              </Link>
            </div>
          </div>
          )
        }
      </div>
    </div>
  )
}

export default MyAccountConversationsTable;