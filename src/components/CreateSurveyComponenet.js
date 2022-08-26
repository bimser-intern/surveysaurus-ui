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


function CreateSurveyComponent() {

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
    //alert("handle submit")
    e.preventDefault()
    let storageData=[]
    formFields.map((item)=>{
        storageData.push(item.option)
    })
    //console.log(formFields)
    //console.log(storageData)
    setChoiceData(storageData)
    console.log(storageData)
    console.log(title)
    //console.log(choiceData)
    //console.log(title)
    //console.log(question)
    if(localStorage.getItem("token")){
            axios.post(
              'https://survey-api.orangeground-88d990d8.westeurope.azurecontainerapps.io/api/survey/createSurvey',
              {
                  "title":title,
                  "question":question,
                  "choice":storageData,
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
          
    }else{
        localStorage.setItem("userSurvey",JSON.stringify({
            "title":title,
            "question":question,
            "choice":storageData,
      
          }))
          alert("You are redirected to the login page")
          navigate("/login")
    }
  }
  return (
    <div>
      <div className='createSurveyContainer'>
        <div className='createSurvey'>
          <div className='questionInput'>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className='createButton'>Create</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
export default CreateSurveyComponent