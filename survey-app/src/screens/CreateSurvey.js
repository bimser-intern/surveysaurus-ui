import React, { useState } from 'react'
import Menu from '../components/Menu'
import "../style/CreateSurvey.scss"
import Circle from "../image/circle.png"
import Delete from "../image/delete.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
function CreateSurvey() {

  const [formFields, setFormFields] = useState([
    { option: "" },
    { option: "" },
  ])
  const [control, setControl] = useState(true);
  const navigate = useNavigate();

  const handleFormChange = () => {

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
  return (
    <div>
      <Menu/>
      <div className="borderMenuBottom"></div>
      <div className='createSurveyContainer'>
        <div className='createSurvey'>
          <div className='questionInput'>
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Question</label>
                <input  type="text" class="form-control questionInputStyle" id="exampleInputEmail1" placeholder="Add your question" />
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
                      <input name={form.option} onChange={(e) => handleFormChange(e, index)}  type="text" class="form-control optionInputStyle" id="exampleInputEmail1" placeholder="Add your option" />
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
export default CreateSurvey