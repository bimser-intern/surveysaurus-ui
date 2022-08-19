import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import "../style/CreateSurvey.scss"
import Circle from "../image/circle.png"
import Delete from "../image/delete.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import SignOut from "../image/signOut.png"
import { useLocation } from 'react-router-dom'


function CreateSurveyWithLogin() {

  const [formFields, setFormFields] = useState([
    { option: ''},
    { option: ''}, 
  ])
  const location=useLocation()
  const [control, setControl] = useState(true);
  const [title, setTitle] = useState("");
  const [choiceData, setChoiceData] = useState([]);
  const [question, setQuestion] = useState("");

  const logOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem('auth')
    navigate("/login")
}
useEffect(()=>{
  console.log(location.state.auth.name)
})

  const navigate = useNavigate();

  const handleFormChange = (event,index) => {
      let data=[...formFields]
      data[index].option=event.target.value;
      setFormFields(data)
  }
  const addOption = () => {
    let object = {
      option: ""
    }
    setFormFields([...formFields, object]);
  }

  const deleteOption = (index) => {
    let data = [...formFields]
    data.splice(index, 1)
    setFormFields(data)
  }
  function InvalidMsg(e) {
    if (e.target.value == '') {
      e.target.setCustomValidity('Please fill in the marked fields');
    }
    else {
        e.target.setCustomValidity('');
      }
    return true;
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    let storageData=[]
    formFields.map((item)=>{
        storageData.push(item.option)
    })
    //console.log(formFields)
    //console.log(storageData)
    setChoiceData(storageData)
    console.log(storageData)
    //console.log(choiceData)
    //console.log(title)
    //console.log(question)
    if(choiceData.length === formFields.length){
      axios.post(
        'https://survey-api.orangeground-88d990d8.westeurope.azurecontainerapps.io/api/survey/createSurvey',
        {
            "title":title,
            "question":question,
            "choice":choiceData,
        },
        {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        }
       ).then((result)=>{
           alert("The survey creation process was successful.")
           navigate("/userPage")
           console.log(result)
       })
    }
  }
  return (
    <div>
      <div className='Menu'>
                <ul className='navInfo'>
                    <li><Link to={"/userPage"} className='navItem'>Home</Link>
                    </li>
                    <li><Link to={"/userPage"} className='navItem'>My Survey</Link></li>
                </ul>

                <ul>
                    <li>
                        <button className='signUpButton'>
                            <p className='buttonTextLayout'>{location.state.auth.name}</p>
                        </button>
                    </li>
                    <li>
                        <div onClick={() => setControl(!control)} className='UserIcon'>
                            <a href=""></a>
                            <div style={{
                                display: control ? "none" : "flex", top: "45px", zIndex: "100", height: "150px", width: "300px",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#E491924D",
                                marginTop: "10px"
                            }} className='openMenu'>
                                <div onClick={() => navigate("/login")} style={{
                                    width: "80%", height: "30px", backgroundColor: "#F5F5F5CC", marginBottom: "10px", display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "10px"
                                }}>
                                    <Link style={{
                                        fontFamily: 'Inter',
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        fontSize: "13px",
                                        lineHeight: "21px",
                                        textAlign: "center",
                                        color: "#000000",
                                    }} className='menuLink' to={"/userInfo"}>Profile</Link>
                                </div>
                                <div onClick={logOut} style={{
                                    width: "80%", height: "30px", paddingTop: "10px", paddingBottom: "10px", backgroundColor: "#F5F5F5CC",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "10px"
                                }}>
                                    <Link style={{
                                        color: "#FFFFFF", marginLeft: "5px",
                                        fontFamily: 'Inter',
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        fontSize: "13px",
                                        lineHeight: "21px",
                                        textAlign: "center",
                                        color: "#000000",

                                    }} className='menuLink' to={"/login"}>Sign Out</Link>
                                    <img style={{ width: "15px", height: "15px", marginLeft: "10px" }} src={SignOut} alt="" />
                                </div>
                            </div>
                        </div>
                    </li>

                </ul>
                <div className="borderMenuBottomLogin"></div>
            </div>

      <div className='createSurveyContainer'>
        <div className='createSurvey'>
          <div className='questionInput'>
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} onInput={InvalidMsg} onInvalidCapture={InvalidMsg} required style={{marginBottom:"0px"}} type="text" class="form-control questionInputStyle" id="exampleInputEmail1" placeholder="Add your title" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Question</label>
                <input value={question} onChange={(e) => setQuestion(e.target.value)} onInput={InvalidMsg} onInvalidCapture={InvalidMsg} required type="text" class="form-control questionInputStyle" id="exampleInputEmail1" placeholder="Add your question" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Options</label>
                {formFields.map((form, index) => {
                  return (
                    <div className='optionStyle'>
                      <div className='circleStyle'>
                        <img src={Circle} alt="" />
                      </div>
                      <div onClick={(e) => deleteOption(index)} className="deleteStyle">
                        <img src={Delete} alt="" />
                      </div>
                      <div key={index}>
                      <input name="option" value={form.option} onInput={InvalidMsg} onInvalidCapture={InvalidMsg} required onChange={(event) => handleFormChange(event, index)}  class="form-control optionInputStyle" placeholder="Add your option" />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div onClick={addOption} className='addOption'>
                <FontAwesomeIcon icon={faPlus} />
                <p style={{ marginLeft: "5px" }}>add Option</p>
              </div>

              <div className='createButtonContainer'>
                <button onClick={handleSubmit} type="submit" className='createButton'>Create</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
export default CreateSurveyWithLogin