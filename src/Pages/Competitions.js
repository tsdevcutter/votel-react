import React, { useEffect, useState } from 'react'
import TopHeader from '../components/TopHeader'
import axios from 'axios';
import * as CONSTANTS from "../CONSTANTS";
import { Link } from 'react-router-dom';

function Competitions() {
   const [commpetitionList, setCompetitionList]                         = useState([]);

   useEffect(() => {
      collectCompetitionsList();
    }, [])

  const collectCompetitionsList = async () =>{
    try{

      //console.log(CONSTANTS.API_PMODEL);
      const resCompe = await axios.get(CONSTANTS.API_PMODEL + "poles");
      //console.log(resCompe);
      setCompetitionList(resCompe.data)
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="outline-area">
      <TopHeader />
      <div className="content-out-section">
          <div className="container">
            <h3 className="titling">Competitions</h3>
            <div className="sect-strip">
              <div className="row row-wrapper">
                {
                  commpetitionList && (
                    commpetitionList.map((poling, index) => {
                      return <div className="col-md-3" key={index}>
                        <Link to={"/competition/" + poling.id}>
                          <div className="carbo-hr comp-it" style={{ 
                          backgroundImage: `url("${poling.featuredImage.url}")` 
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

export default Competitions