import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import clsx from 'clsx';
import NotificationsList from './NotificationsList';
import useNotifications from '../../hooks/useNotifications';
import useAxios from '../../hooks/useAxios';
import SystemInfo from "../../util/SystemInfo";
import { useAuth } from '../../contexts/AuthContext';

import { IoNotificationsSharp } from "react-icons/io5";

const notificationInterface = io(`${process.env.REACT_APP_API_URL}`, { transports: ['websocket'] });

const NotificationsComponent = () => {

    const { user } = useAuth();

    const [open, setOpen] = useState(false);

    const [filters, setFilters] = useState({ page: 1, sort: "createdAt,DESC" });

    const [{ notifications: oldNotifications, numberOfPages, error, loading }, getNotifications] = useNotifications({ options: { manual: true, useCache: false }, axiosConfig: { params: { ...filters } } });
    const [{ data: seenNotificationsData }, notificationsMarkAsSeen] = useAxios({ url: "/notifications/mark-all-as-seen", method: "DELETE" }, { manual: true, useCache: false });

    const [notifications, setNotification] = useState([]);
    const [notificationsNumber, setNotificationsNumber] = useState(0);

    useEffect(() => {
        setNotificationsNumber(notifications?.filter((notification) => !notification?.userToNotification?.seen).length);
    }, [notifications, setNotificationsNumber]);

    useEffect(() => {
        if (notificationsNumber > 0) {
            document.title = `(${notificationsNumber}) ${SystemInfo.name}`
        } else {
            document.title = `${SystemInfo.name}`
        }
    }, [notificationsNumber]);

    useEffect(() => {
        setNotification((oldNotificationsActual) => {
            return [...oldNotificationsActual, ...oldNotifications]
        });
    }, [oldNotifications]);

    useEffect(() => {
        if (user && notificationInterface) {
            notificationInterface.on(`user.${user?.id}`, handleNotification);
            getNotifications({ params: { ...filters } });
        }
    }, [user]);

    useEffect(() => {
        getNotifications({ params: { ...filters } });
    }, [filters, getNotifications])

    const handleNotification = (notification) => {
        setNotification((oldNotificationsActual) => {
            return [notification, ...oldNotificationsActual];
        })
    }

    const handleCloseNotifications = () => {
        setOpen(false);
        setNotificationsNumber(0);
        notificationsMarkAsSeen();
    }

    const toggleOpen = () => {
        setOpen((oldOpen) => !oldOpen);
    }

    const handleScrollEnd = () => {
        if (numberOfPages > filters.page) {
            setFilters((oldFilters) => {
                return {
                    ...oldFilters,
                    page: oldFilters.page + 1
                }
            });
        }
    }

    const handleRetry = () => {
        getNotifications();
    }

    return (
        <>

            <button title="Mis notificaciones" onClick={toggleOpen} className={clsx(["text-xl p-3 rounded-full relative transition duration-300 hover:bg-main hover:text-main hover:bg-opacity-50"], {
                'text-main bg-main bg-opacity-50': open
            })}>
                {
                    notifications?.length > 0 && notificationsNumber > 0 ?
                        <span style={{ right: notificationsNumber.toString().length === 1 ? -5 : notificationsNumber.toString().length === 2 ? -7 : -10, top: -7 }} className="bg-main text-sm text-white absolute top-0 rounded-full px-1">
                            {notificationsNumber}
                        </span>
                        :
                        null
                }
                <IoNotificationsSharp />
            </button>
            <NotificationsList
                retry={handleRetry}
                error={error}
                page={filters.page}
                numberOfPages={numberOfPages}
                loading={loading}
                open={open}
                notifications={notifications}
                onClose={handleCloseNotifications}
                onScrollEnd={handleScrollEnd} />

        </>
    )
}

export default NotificationsComponent;