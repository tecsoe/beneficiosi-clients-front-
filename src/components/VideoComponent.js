import { useEffect, useState } from "react";
import { validURL } from "../helpers/formsValidations";

const VideoComponent = ({ url }) => {

    const [videoUrl, setVideoUrl] = useState({
        url: '',
        type: ''
    });

    useEffect(() => {
        if (url && validURL(url)) {
            var url_string = url;
            var newUrl = new URL(url_string);
            var v = newUrl.searchParams.get("v");
            if (v) {
                setVideoUrl({
                    type: 'youtube',
                    url: `https://www.youtube.com/embed/${v}`
                });
            } else {
                setVideoUrl({
                    type: 'another',
                    url: url
                });
            }

        }
    }, [url]);

    return (
        <div className="text-center space-y-4">
            {
                videoUrl?.type === 'youtube' ?
                    <iframe
                        className="mx-auto h-56 w-full my-8 md:my-8 md:w-9/12 md:h-[60vh]"
                        src={videoUrl?.url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    :
                    <video src={videoUrl?.url} className="mx-auto h-56 w-full my-8 md:my-8 md:w-9/12 md:h-[60vh]"></video>
            }
        </div>
    )
}

export default VideoComponent;