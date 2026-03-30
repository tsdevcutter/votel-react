import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import TopHeader from '../components/TopHeader';
import axios from 'axios';
import * as CONSTANTS from "../CONSTANTS";
import { FaCalendar } from 'react-icons/fa';
import compOne from './../assets/compe1.png';
import compTwo from './../assets/compe2.png';
import compThree from './../assets/compe3.png';
import { Helmet } from 'react-helmet';

function SingleCompetition() {

    const [currentCompetition, setCurrentCompetition]                         = useState();
    const [nomineeList, setNomineeList]                                       = useState([]);
    const params                                                              = useParams();
    
    const imageURLs = [compOne, compTwo, compThree];
    useEffect(() => {
      collectSingleCompetition();
      collectNomineeList();
    },[])

    const collectSingleCompetition = async () => {
        try {

            const resComp = await axios.get(CONSTANTS.API_PMODEL + "poles/"+params.id);
            //console.log("res Comp");
            //console.log(resComp);
            setCurrentCompetition(resComp.data);
                       
        }catch(err){
            console.log(err);
        }
    }

    const collectNomineeList = async () => {
        try {
            //console.log(params.id);
            const resNoms = await axios.get(CONSTANTS.API_PMODEL + "poles/nominees/"+params.id);
            //console.log("res Comp");
            //console.log(resNoms);
          
            if(resNoms.data.nominees !== null){
                setNomineeList(resNoms.data.nominees);
            }
           
        }catch(err){
            console.log(err);
        }
    }


  return (
    <div className="outline-area">
        <Helmet>
                <title>Votel Competition</title>
                <meta name="description" content="A Beautiful Competition hosting some of the best crown jewels of the land." />
        </Helmet>
      <TopHeader />
      <div className="content-out-section">
        {
            currentCompetition && 
            (<div className="comp-landing">
                 <div className="opening-image" style={{ 
                          backgroundImage: `url("${currentCompetition.featuredImage.url}")` 
                        }}>
                    <div className="comp-overlay">
                        <div className="center-block-comp">
                            <div className="txt-model-title">COMPETION MODEL</div>
                            <div className="txt-model-main-title">{currentCompetition.title}</div>
                           
                            <div className="txt-bio" dangerouslySetInnerHTML={{__html:currentCompetition.bio} }>                   
                            </div>
                            <div className="comp-date">
                                <div className="icon-block"><FaCalendar /></div>
                                <div className="block-date">{currentCompetition.startDate} - {currentCompetition.endDate}</div>
                            </div>
                        </div>
                    </div>
                   
                </div>
                <div className="bottom-line">
                    <img src={imageURLs[Math.floor((Math.random() * 3) + 0)]} className="img-line" />
                </div>
                <div className="grid-outline">
                    <div className="top-intro">
                       <div className="title-intro"> OUR MODELS</div>
                        <div className="txt-bio">Vote for your top talent.</div>
                    </div>
                    <div className="list-of-models row">

                        {
                            nomineeList && 
                            (nomineeList.length > 0) && (
                            nomineeList.map((imageBox, index) => {
                                    return (<div class="col-md-4 box-image-nominee" key={index}>
                                                <img src={imageBox.featuredImg.url} class="lay-image-item" alt={"Votel "+ imageBox.name}/>
                                                <div class="content-image">
                                                    <div className="title-nominee">{imageBox.name}</div>
                                                    <div class="white-background">
                                                        <div className="in-text surname-nominee">{imageBox.surname}</div>
                                                        <div className="in-text ">{imageBox.gender}</div>
                                                                                                           
                                                    </div>
                                                </div>
                                            </div>
                                      )
                                })
                            )
                        }
                    </div>
                </div>
            </div>)
        }
           
      </div>
    </div>
  )
}

export default SingleCompetition