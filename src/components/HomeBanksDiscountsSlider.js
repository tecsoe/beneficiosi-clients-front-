import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import { Swiper, SwiperSlide } from 'swiper/react';
import useDiscounts from "../hooks/useDiscounts";
import BankDiscountCard from "./dicounts/BankDiscountCard";
import Button from "./Button";

const HomeBanksDiscountsSlider = () => {

    const [filters, setFilters] = useState({
        page: 1,
        isActive: true,
        discountTypeCode: "dit-001"
    })

    const [{ discounts, error: discountsError, loading: discountsLoading }, getDiscounts] = useDiscounts({ axiosConfig: { params: { ...filters } }, options: { useCache: false, manual: true } });

    useEffect(() => {
        getDiscounts({ params: { ...filters } });
    }, [filters, getDiscounts])

    return (
        <>
            <div className="container mt-20">
                <SectionHeading>Beneficios por banco</SectionHeading>
            </div>

            <div className="my-20 md:px-24">
                {
                    discountsError ?
                        <div className="text-red-500 text-center">
                            <p>Ha ocurrido un error.</p>
                            <Button className="bg-main" onClick={() => { getDiscounts({ params: { ...filters } }) }}>
                                Reintentar
                            </Button>
                        </div>
                        :
                        discountsLoading ?
                            <div className="text-center text-2xl text-gray-500">
                                Cargando descuentos...
                            </div>
                            :
                            discounts.length > 0 ?
                                <Swiper
                                    navigation
                                    style={{ padding: window.innerWidth > 768 ? '0 100px' : '0' }}
                                    onSlideChange={() => { }}
                                    slidesPerView={window.innerWidth > 768 ? 2 : 1}
                                    spaceBetween={50}
                                    onSwiper={(swiper) => { }}
                                >
                                    {
                                        discounts.map((banckDiscount, i) =>
                                            <SwiperSlide key={i}>
                                                <BankDiscountCard bankDiscount={banckDiscount} />
                                            </SwiperSlide>
                                        )
                                    }
                                </Swiper>
                                :
                                <div className="text-main text-center font-bold">
                                    <h1 className="text-3xl">No se Encontraron descuentos.</h1>
                                    <p className="mb-12">Puede ir a la seccion de beneficios donde podra encontrar una gran variedad de descuentos.</p>
                                    <a className="bg-main text-white px-8 py-5 rounded hover:bg-white hover:shadow-xl hover:text-main" href={"/benefits"}>
                                        Ver comercios
                                    </a>
                                </div>
                }
            </div>
        </>
    )
}

export default HomeBanksDiscountsSlider;