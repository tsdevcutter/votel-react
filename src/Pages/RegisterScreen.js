import React, { useRef, useState } from 'react'
import * as CONSTANTS from "../CONSTANTS";
import axios from 'axios';
import { toast } from 'react-toastify';

function RegisterScreen() {

    const [processing, setProcessing]            = useState(false);
    const nameRef                               = useRef();
    const surnameRef                            = useRef();
    const emailAddressRef                       = useRef();
    const passwordRef                           = useRef();

    const handleRegistrationPull = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try{
          console.log(CONSTANTS.API_PMODEL);
          const randoNum = Math.floor(Math.random() * 9000) + 1000;
          const userNameField = nameRef.current.value.toLowerCase().replace(/ /g,'') + randoNum;
          const contData = {
            "name" : nameRef.current.value,
            "lastname" : surnameRef.current.value,
            "email" : emailAddressRef.current.value,
            "password" : passwordRef.current.value,
            "username":userNameField
          }
          const resUser = await axios.post(CONSTANTS.API_PMODEL + "users/register", contData);

          console.log(contData);
          console.log(resUser);

          nameRef.current.value         = "";
          emailAddressRef.current.value = "";

          if(resUser.status  === 200){
            toast.success("Thank you for registering.");
          }else {
            toast.warning("Registration is incomplete, please try again later.");
          }
         
         setProcessing(false);
        }catch(err){
          console.log(err);
          setProcessing(false);
          toast.danger("Something went wrong, please try again later.");
        }
    }

  return (
    <div className="auth-cont-body">
        <div className="form-container">
           <div className="flex-form-bridge">
                <div className="form-content">
                   <div className="logo-reg">
                        <h4>Register An Account</h4>
                        <p className="sub-copy-reg">You can upgrade your account if you want to run competitions</p>
                   </div>
                   <div className="rg-forms">
                       <form onSubmit={handleRegistrationPull}>
                          <div className="form-group textinput">
                            <div className="lbl">Name</div>
                            <input type="text" className="form-control innp" ref={nameRef}/>
                          </div>
                          <div className="form-group textinput">
                            <div className="lbl">Surname</div>
                            <input type="text" className="form-control innp" ref={surnameRef}/>
                          </div>
                          <div className="form-group textinput">
                            <div className="lbl">Email</div>
                            <input type="email" className="form-control innp" ref={emailAddressRef} required/>
                          </div>
                          <div className="form-group textinput">
                            <div className="lbl">Password</div>
                            <input type="password" className="form-control innp" ref={passwordRef}/>
                          </div>   
                          <div className="form-group button-input">
                              <button className="btn btn-action btn-vol">Register</button> 
                          </div>                      
                       </form>
                   </div>
                </div>
                <div className="form-video">
                    <video className="full-post" autoplay muted playsInline>
                        <source src="https://votelog.tsdevcut.co.za/wp-content/uploads/2024/08/modelling_reg.mp4" type="video/mp4" />
                    </video>
                </div>
           </div>
           {
            processing && (
              <div className="processing-box">Loading...</div>
            )
           }
        </div>
    </div>
  )
}

export default RegisterScreen