import SectionHeading from "../SectionHeading";
import { Swiper, SwiperSlide } from 'swiper/react';
import StoreDiscountCard from "../StoreDiscountCard";
import Button from "../Button";
import { useEffect, useState } from "react";
import DiscountModal from "./DiscountModal";
import useDiscounts from "../../hooks/useDiscounts";

const DiscountsSlider = ({ showTitle, storeId, slidesPerview }) => {

    const [discount, setDiscount] = useState(null);

    const [filters, setFilters] = useState({
        page: 1,
        isActive: true,
        storeIds: storeId ? [storeId] : []
    });

    const [{ discounts, error: discountsError, loading: discountsLoading }, getDiscounts] = useDiscounts({ axiosConfig: { params: { ...filters, storeIds: storeId } }, options: { useCache: false, manual: true } });

    useEffect(() => {
        getDiscounts({
            params: {
                ...filters,
                storeIds: storeId
            }
        })

    }, [storeId])

    const handleDiscount = (discount) => {
        setDiscount(discount);
    }

    return (
        <div>
            {
                showTitle &&
                <div className="container mt-20">
                    <SectionHeading>Descuentos</SectionHeading>
                </div>
            }

            <div className="md:px-24">
                {
                    discountsError ?
                        <div className="text-red-500 text-center">
                            <p>Ha ocurrido un error.</p>
                            <Button className="bg-main" onClick={() => { getDiscounts() }}>
                                Reintentar
                            </Button>
                        </div>
                        :
                        discountsLoading ?
                            <div className="text-center text-2xl text-gray-500">
                                Cargando descuentos...
                            </div>
                            :
                            discounts?.length > 0 ?
                                <Swiper
                                    navigation
                                    style={{ padding: '0 100px' }}
                                    className="my-20"
                                    onSlideChange={() => { }}
                                    slidesPerView={slidesPerview ? slidesPerview : 1}
                                    spaceBetween={50}
                                    onSwiper={(swiper) => { }}
                                >
                                    {
                                        discounts.map((discount, i) =>
                                            <SwiperSlide key={i}>
                                                <StoreDiscountCard emitDiscount={handleDiscount} storeType={storeId ? true : false} storeDiscount={discount}></StoreDiscountCard>
                                            </SwiperSlide>
                                        )
                                    }
                                </Swiper>
                                :
                                null
                }
                <DiscountModal discount={discount} onClose={() => { setDiscount(null) }} />
            </div>
        </div>
    )
}

export default DiscountsSlider;