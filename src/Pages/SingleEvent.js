import React, { useEffect, useRef, useState } from 'react'
import TopHeader from '../components/TopHeader';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import * as CONSTANTS from "../CONSTANTS";
import { FaPlay , FaRegWindowClose} from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet';

function SingleEvent() {
  const [currentEvent, setCurrentEvent]                         = useState();
  const [popUpFrame, setPopUpFrame]                             = useState(false);
  const [winningCandidate, setWinningCandidate]                 = useState(null);
  const [fullCandidate, setFullCandidate]                       = useState(null);
  const [clickOnImage, setClickOnImage]                         = useState("");
  const [popUpImage, setPopUpImage]                             = useState(false);

  const [secondFeatured, setSecondFeatured]                             = useState("");
  const [secondaryWinnerCandidate, setSecondaryWinnerCandidate]         = useState();

  const params                                                  = useParams();

  const DURATION                            = 0.25;
  const STAGGER                             = 0.025;

  /*Scaling Main Image ))*/
  const containerRef                                          = useRef(null);
  const { scrollYProgress }                                   = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })
  const scale4 = useTransform(scrollYProgress, [0,1], [1,4]);
  //////////////////

  useEffect(() => {
    collectSingleEvent();
  },[])

  useEffect(() => {
    if(winningCandidate !== null){
        collectCandidateDetails()
    }
  },[winningCandidate])

  const collectSingleEvent = async () => {
    try{

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: CONSTANTS.API_PMODEL + "occassion/"+ params.id,
      };

      const resEvent = await axios(config);
      
      //console.log("resEvent");
      setCurrentEvent(resEvent.data);

      if(resEvent.data.winning_candidate){
        setWinningCandidate(resEvent.data.winning_candidate);
      }

      //If have secondary winner exists
      if(resEvent.data.second_feature !== false){
        setSecondFeatured(resEvent.data.second_feature.url);
        const secondWin = await axios.get(CONSTANTS.API_PMODEL + "candidate/" + resEvent.data.feature_candidate.ID);
        setSecondaryWinnerCandidate(secondWin.data);
      }

    }catch(err){
      console.log(err);
    }
  }

  const collectCandidateDetails = async () => {
    try{

      const resCandidate = await axios.get(CONSTANTS.API_PMODEL + "candidate/" + winningCandidate.ID);
      setFullCandidate(resCandidate.data);
      
    }catch(err){
      console.log(err);
    }
  }

  const getCurrentImage = (imgCurrent) => {
    //console.log(imgCurrent)
    setClickOnImage(imgCurrent.full_image_url);
    setPopUpImage(true);
  }
  return (
    <div className="outline-area">
      {
        currentEvent && (
          <Helmet>
                  <title>Votel - {currentEvent.title}</title>
                  <meta name="description" content={currentEvent.description_event} />
          </Helmet>
        )
      }
      
      <TopHeader />
      <div className="content-out-section">
        {
          currentEvent &&(
            <div className="event-details">
              <div className="base-line-event" style={{ 
                          backgroundImage: `url("${currentEvent.featured_image.banner.url}")` 
                        }}>
                      <div className="container pdtop40">
                          <motion.div
                            initial="initial"
                            whileHover="hovered"
                            className="landing-area-text">
                          <div className="special-name-single">
                                {
                                  currentEvent.event_year.split("").map((l, i) => {
                                    return (
                                      <motion.span 
                                        variants={{
                                          initial: { y:0},
                                          hovered: {y: "-100%"},
                                        }}
                                        transition={{
                                          duration: DURATION,
                                          ease: "easeInOut",
                                          delay: STAGGER * i
                                        }}
                                        key={i}
                                        className="dis-Inline">
                                        {l}
                                      </motion.span>
                                    )
                                  })
                                }
                              </div>
                              <div className="special-name-single abso-lute">
                                {
                                  currentEvent.event_year.split("").map((l, i) => {
                                    return (
                                      <motion.span 
                                        variants={{
                                          initial: { y: "100%"  },
                                          hovered: { y: 0 },
                                        }}
                                        key={i}
                                        transition={{
                                          duration: DURATION,
                                          ease: "easeInOut",
                                          delay: STAGGER * i
                                        }}
                                        className="dis-Inline">
                                        {l}
                                      </motion.span>
                                    )
                                  })
                                }
                              </div>
                          </motion.div>
                          <div className="mgtop30">
                              <button className="btn-unstyle btn-play btn-play-home" onClick={() => setPopUpFrame(true)}>
                                <FaPlay />
                              </button>
                          </div>
                      </div>
              </div>
              <div className="pdtop60 container">
                  <div className="row">
                    <div className="col-md-6">
                        <div className="info-block">
                           <h2 className="head-2">{currentEvent.title}</h2>
                           <div className="info-block-content1">
                           {currentEvent.description_event }
                           </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="image-block image-raft">
                          <img src={currentEvent.featured_image.small.url } className="votel-image-block1" alt={"Votel " + currentEvent.title}/>                           
                        </div>
                    </div>
                  </div>
              </div>
              <div className="cream-section">
                  <div className="container">
                    <h3 className="winner-base">Pageant <span>WINNER</span></h3>
                    {
                      fullCandidate && (
                        <div className="candidate-info-outer">
                          <div ref={containerRef} className="candidate-info">
                            <div className="candidate-info-sticky">
                              <h2 className="title-winner sticky-title">{fullCandidate.candidate_name} <span className="s-winner">{fullCandidate.candidate_surname}</span></h2>
                              <div className="eli-image">
                                  <motion.div style={{scale:scale4}}className="image-feature-main">
                                       <img className="featured-candidate" src={fullCandidate.candidate_featured_image.url} alt={fullCandidate.candidate_name} />
                                  </motion.div>
                              </div>
                            </div>
                          </div>
                                                      
                          <div className="bio-outer">  
                            <div className="bio-candidate" dangerouslySetInnerHTML={{__html:fullCandidate.candidate_bio} }>                   
                            </div>
                          </div>
                          <div className="gallery-box-outer">
                             <div className="gallery-box">
                              {
                                fullCandidate.gallery_photo_list.map((imagery, index) => {
                                  return (<div className="pics" key={index} onClick={() => getCurrentImage(imagery)}>
                                    <img src={imagery.full_image_url} className="can-img" alt={"Votel - " + imagery.alt_text} />
                                    </div>)
                                })
                              }
                             </div>  
                          </div>
                        </div>
                      )
                    }
                    
                  </div>
              </div>

              {
                secondFeatured.length > 0 && (
                  <div className="secondary-lane pdtop60">
                    
                      <div className="base-second-winner" style={{ 
                          backgroundImage: `url("${secondFeatured}")` 
                        }}>
                          <div className="pdtop40">
                              <div className="special-name-single">2014</div>
                          </div>
                      </div>   
                      <h3 className="winner-base">Pageant <span>2nd WINNER</span></h3>    
                      {
                        secondaryWinnerCandidate && (
                          <div className="rift-sect container">
                              <div className="pdtop200 ">
                                  <div className="row">   
                                    <div className="col-md-6">
                                        <div className="info-block">
                                          <h2 className="head-2 super-head">{secondaryWinnerCandidate.candidate_name } {secondaryWinnerCandidate.candidate_surname }</h2>    
                                        </div>
                                    </div>                         
                                    <div className="col-md-6">
                                        <div className="image-block">
                                          <img 
                                            src={secondaryWinnerCandidate.candidate_featured_image.url} 
                                            className="votel-image-block1" 
                                            alt={secondaryWinnerCandidate.candidate_name + " " + secondaryWinnerCandidate.candidate_surname}/>                           
                                        </div>
                                    </div>                                   
                                  </div>
                              </div>
                              <div className="gallery-box-outer">
                                    <div className="gallery-box">
                                      {
                                        secondaryWinnerCandidate.gallery_photo_list.map((imagery, index) => {
                                          return (<div className="pics" key={index} onClick={() => getCurrentImage(imagery)}>
                                            <img src={imagery.full_image_url} className="can-img" alt={"Votel - " + imagery.alt_text} />
                                            </div>)
                                        })
                                      }
                                    </div>  
                              </div>
                          </div>
                        )
                      }               
                      
                  </div>
                )
              }
            </div>
          )
        }
        <div className="last-section">
          
            <Link className="last-no-style" to={"/miss-south-africa"}>
              <span className="open-highlight">MISS</span> 
              <span className="style-two">SOUTH</span>
              <span className="style-two">AFRICA</span>
            </Link>
        </div>
        {
          popUpFrame &&(
            <div className="black-modal">
                <button className="btn-unstyle nav-button-size1" onClick={() => setPopUpFrame(false)}> <FaRegWindowClose/></button>
                    <div className="modal-body-frame">
                    <iframe className="frame-view-action" 
                            src={currentEvent.link_youtube_snipp } 
                            title="YouTube video player" 
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
              </div>
          )
        }
        {
          popUpImage &&(
            <div className="black-modal">
                <button className="btn-unstyle nav-button-size1" onClick={() => setPopUpImage(false)}> <FaRegWindowClose/></button>
                    <div className="modal-body-frame">
                       <img src={clickOnImage} className="viewed-image" alt="Video Pageant"/>
                    </div>
              </div>
          )
        }
      </div>
    </div>
  )
}

export default SingleEvent