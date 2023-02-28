import { IoSendSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { generateImageUrl } from "../helpers/url";

const QuestionsAnswer = ({
  questions,
  className,
  ownerImage,
  ownerName,
  ownerSlug,
  value,
  onChange,
  name = 'question',
  error,
  onSubmit,
  onSeeMoreClick,
  canSeeMore = true,
}) => {
  return (
    <div className={className}>
      <h1 className="text-2xl text-gray-800 mb-4">Preguntale a: </h1>
      <Link to={`/stores/${ownerSlug}`}>
        <div className="text-2xl text-gray-500 flex items-center mb-4">
          {
            ownerImage &&
            <img className="h-20 w-20 mr-2 rounded-xl" src={ownerImage} alt={ownerName} />
          }
          {ownerName}
        </div>
      </Link>

      <form onSubmit={onSubmit} className="space-y-1">
        <div className="space-y-4 md:space-y-0 md:flex items-center">
          <input
            className="py-2 px-3 bg-gray-200 w-11/12 rounded-xl border-none focus:shadow-xl focus:ring-white focus:bg-white transition duration-500 transform"
            placeholder=" Escribe tu pregunta..."
            type="text"
            name={name}
            onChange={onChange}
            value={value}
          />
          <button className="ml-4 flex items-center font-bold bg-main px-8 py-2.5 text-white rounded-xl transition transform duration-500 hover:bg-gray-100 hover:text-main hover:scale-110 hover:shadow-xl">
            Enviar
            <IoSendSharp className="ml-2" />
          </button>
        </div>

        {error && <span className="block text-red-500 text-xs">{error}</span>}
      </form>

      <div style={{ maxHeight: 500 }} className="custom-scrollbar mt-4 overflow-y-auto">
        {questions.map(({ id, askedBy, question, createdAt, answer, answeredAt }) => <div key={id} className="my-8">
          <div className="flex items-center">
            <img className="h-[50px] w-[50px] rounded-full" src={generateImageUrl(askedBy?.imgPath)} alt={askedBy?.name} />
            <p className="ml-4 font-bold">{askedBy?.name}</p>
          </div>

          <p className="mt-2">{question} - <span className="font-bold">{createdAt}</span></p>

          {answer && <div className="text-gray-500 mt-2 ml-4">
            - {answer} <span className="font-bold">- {answeredAt}</span>
          </div>}
        </div>)}

        {canSeeMore && <button type="button" className="text-main mt-2" onClick={onSeeMoreClick}>
          Ver mas preguntas
        </button>}
      </div>
    </div>
  )
}


export default QuestionsAnswer;