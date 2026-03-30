import React, { useEffect, useState } from 'react'
import TopHeader from '../components/TopHeader'
import axios from 'axios';
import * as CONSTANTS from "../CONSTANTS";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Events() {
  const [eventList, setEventList]                      = useState([]);

  useEffect(() => {
    collectEventsList();
  }, [])

  const collectEventsList = async () => {
    try{
      //const resEvents = await axios.get(CONSTANTS.API_BASE + "occasion");
      const resEvents = await axios.get(CONSTANTS.API_PMODEL + "occassions");
      console.log(resEvents);
      setEventList(resEvents.data)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="outline-area">
      <Helmet>
            <title>Votel Miss South Africa</title>
            <meta name="description" content="Our South African pageant winners." />
      </Helmet>
      <TopHeader />
      <div className="content-out-section">
        <div className="container">
          <h3 className="titling">Miss South Africa</h3>
          <div className="sect-strip">
            <div className="row row-wrapper">
               {
                  eventList && (
                    eventList.map((occasion, index) => {
                      return <div className="col-md-3" key={index}>
                        <Link to={"/event/" + occasion.id}>
                          <div className="carbo-hr" style={{ 
                          backgroundImage: `url("${occasion.small_event_image.url}")` 
                            }}></div>
                        </Link>
                      </div>
                    })
                  )
               }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events