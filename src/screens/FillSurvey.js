import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import "../style/FillSurvey.scss"
import EmtyCircle from "../image/emptyCircle.png"
import axios from 'axios'
import Menu from '../components/Menu'
import CircleCheck from "../image/circleCheck.svg"
import World from "../image/world.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import Face from "../image/face.png"
import Gif from "../image/gif.png"
import Header from "../image/header.png"
import Italic from "../image/italic.png"
import Link from "../image/link.png"
import NumberedList from "../image/numberedList.png"
import bold from "../image/bold.png"
import bulletList from "../image/bulletList.png"
import Arrow from "../image/arrow.png"
import Reply from "../image/reply.png"
import Report from "../image/report.png"

function FillSurvey() {
  const location = useLocation()
  const navigate = useNavigate()
  const [control, setControl] = useState(false)
  const [selected, setSelected] = useState(null)
  const [surveyPercentData, setSurveyPercentData] = useState([])
  const [topNumber, setTopNumber] = useState(0)
  const [commentText, setCommentText] = useState("")
  const [addButtonControl, setAddButtonControl] = useState(false)
  const [surveyCommentData, setSurveyCommentData] = useState([])
  const [reportItem, setReportItem] = useState({})
  const [commentID, setCommentID] = useState(0)
  const [controlReport, setControlReport] = useState(false)
  const [controlReportChild, setControlReportChild] = useState(false)
  useEffect(() => {
    window.scrollTo(0,0)
    axios.post('https://survey-api.orangeground-88d990d8.westeurope.azurecontainerapps.io/api/survey/getSurvey', {
      "title": location.state.surveyInfo.title,
    })
      .then((result) => {
        let percentData = []
        result.data.data.percent.map((item) => {
          percentData.push(item)
        })
        setSurveyPercentData(percentData)
      })

    setTimeout(() => {
      axios.post(
        'https://survey-api.orangeground-88d990d8.westeurope.azurecontainerapps.io/api/comment/comments',
        {
          "title": location.state.surveyInfo.title,
        },
      )
        .then((result) => {
          console.log("comments")
          console.log(result)
          let commentData = []
          result.data.data.comments.map((item) => {
            commentData.push(item)
          })
          setSurveyCommentData(commentData)
          return
        })
    }, 300);

  }, [])
  const handleDone = () => {
    console.log("dsadsa")
    if (!localStorage.getItem("token")) {
      alert("Please login to fill out the survey.")
      navigate("/login")
    }
    axios.post(
      'https://survey-api.orangeground-88d990d8.westeurope.azurecontainerapps.io/api/survey/fillSurvey',
      {
        "title": location.state.surveyInfo.title,
        "answer": selected,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    ).then((result) => {
      console.log(result)
      setControl(true)
    }).catch((result) => {
      console.log(result)
    })
  }
  const handleAddComment = () => {
    if (commentText === '') {
      alert("please add a comment")
    } else if (!localStorage.getItem("token")) {
      alert("You must be logged in to add a comment")
      navigate("/login");
    }
    else if (commentID === 0) {
      axios.post(
        'https://survey-api.orangeground-88d990d8.westeurope.azurecontainerapps.io/api/comment/addcomment',
        {
          "title": location.state.surveyInfo.title,
          "comment": commentText,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      setTimeout(() => {
        axios.post(
          'https://survey-api.orangeground-88d990d8.westeurope.azurecontainerapps.io/api/comment/comments',
          {
            "title": location.state.surveyInfo.title,
          },
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        )
          .then((result) => {
            setSurveyCommentData([])
            console.log("comments")
            console.log(result)
            let commentData = []
            result.data.data.comments.map((item) => {
              commentData.push(item)
            })
            setSurveyCommentData(commentData)
            return
          })
      }, 300);
      setAddButtonControl(false)
    }
    else if (commentID !== 0) {
      axios.post(
        'https://survey-api.orangeground-88d990d8.westeurope.azurecontainerapps.io/api/comment/addcomment',
        {
          "title": location.state.surveyInfo.title,
          "comment": commentText,
          "parentID": commentID
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
        .then((result) => {
          console.log("*****************")
          console.log(result)
          setCommentID(0)
        })

      setTimeout(() => {
        axios.post(
          'https://survey-api.orangeground-88d990d8.westeurope.azurecontainerapps.io/api/comment/comments',
          {
            "title": location.state.surveyInfo.title,
          },
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        )
          .then((result) => {
            setSurveyCommentData([])
            console.log("comments")
            console.log(result)
            let commentData = []
            result.data.data.comments.map((item) => {
              commentData.push(item)
            })
            setSurveyCommentData(commentData)
            return
          })
      }, 300);
      setAddButtonControl(false)
    }

  }
  const addButtonHandleClick = () => {
    setAddButtonControl(true)

  }
  const addCommentWithId = (item) => {
    setCommentID(item.commentID)
    setAddButtonControl(true)
  }
  const handleReport = (item) => {
    setReportItem({})
    setReportItem(item)
    setControlReport(!controlReport)
  }
  const handleYesButton = (item) => {
    console.log(item)
    if (localStorage.getItem("token")) {
      axios.post(
        'https://survey-api.orangeground-88d990d8.westeurope.azurecontainerapps.io/api/comment/report',
        {
          "commentID": item.commentID,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
        .then((result) => {
          console.log(result)
          alert("Report Succesfully")
        })
    }
    else{
      alert("You must be logged in to add a report")
      navigate("/login")
    }
  }
  return (
    <div className='containerFill'>
      <Menu isLogin={localStorage.getItem("auth") ? true : false} />
      {!addButtonControl &&
        <div className='Container'>
          <div className='fillSurvey'>
            <div className='questionPart'>
              <label style={{ marginLeft: "5px" }} htmlFor="">Question</label>
              <div className='optionsStyle'>
                <p className="optionText">{location.state.surveyInfo.question}</p>
              </div>
            </div>
            <div className='optionsPart'>
              {!control &&
                <div>
                  <label style={{ marginLeft: "5px" }} htmlFor="">Options</label>
                  {location.state.surveyInfo.choices && location.state.surveyInfo.choices.map((item, index) => {
                    return (
                      <div onClick={() => setSelected(index)} className='optionsStyle'>
                        <img key={index} style={{ marginLeft: "5px", marginBottom: "3px" }} width="15px" height="15px" src={selected === index ? CircleCheck : EmtyCircle} alt="" />
                        <p className='optionText'>{item}</p>
                      </div>
                    )
                  })}
                </div>
              }
              {control &&
                <div>
                  <label style={{ marginLeft: "5px" }} htmlFor="">Rates</label>
                  {surveyPercentData && surveyPercentData.length > 0 &&
                    surveyPercentData.map((item) => {
                      if (item > topNumber) {
                        setTopNumber(item)
                      }//item !== 0 ? {width:item*5}:{width:"50px"},item === topNumber ? {backgroundColor:"#E49192"}:null
                      return (
                        <div className='ratesStyle' style={{ width: item !== 0 ? item * 5 : "50px", backgroundColor: item === topNumber ? "#E49192" : null }}>
                          <h3 style={{ marginRight: "5px" }}>{item} %</h3>
                        </div>
                      )
                    })
                  }
                </div>
              }
            </div>
            <div style={control ? { justifyContent: "center" } : null} className='fillSurveyFooter'>
              <button className='mapButton'>
                <img width="60px" height="80px" src={World} alt="" />
                <p className='worldText'>See what the world said</p>
              </button>
              <button style={control ? { display: "none" } : null} onClick={handleDone} className='doneButton'>Done</button>
            </div>

            <div>
            </div>
          </div>
          <div className='Comments'>
            <div className=''>
              <h1 className='commentsTextStyle'>Comments</h1>
              <div onClick={addButtonHandleClick} className='addButton'>
                <p style={{marginTop:"5px"}} className='addCommentTextStyle'>Add Comment</p>
              </div>

              {surveyCommentData.map((item, index) => {
                //console.log(item)
                
                const test = (item.author.split(" "))
                return (
                  <ul style={{ display: "flex", flexDirection: "column" }}>
                    {item.path && item.path.length <= 1 &&
                      <div className='commentList'>
                        <div className='userIcon'>
                          {test.map((letter) => {
                            return (
                              <p style={{ fontSize: "15px", color: "white" }}>{letter[0]}</p>
                            )
                          })}
                        </div>
                        <div className='commentInfoContainer'>
                          <div className='surveyInfo'>
                            <p style={{ marginRight: "10px", fontSize: "15px", fontWeight: "bold" }}>{item.author}</p>
                            <p>8 hours ago</p>
                          </div>
                          <p style={{ fontSize: "15px", fontWeight: "bold" }}>{item.comment}</p>

                          <div className='commentIconContainer'>
                            <ul className='commentIconList'>
                              <li className='commentListItem'>
                                <img src={Arrow}>
                                </img>
                                <p style={{ marginLeft: "5px" }}>Arrow</p>
                              </li>
                              <li onClick={() => addCommentWithId(item)} className='commentListItem'>
                                <img src={Reply}>

                                </img>
                                <p style={{ marginLeft: "5px" }}>Reply</p>
                              </li>
                              <li onClick={()=>handleReport(item)} className='commentListItem'>
                                <img src={Report}>

                                </img>
                                <p style={{ marginLeft: "5px" }}>Report</p>
                                <div style={{ display: controlReport ? "flex" : "none" }} className='reportContainer'>
                                  <div>
                                    <p style={{ fontWeight: "bold", fontSize: "15px" }}>Are you sure?</p>
                                  </div>
                                  <div className='reportButtons'>
                                    <div onClick={() => handleYesButton(reportItem)} className='reportYes'>
                                      <p style={{ fontWeight: "bold" }}>Yes</p>
                                    </div>
                                    <div className='reportNo'>
                                      <p style={{ fontWeight: "bold" }}>No</p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    }
                    <ul style={{ width: "80%", display: "flex", flexDirection: "column" }}>
                      {surveyCommentData.map((test) => {
                        const testAuthor = (test.author.split(" "))
                        if (test.path.length > 1) {
                          if (test.path[0] === item.commentID) {
                            return (

                              <div className='commentList'>
                                <div className='userIcon'>
                                  {testAuthor.map((letter) => {
                                    return (
                                      <p style={{ fontSize: "15px", color: "white" }}>{letter[0]}</p>
                                    )
                                  })}
                                </div>
                                <div className='commentInfoContainer'>
                                  <div className='surveyInfo'>
                                    <p style={{ marginRight: "10px", fontSize: "15px", fontWeight: "bold" }}>{test.author}</p>
                                    <p>8 hours ago</p>
                                  </div>
                                  <p style={{ fontSize: "15px", fontWeight: "bold" }}>{test.comment}</p>

                                  <div className='commentIconContainer'>
                                    <ul className='commentIconList'>
                                      <li className='commentListItem'>
                                        <img src={Arrow}>
                                        </img>
                                        <p style={{ marginLeft: "5px" }}>Arrow</p>
                                      </li>
                                      <li onClick={() => addCommentWithId(test)} className='commentListItem'>
                                        <img src={Reply}>

                                        </img>
                                        <p style={{ marginLeft: "5px" }}>Reply</p>
                                      </li>
                                      <li onClick={() => {
                                        setReportItem({})
                                        setReportItem(test)
                                        setControlReportChild(!controlReportChild)
                                      }} className='commentListItem'>
                                        <img src={Report}>

                                        </img>
                                        <p style={{ marginLeft: "5px" }}>Report</p>
                                        <div style={{ display: controlReportChild ? "flex" : "none" }} className='reportContainer'>
                                          <div>
                                            <p>Are you sure?</p>
                                          </div>
                                          <div className='reportButtons'>
                                            <div onClick={()=> handleYesButton(reportItem)} className='reportYes'>
                                              <p>Yes</p>
                                            </div>
                                            <div className='reportNo'>
                                              <p>No</p>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>


                            )
                          }
                        }

                      })}
                    </ul>
                  </ul>
                )
              })}

            </div>
          </div>
        </div>
        /*
        <ul className='commentList'>
                <div className='userIcon'></div>
                <li>
                  <div className='surveyInfo'>
                    <p style={{marginRight:"10px"}}>username</p>
                    <p>8 hours ago</p>
                  </div>
                  {surveyCommentData.map((item) => {
                    return (
                      <p>{item}</p>
                    )
                  })}
                </li>
              </ul>
        */
      }

      {addButtonControl &&
        <div className='addButtonContainer'>
          <div className='addButtonContent'>
            <div class="form-group">
              <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder='What are your thoughts' class="form-control textStyle" id="exampleFormControlTextarea1" rows="18"></textarea>
              <div className='commentFooter'>
                <ul className='changeTextStyle'>
                  <li>
                    <img src={Face} alt="" />
                  </li>
                  <li>
                    <img src={Gif} alt="" />
                  </li>
                  <li>
                    <img src={bold} alt="" />
                  </li>
                  <li>
                    <img src={Italic} alt="" />
                  </li>
                  <li>
                    <img src={Link} alt="" />
                  </li>
                  <li>
                    <img src={Header} alt="" />
                  </li>
                  <li>
                    <img src={bulletList} alt="" />
                  </li>
                  <li>
                    <img src={NumberedList} alt="" />
                  </li>
                </ul>
                <div onClick={handleAddComment} className='commentButton'>
                  <p className='addCommentTextStyle'>Comment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
export default FillSurvey
