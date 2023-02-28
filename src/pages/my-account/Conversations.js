import clsx from "clsx";
import { useState } from "react";
import { IoChatboxEllipsesOutline, IoChevronDownSharp, IoChevronUp, IoCheckmarkCircleSharp } from "react-icons/io5";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useQuestions from "../../hooks/useQuestions";
import Pagination from "../../components/Pagination";


const tabsLink = [
  {
    value: 1,
    title: 'Preguntas',
    icon: <IoChatboxEllipsesOutline />
  }
]

const TabBody = ({ children, show, className }) => {
  return (
    <div hidden={!show} className={`${className} p-4 animate__animated animate__fadeIn`}>
      {children}
    </div>
  )
}

const MyAccountConversations = () => {

  const { setLoading, setCustomAlert, user } = useAuth();

  const [showAnswer, setShowAnswer] = useState(null);

  const [activeTab, setActiveTab] = useState(1);
  const [filters, setFilters] = useState({
    page: 1,
    sort: "createdAt,DESC",
    askedById: user?.id
  });

  const [{ questions, numberOfPages, error, loading }] = useQuestions({
    axiosConfig: {
      params: {
        ...filters
      }
    }
  });

  useEffect(() => {
    if (error) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${error?.response?.status === 400 ? error?.response?.data.message[0] : error?.response?.data.message}.`, severity: "error" });
    }
  }, [error, setLoading, setCustomAlert]);

  useEffect(() => {
    console.log(questions);
  }, [questions])

  useEffect(() => {
    setLoading({ show: loading, message: "Cargando preguntas" })
  }, [loading, setLoading])


  const handleShowAnswer = (i) => {
    setShowAnswer((oldShowAnswer) => {
      return oldShowAnswer === i ? null : i
    });
  }

  const handleChange = (e) => {
    setFilters((oldFilters) => {
      return {
        ...oldFilters,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <div className="p-4">
      <div className="flex items-center text-3xl text-gray-500 mb-8">
        <IoChatboxEllipsesOutline />
        <p>Preguntas y respuestas</p>
      </div>
      <div className="bg-white rounded">
        <div>
          <div className="flex items-center justify-between">
            {
              tabsLink.map((tab, i) => {
                return (
                  <div className={clsx([`flex justify-center w-full text-xl text-gray-500 items-center cursor-pointer p-2`],
                    {
                      'text-main border-b border-main': tab.value === activeTab
                    }
                  )} key={i} onClick={() => { setActiveTab(tab.value) }}>
                    {tab.icon}
                    <h1 className="ml-2">{tab.title}</h1>
                  </div>
                )
              })
            }
          </div>
          <div>
            <TabBody show={activeTab === 1}>
              {
                questions.map((question, i) => {
                  return (
                    <div key={i} className="border-b py-4">
                      {
                        question?.answer &&
                        <div className="flex justify-end items-center text-xl text-green-500">
                          Respondida < IoCheckmarkCircleSharp />
                        </div>
                      }
                      <div className="md:flex items-center">
                        <div className="md:w-1/2">
                          <div className="md:flex text-center md:text-left items-center">
                            <img className="md:w-1/12 rounded-full" src={`${process.env.REACT_APP_API_URL}/${question?.product?.productImages?.[0].path}`} alt="" />
                            <a href={`${process.env.REACT_APP_HOST}products/${question?.product?.slug}`} className="text-blue-500 text-xl">
                              {question?.product?.name}
                            </a>
                          </div>
                          <div className="text-gray-500 mt-4">
                            {question?.question ? question?.question : <span className="text-red-500">No hay pregunta.</span>} - <b>{question.createdAt.toLocaleString()}</b>
                          </div>
                        </div>
                        <div className="md:w-1/2">
                          <div className="font-bold text-gray-500">
                            Tienda:
                          </div>
                          <div className="text-right">
                            <img className="ml-auto rounded-full w-16 h-16 shadow-lg" src={`${process.env.REACT_APP_API_URL}/${question?.product?.store?.storeProfile?.logo}`} alt="" />
                            <a target="_blank" rel="noreferrer" className="text-blue-500" href={`${process.env.REACT_APP_HOST}stores/${question?.product?.store?.slug}`}>{question?.product?.store?.name}</a>
                          </div>
                        </div>
                      </div>
                      {
                        question?.answer &&
                        <div className="text-right">
                          <button className="flex items-center ml-auto text-main" onClick={() => { handleShowAnswer(i) }}>
                            Ver respuesta {showAnswer === i ? <IoChevronUp /> : <IoChevronDownSharp className="ml-2" />}
                          </button>
                          {
                            showAnswer === i &&
                            <div className="animate__animated animate__fadeInLeft animate__faster text-left text-gray-500">
                              {question?.answer} - <b>{question?.answeredAt.toLocaleString()}</b>
                            </div>
                          }
                        </div>

                      }
                    </div>
                  )
                })
              }
            </TabBody>
          </div>
        </div>
        {
          numberOfPages > 1 &&
          <div className="py-4">
            <Pagination pages={numberOfPages} activePage={filters.page} onChange={e => { handleChange({ target: { name: "page", value: e } }) }} />
          </div>
        }
      </div>
    </div>
  )
}

export default MyAccountConversations;