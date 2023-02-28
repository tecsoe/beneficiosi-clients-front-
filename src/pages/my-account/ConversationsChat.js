import clsx from "clsx";
import { IoStorefrontOutline, IoDocumentTextOutline, IoArrowBackOutline, IoAttachOutline, IoImagesSharp, IoSend } from "react-icons/io5";

const messages = [
  {
    user: {
      id: 1,
      name: 'Jeyver vegas'
    },
    message: 'Hola, buen dia como estas?',
    createdAt: new Date().toLocaleString(),
    attachment: null,
  },
  {
    user: {
      id: 2,
      name: 'Jesus Vicuña'
    },
    message: 'Bien Bien y vos como estas?',
    createdAt: new Date().toLocaleString(),
    attachment: null,
  },
  {
    user: {
      id: 1,
      name: 'Jeyver Vegas'
    },
    message: 'Bien bien tambien, oye jesus cual es el error en la orden? disculpa.',
    createdAt: new Date().toLocaleString(),
    attachment: null,
  }
]

const ConversationsChat = () => {
  return (
    <div className="h-[100%] relative">
      <div className="flex justify-between bg-white p-8">
        <div>
          <h1 className="text-gray-500 font-bold text-xl">Error de Envio de la orden #12</h1>
          <p className="text-md my-2">Tienda: <span className="text-blue-500">BurguerKing</span></p>
          <p className="text-md font-bold">Fecha: {new Date().toLocaleString()}</p>
        </div>
        <div className="flex items-center">
          <IoStorefrontOutline className="text-4xl ml-6 text-main hover:text-gray-500 cursor-pointer transition duration-500" />
          <IoDocumentTextOutline className="text-4xl ml-6 text-main hover:text-gray-500 cursor-pointer transition duration-500" />
          <IoArrowBackOutline className="text-4xl ml-6 text-main hover:text-gray-500 cursor-pointer transition duration-500" />
        </div>
      </div>
      <div className="px-4 overflow-y-auto">
        {
          messages.map((message, i) => {
            return (
              <div className={clsx(['flex mt-14 w-full'], {
                'mb-[100px]': i === (messages.length - 1)
              })}>
                <div className={clsx(['bg-white w-5/12 p-4 rounded-xl'], {
                  'ml-auto': message.user.id === 2
                })}>
                  <p className="text-main">{message.user.name}</p>
                  <p className="my-2">{message.message}</p>
                  <p className="text-right font-bold">{message.createdAt}</p>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="bg-white flex absolute w-full bottom-0 left-0 p-4">
        <input type="text" placeholder="Escribe un mensaje aqui" className="w-10/12 border-none rounded-full bg-gray-200" />
        <div className="flex justify-between w-2/12 text-gray-700 px-4">
          <div>
            <label htmlFor="file">
              <IoAttachOutline className="text-4xl cursor-pointer transition transform duration-500 hover:text-main hover:scale-110" />
            </label>
            <input className="hidden" type="file" name="file" id="file" />
          </div>
          <div>
            <label htmlFor="images">
              <IoImagesSharp className="text-4xl cursor-pointer transition transform duration-500 hover:text-main hover:scale-110" />
            </label>
            <input className="hidden" type="file" name="images" id="images" />
          </div>
          <div>
            <IoSend className="text-4xl cursor-pointer transition transform duration-500 hover:text-main hover:scale-110" />
          </div>
        </div>
      </div>
    </div >
  )
}

export default ConversationsChat;