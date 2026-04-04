import axios from 'axios';
import React, { useEffect, useState } from 'react'
import * as CONSTANTS from "../CONSTANTS";
import EventSlide from '../components/EventSlide';
import {FaPlay, FaRegWindowClose} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Home() {

  const [currentEvent, setCurrentEvent]                                 = useState();
  const [eventList, setEventList]                                       = useState([]);
  const [showSnipVideoModal, setShowSnipVideoModal]                     = useState(false);

  const defaultImageUrl = 'https://votelog.tsdevcut.co.za/wp-content/themes/votelogs/images/banner-5185596.png';
 
  useEffect(() => {
    collectListOfEvents();
  },[]);

  const collectListOfEvents = async () => {
    try{
      const resEvents = await axios.get(CONSTANTS.API_PMODEL + "occassions");
      //console.log(resEvents);
      if(resEvents.data.length > 0){
        setCurrentEvent(resEvents.data[0]);
        setEventList(resEvents.data);
      }
    }catch(err){
      console.log(err);
    }
  }

  const handleSlideChange = (slideObject) => {
    setCurrentEvent(slideObject);
  }

  const viewPopVideo = ()=> {
    console.log(currentEvent);
    setShowSnipVideoModal(true)
  }
  return (
    <>
     <Helmet>
            <title>Votel Pageant</title>
            <meta name="description" content="A platform to showcase some of the best beauty pageants in the African continent" />
      </Helmet>
      {
        currentEvent && (
          <div className="banner" style={{ 
              backgroundImage: `url("${currentEvent.banner_event_main.url ? currentEvent.banner_event_main.url : defaultImageUrl}")` 
              }}>
             
              <div className="center-screen-outer">
                  <div className="center-screen-inn">
                  <div className="slider-row">
                     {
                      eventList && eventList.length > 0 && 
                      ( 
                        <EventSlide  
                                slideItems={eventList} 
                                slideChanger={handleSlideChange} 
                                setUpdateCurrent={setCurrentEvent}
                                eventList={eventList}
                                />
                        )
                     }
                  </div>
                    <div className="content-row">
                      <div className="row">
                          <div className="col-md-7">
                            {
                                currentEvent && (
                                  <>
                                  <h3 className="mghom-head">{currentEvent.title}</h3>
                                  <div className="mid-copy-text home-copy">
                                    {currentEvent.description_event}
                                  </div>
                                  </>
                                )
                            }
                          </div>
                          <div className="col-md-5">
                            <div className="find-link">
                               <Link to={"/event/" + currentEvent.id} className="btn btn-view-fades">View</Link>
                            </div>
                          </div>
                      </div>
                    </div>
                    <div className="bottom-shadow-view">
                    </div>
                </div>
              </div>
          </div>
        )
      }
    </>
  )
}

export default Home