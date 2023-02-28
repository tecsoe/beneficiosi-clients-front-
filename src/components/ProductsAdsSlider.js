import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import laptop from "../assets/images/laptop.jpg";
import computadora from "../assets/images/monitos.jpg";
import ProductAdCard from './ProductAdCard';

const ProductsAdsSlider = ({ productAds, className }) => {

    useEffect(() => {
        console.log();
    }, [])

    return <Swiper
        className={className}
        navigation
        spaceBetween={8}
        slidesPerView={window.innerWidth > 768 ? 2 : 1}
        pagination={{ clickable: true }}
        onSlideChange={() => { }}
        onSwiper={(swiper) => { }}
    >
        {
            productAds.map((productAd, i) => {
                return (
                    <SwiperSlide key={productAd.id}>
                        <ProductAdCard
                            title={productAd.description}
                            subtitle={productAd.title}
                            btnText="Ver más"
                            href={productAd.url}
                            imgSrc={`${process.env.REACT_APP_API_URL}/${productAd.imgPath}`}
                            imgAlt={productAd?.store?.name}
                        />
                    </SwiperSlide>
                )
            })
        }
        <SwiperSlide>
            <ProductAdCard
                title={<>
                    <p>Pc de</p>
                    <p>Escritorios</p>
                </>}
                subtitle="black friday"
                btnText="Ver más"
                href="/#"
                imgSrc={computadora}
                imgAlt="Celulares"
            />
        </SwiperSlide>
        <SwiperSlide>
            <ProductAdCard
                title={<>
                    <p>Toda una variedad</p>
                    <p>de laptops</p>
                </>}
                subtitle="black friday"
                btnText="Ver más"
                href="/#"
                imgSrc={laptop}
                imgAlt="Aires acondicionados"
            />
        </SwiperSlide>
    </Swiper>;
};

export default ProductsAdsSlider;