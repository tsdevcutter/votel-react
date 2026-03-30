import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './eventslide.css';
import { Autoplay, EffectCoverflow } from 'swiper/modules';

function EventSlide({slideItems , slideChanger, setUpdateCurrent, eventList}) {

    //console.log(slideItems);
    //duration:2500
  return (
    <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        autoplay={{
            delay: 4500,
            disableOnInteraction:false
        }}
        coverflowEffect={{
            rotate:50,
            stretch:0,
            depth:100,
            modifier:1,
            slideShadows:true
        }}
        loop={true}
        modules={[Autoplay, EffectCoverflow]}
        className="eventSliders"
        onSlideChange={(swiper) => setUpdateCurrent(eventList[swiper.realIndex]) }
        >        
        {
            slideItems.map((slide, index) => {
               
               return <SwiperSlide key={index} >
                    <img src={slide.small_event_image.url} alt={"Votel - " + slide.title} onClick={() => slideChanger(slide)}/>
                </SwiperSlide>
            })
        }
    </Swiper>
  )
}

export default EventSlide