import useAxios from "../hooks/useAxios";
import shield from '../assets/images/shield.png';
import callCenterAgent from '../assets/images/call-center-agent.png';
import rent from '../assets/images/rent.png';

const NecessaryInfo = () => {

    const [{ data: necessaryInfoSectionData, error: necessaryInfoSectionError }, getNecessaryInfoData] = useAxios({ url: "/settings/needed-info" }, { useCache: false });

    return (
        <div className="container my-20">
            <div className="md:flex space-y-8 md:space-y-0 justify-evenly">
                {[
                    {
                        imgSrc: necessaryInfoSectionData?.leftSectionImage ? process.env.REACT_APP_API_URL + "/" + necessaryInfoSectionData?.leftSectionImage : shield,
                        title: necessaryInfoSectionData?.leftSectionTitle ? necessaryInfoSectionData?.leftSectionTitle : 'Publicaciones verificadas',
                        content: necessaryInfoSectionData?.leftSectionDescription ? necessaryInfoSectionData?.leftSectionDescription : 'Nuestras publicaciones requieren una validación por datos y controlamos lo publicado'
                    },
                    {
                        imgSrc: necessaryInfoSectionData?.middleSectionImage ? process.env.REACT_APP_API_URL + "/" + necessaryInfoSectionData?.middleSectionImage : rent,
                        title: necessaryInfoSectionData?.middleSectionTitle ? necessaryInfoSectionData?.middleSectionTitle : 'Compra protegida',
                        content: necessaryInfoSectionData?.middleSectionDescription ? necessaryInfoSectionData?.middleSectionDescription : 'Podés señar el auto que quieras y si la compra no se hace efectiva se te devuelve el importe al 100%'
                    },
                    {
                        imgSrc: necessaryInfoSectionData?.rightSectionImage ? process.env.REACT_APP_API_URL + "/" + necessaryInfoSectionData?.rightSectionImage : callCenterAgent,
                        title: necessaryInfoSectionData?.rightSectionTitle ? necessaryInfoSectionData?.rightSectionTitle : 'Soporte',
                        content: necessaryInfoSectionData?.rightSectionDescription ? necessaryInfoSectionData?.rightSectionDescription : 'Acompañamos el proceso asegurandonos de que todo salga correctamente'
                    },
                ].map(item => <div
                    className="flex flex-col items-center space-y-4 w-full md:max-w-xs"
                    key={item.title}
                >
                    <img
                        src={item.imgSrc}
                        alt={item.title}
                        className="h-20 w-20"
                    />

                    <h4 className="text-xl font-semibold">{item.title}</h4>

                    <p className="text-center">{item.content}</p>
                </div>)}
            </div>
        </div>
    )
}

export default NecessaryInfo;