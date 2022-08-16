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
  return (
    <div>
      <div className='Menu'>
        <ul className='navInfo'>
          <li><Link to={"/"} className='navItem'>Home</Link>
          </li>
          <li><a href="#about" className='navItem'>About</a></li>
        </ul>

        <ul>
          <li>
            <Link to={"/signup"} className='signUpButton'>
              <p className='buttonTextLayout'>Sign Up</p>
            </Link>
          </li>
          <li>
            <Link to={"/login"} className='loginButton'>
              <p className='buttonTextLayout'>Login</p>
            </Link>
          </li>
          <li>
            <div onClick={() => setControl(!control)} className='UserIcon'>
              <a href=""></a>
              <div style={{ display: control ? "none" : "block", top: "45px", zIndex: "100" }} className='openMenu'>
                <div onClick={() => navigate("/login")} className='menuItem' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                  <Link className='menuLink' to={"/login"}>User Info</Link>
                </div>
                <div onClick={() => navigate("/login")} className='menuItem'>
                  <Link className='menuLink' to={"/login"}>My Survey</Link>
                </div>
                <div onClick={() => navigate("/login")} className='backColor' style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                  <Link style={{ color: "#FFFFFF", marginLeft: "5px" }} className='menuLink' to={"/login"}>Log Out</Link>
                </div>
              </div>
            </div>
          </li>

        </ul>
        <div className="borderMenuBottomCreateSurvey"></div>
      </div>
      <div className='createSurveyContainer'>
        <div className='createSurvey'>
          <div className='questionInput'>
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Question</label>
                <input style={{ backgroundColor: "rgba(240, 184, 13, 0.38)", marginBottom: "50px", border: "1px solid rgba(240, 184, 13, 0.38)", borderRadius: "10px" }} type="text" class="form-control" id="exampleInputEmail1" placeholder="Add your question" />
              </div>

              <div class="form-group">
                <label for="exampleInputEmail1">Options</label>
                {formFields.map((form, index) => {
                  return (
                    <div className='optionStyle'>
                      <div style={{ width: "20px", height: "20px", position: "absolute", marginLeft: "5px", marginTop: "3px" }}>
                        <img src={Circle} alt="" />
                      </div>
                      <div onClick={(e) => deleteOption(index)} style={{ width: "15px", height: "15px", position: "absolute", marginLeft: "580px", marginTop: "5px" }}>
                        <img src={Delete} alt="" />
                      </div>
                      <input name={form.option} onChange={(e) => handleFormChange(e, index)} style={{ paddingLeft: "35px", backgroundColor: "rgba(240, 184, 13, 0.38)", marginBottom: "5px", border: "1px solid rgba(240, 184, 13, 0.38)", borderRadius: "10px" }} type="text" class="form-control" id="exampleInputEmail1" placeholder="Add your option" />
                    </div>
                  )
                })}
              </div>

              <div onClick={addOption} style={{ display: "flex", flexDirection: "row", cursor: "pointer" }} className='addOption'>
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