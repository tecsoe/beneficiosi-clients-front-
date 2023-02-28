import { Link } from "react-router-dom";
import SystemInfo from "../util/SystemInfo";

const PageLogo = () => {
    return (
        <Link className="flex items-center text-white space-x-4" to="/">
            <img
                src={SystemInfo.logo}
                alt={SystemInfo.name}
                className="inline-block h-9 rounded-lg"
            />
            <span className="md:hidden">{SystemInfo.name}</span>
        </Link>
    )
}

export default PageLogo;