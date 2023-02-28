import partner from '../assets/images/partner.jpg';
import waveUp from '../assets/images/wave-up.png';
import waveDown from '../assets/images/wave-down.png';
import clients from '../assets/images/clients.jpg';

const BussinessSection = ({ businessSectionData }) => {

    return (
        <div
            className="my-24 md:my-80 bg-white relative"
        >
            <img
                src={waveUp}
                alt="Wave up"
                className="w-full absolute transform -translate-y-full"
            />
            <div className="container">

                <h3 className="text-5xl text-center font-semibold">{businessSectionData?.sectionTitle ? businessSectionData?.sectionTitle : 'Hagámoslo juntos'}</h3>

                <div className="md:flex space-y-8 md:space-y-0 space-x-4 mt-20">
                    {[
                        {
                            imgSrc: businessSectionData?.leftSectionImage ? process.env.REACT_APP_API_URL + "/" + businessSectionData?.leftSectionImage : partner,
                            title: businessSectionData?.leftSectionTitle ? businessSectionData?.leftSectionTitle : 'Hazte Partner',
                            content: businessSectionData?.leftSectionText ? businessSectionData?.leftSectionText : '¡Crece con BeneficioSi! ¡Nuestra tecnología y base de usuarios puede ayudarte a aumentar las ventas y descubrir nuevas oportunidades!',
                            button: {
                                text: businessSectionData?.leftSectionBtnText ? businessSectionData?.leftSectionBtnText : "UNETE",
                                color: businessSectionData?.leftSectionBtnColor ? businessSectionData?.leftSectionBtnColor : "#F04141",
                                url: businessSectionData?.leftSectionBtnUrl ? businessSectionData?.leftSectionBtnUrl : "#",
                            }
                        },
                        {
                            imgSrc: businessSectionData?.rightSectionImage ? process.env.REACT_APP_API_URL + "/" + businessSectionData?.rightSectionImage : clients,
                            title: businessSectionData?.rightSectionTitle ? businessSectionData?.rightSectionTitle : 'Registrate como cliente',
                            content: businessSectionData?.rightSectionText ? businessSectionData?.rightSectionText : 'Pedí online rápido y fácil a reconocidas marcas y +10.000 restaurantes',
                            button: {
                                text: businessSectionData?.rightSectionBtnText ? businessSectionData?.rightSectionBtnText : "UNETE",
                                color: businessSectionData?.rightSectionBtnColor ? businessSectionData?.rightSectionBtnColor : "#F04141",
                                url: businessSectionData?.rightSectionBtnUrl ? businessSectionData?.rightSectionBtnUrl : "#",
                            }
                        },
                    ].map((item, i) => <div
                        key={i}
                        className="md:w-1/2 flex flex-col items-center"
                    >
                        <div className="flex flex-col items-center space-y-6 mb-6">
                            <img
                                src={item.imgSrc}
                                alt={`bussinesInfoImageleft + ${i + 1}`}
                                className="h-60 w-60 rounded-full shadow"
                            />
                            <h4 className="text-3xl font-semibold">{item.title}</h4>
                            <p className="max-w-[350px] text-center text-base">
                                {item.content}
                            </p>
                        </div>

                        <a
                            href={item.button.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center
                                mt-auto px-6 py-4 space-x-2
                                leading-4
                                border border-white rounded-lg shadow
                                text-white text-xl font-semibold"
                            style={{ background: item.button.color }}>
                            {item.button.text}
                        </a>
                    </div>)}
                </div>
            </div>

            <img
                src={waveDown}
                alt="Wave down"
                className="w-full absolute bottom-0 transform translate-y-full"
            />
        </div>
    )
}

export default BussinessSection;