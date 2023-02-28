import clsx from "clsx";
import { useCallback, useEffect, useRef } from "react";
import Button from "../Button";
import NotificationRow from "./NotificationRow";

const NotificationsList = ({ notifications, open, error, onClose, onScrollEnd, numberOfPages, retry, page, loading, ...rest }) => {

    const modalRef = useRef();

    const observer = useRef();

    const lastNotificationRef = useCallback((notification) => {
        if (observer?.current) observer?.current?.disconnect?.();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                onScrollEnd();
            }
        })
        if (notification) observer?.current?.observe?.(notification)
    }, [numberOfPages, page, onScrollEnd]);

    useEffect(() => {
        const listener = (e) => {
            if (e.target !== modalRef?.current && !modalRef?.current?.contains(e.target) && open) {
                onClose();
            }
        };
        window.addEventListener("click", listener);
        return () => window.removeEventListener('click', listener);
    }, [open, onClose])

    if (!open) {
        return null
    }

    return (
        <div {...rest} ref={modalRef} style={{ top: "110%" }} className={clsx(["absolute right-0 z-50 animate__animated animate__fadeInUp"])}>
            <div style={{ height: "70vh", width: 350, overflowY: "auto" }} className="relative text-gray-500 p-2 rounded bg-white shadow-xl custom-scrollbar">
                {
                    error ?
                        <div className="text-red-500 my-auto text-center">
                            <p>Ha ocurrido un error</p>
                            <Button className="bg-main" onClick={retry}>
                                Reintentar
                            </Button>
                        </div>
                        :
                        <div>
                            <h3 className="text-2xl font-bold">
                                Notificaciones
                            </h3>
                            {
                                notifications?.length > 0 ?

                                    notifications?.map((notification, i) => {
                                        return (
                                            <NotificationRow
                                                key={i}
                                                ref={i + 1 === notifications.length ? lastNotificationRef : null}
                                                onClick={onClose}
                                                notification={notification} />
                                        )
                                    })
                                    :
                                    <div style={{ margin: "50% 0" }} className="text-center">
                                        No tienes notificaciones actualmente.
                                    </div>
                            }
                            {
                                loading &&
                                <div className="text-center">
                                    Obteniendo mas...
                                </div>
                            }
                        </div>
                }
            </div>
        </div >
    )
};

export default NotificationsList;