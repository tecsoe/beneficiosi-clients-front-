import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { generateImageUrl } from "../helpers/url";

const FeaturedStores = ({ storesAds }) => {

    return (
        <div className="container mt-20">
            {
                storesAds?.length > 0 ?
                    <Swiper
                        navigation
                        autoplay
                        centeredSlides={window.innerWidth > 768 ? false : true}
                        style={{ padding: "30px 0" }}
                        slidesPerView={window.innerWidth > 768 ? 4 : 1}
                        spaceBetween={25}
                        pagination={{ clickable: true }}
                        onSlideChange={() => { }}
                        onSwiper={(swiper) => { }}
                    >
                        {
                            storesAds?.map((storesAd, i) => {
                                return (
                                    <SwiperSlide key={storesAd.id}>
                                        <div className="relative bg-white md:max-w-xs w-full rounded-md overflow-hidden shadow">
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/${storesAd?.store?.storeProfile?.frontImage}`}
                                                alt={storesAd.name}
                                                className="h-20 w-full"
                                            />

                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/${storesAd?.store?.storeProfile?.logo}`}
                                                alt={storesAd.name}
                                                className="absolute bg-white left-1/2 top-[40px] h-20 w-20 transform -translate-x-1/2 rounded shadow-md"
                                            />

                                            <div className="p-4 pt-16 space-y-7">
                                                <h4 className="text-2xl text-center">
                                                    <Link className="hover:text-main" to={`/stores/${storesAd.store?.slug}`}>
                                                        {storesAd?.store?.name}
                                                    </Link>
                                                </h4>

                                                <div className="flex justify-evenly space-x-2">
                                                    {
                                                        storesAd?.products?.length > 0 ?
                                                            storesAd?.products?.slice(0, 3).map((product, i) => {
                                                                return (
                                                                    <a key={i} href={`/products/${product.slug}`}>
                                                                        <img
                                                                            src={generateImageUrl(product.productImages?.[0]?.path)}
                                                                            alt=""
                                                                            className="w-14 h-14 border border-gray-200 rounded"
                                                                        />
                                                                    </a>
                                                                )
                                                            })
                                                            :
                                                            <div className="w-full text-red-500 text-center">
                                                                La tienda no tiene productos
                                                            </div>
                                                    }
                                                </div>

                                                <div className="text-center">
                                                    <Link className="hover:text-main" to={`/stores/${storesAd.store?.slug}`}>
                                                        Ver Tienda
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                    :
                    <div className="text-main text-center font-bold">
                        <h1 className="text-3xl">Acualmente no tenemos tiendas destacadas.</h1>
                        <p className="mb-12">Puede ir a la pagina de comercios donde podra encontrar una gran variedad de comercios.</p>
                        <a className="bg-main text-white px-8 py-5 rounded hover:bg-white hover:shadow-xl hover:text-main" href={"/stores"}>
                            Ver comercios
                        </a>
                    </div>
            }
        </div >
    )
}

export default FeaturedStores;