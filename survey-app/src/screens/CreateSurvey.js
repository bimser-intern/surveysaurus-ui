import React, { useState } from 'react'
import Menu from '../components/Menu'
import "../style/CreateSurvey.css"
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
const data ={ backgroundColor: "rgba(240, 184, 13, 0.38)", marginBottom: "50px", border: "1px solid rgba(240, 184, 13, 0.38)", borderRadius: "10px" };
const data1={ width: "20px", height: "20px", position: "absolute", marginLeft: "5px", marginTop: "3px" }
const data2={ width: "15px", height: "15px", position: "absolute", marginLeft: "580px", marginTop: "5px" };
const data3={ paddingLeft: "35px", backgroundColor: "rgba(240, 184, 13, 0.38)", marginBottom: "5px", border: "1px solid rgba(240, 184, 13, 0.38)", borderRadius: "10px" };
const data4={ display: "flex", flexDirection: "row", cursor: "pointer" };
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
                <input style={data} type="text" class="form-control" id="exampleInputEmail1" placeholder="Add your question" />
              </div>

              <div class="form-group">
                <label for="exampleInputEmail1">Options</label>
                {formFields.map((form, index) => {
                  return (
                    <div className='optionStyle'>
                      <div style={data1}>
                        <img src={Circle} alt="" />
                      </div>
                      <div onClick={(e) => deleteOption(index)} style={data2}>
                        <img src={Delete} alt="" />
                      </div>
                      <input name={form.option} onChange={(e) => handleFormChange(e, index)} style={data3} type="text" class="form-control" id="exampleInputEmail1" placeholder="Add your option" />
                    </div>
                  )
                })}
              </div>

              <div onClick={addOption} style={data4} className='addOption'>
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