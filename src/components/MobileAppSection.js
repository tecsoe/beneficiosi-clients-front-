import useAxios from "../hooks/useAxios";
import appBg from '../assets/images/app-bg.jpg';

const MobileAppSection = () => {

    const [{ data: appSectionData, error: appSectionError }, getAppSectionData] = useAxios({ url: "settings/app-section" }, { useCache: false });

    return (
        <div className="relative py-4 md:py-32 md:mt-20 text-white"
            style={{ background: appSectionData?.backgroundColor ? appSectionData?.backgroundColor : "#F04141", }}
        >
            <div className="container space-y-8 md:space-y-0 md:flex items-center">
                <div className="md:w-7/12 space-y-6">
                    <div className="text-center">
                        <img
                            src={appSectionData?.leftSideImage ? process.env.REACT_APP_API_URL + "/" + appSectionData?.leftSideImage : appBg}
                            alt="Smartphone"
                            className="m-auto w-62 h-28"
                        />
                    </div>
                    <h4 className="text-5xl text-center font-bold flex-wrap" style={{ color: appSectionData?.titleColor ? appSectionData?.titleColor : "white" }}>{appSectionData?.title ? appSectionData?.title : "Descárgate  la app"}</h4>
                    <p className="text-center" style={{ color: appSectionData?.descriptionColor ? appSectionData?.descriptionColor : "white" }}>
                        {
                            appSectionData?.description ? appSectionData?.description : "Pide lo que sea y síguelo en tiempo real con la app BeneficioSi."
                        }
                    </p>
                </div>
                <div className="md:w-5/12">
                    <img
                        src={appSectionData?.rightSideImage ? process.env.REACT_APP_API_URL + "/" + appSectionData?.rightSideImage : appBg}
                        alt="App"
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    )
}

export default MobileAppSection;