import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from "react-icons/io5";

const WidgetComponent = ({ widget }) => {

    if (widget.type === 'text') {
        return (
            <p className="text-white text-center md:text-justify">
                {widget.value}
            </p>
        )
    }

    if (widget.type === 'url') {
        return (
            <div>
                <a href={widget.url} className="text-white text-center md:text-justify border-b">
                    {widget.value}
                </a>
            </div>
        )
    }

    if (widget.type === 'image') {
        return (
            <img src={`${process.env.REACT_APP_API_URL}/${widget?.image}`} className="mx-auto md:m-none w-full" />
        )
    }

    if (widget.type === 'socials') {
        return (
            <div className="flex justify-center md:justify-none space-x-4">
                {
                    widget.facebook &&
                    <a className="text-2xl hover:text-main" href={widget.facebook} target="_blank">
                        <IoLogoFacebook />
                    </a>
                }
                {
                    widget.instagram &&
                    <a className="text-2xl hover:text-main" href={widget.instagram} target="_blank">
                        <IoLogoInstagram />
                    </a>
                }
                {
                    widget.twitter &&
                    <a className="text-2xl hover:text-main" href={widget.twitter} target="_blank">
                        <IoLogoTwitter />
                    </a>

                }
                {
                    widget.youtube &&
                    <a className="text-2xl hover:text-main" href={widget.youtube} target="_blank">
                        <IoLogoYoutube />
                    </a>
                }
            </div>
        )
    }

}

export default WidgetComponent;