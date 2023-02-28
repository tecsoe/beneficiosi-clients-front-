import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";
import SystemInfo from "../util/SystemInfo";
import { useEffect, useState } from "react";
import clsx from "clsx";
import WidgetComponent from "./WidgetComponent";
const Footer = () => {

    const [{ data: footerData, error: footerError, loading: footerLoading }, getFooter] = useAxios({ url: `/settings/footer-sections` }, { useCache: false });

    const [footer, setFooter] = useState({});

    useEffect(() => {
        if (footerData) {
            setFooter(footerData);
        }
    }, [footerData])

    return (
        <footer className="bg-gray-800 text-white mt-auto pt-12 pr-12 pl-12 pb-2">
            <div className="container h-full">
                <div className="flex items-center mb-2">
                    <img src={SystemInfo.logo} className="w-12" alt={SystemInfo.name} />
                    <p className="font-bold text-white text-md ml-3">{SystemInfo.name}</p>
                </div>
                <div className="block md:flex justify-between items-top h-full">
                    {
                        Object.keys(footer).map((section, i) => {
                            return (
                                <div key={i} className={clsx(['text-center'], {
                                    'hidden': !footer[section]?.isActive
                                })}>
                                    <div>
                                        <h1 className="text-white font-bold my-5">
                                            {footer[section]?.name}
                                        </h1>
                                        <div className="space-y-2">
                                            {
                                                footer[section]?.widgets?.map((widget, i2) => {
                                                    return (
                                                        <WidgetComponent widget={widget} key={i2} />
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="text-center mt-4">
                    <p>© 2019 <span className="text-main">{SystemInfo.name}.</span> Todos los derechos reservados. Diseñado por J.V & A.N</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;