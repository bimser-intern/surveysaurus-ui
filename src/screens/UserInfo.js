import React, { useEffect } from "react";
import Menu from "../components/Menu";
import "../style/UserInfo.scss";
import TableImg from "../image/table.png";
import CasualLife from "../image/CasualLife.png";
import eyeIcon from "../image/eye.png";
import Logo from "../image/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function UserInfo() {
  const navigate = useNavigate();
  const [countryId, setCountryId] = useState(0);
  const [countryOption, setcountryOption] = useState(0);
  const [controlVisible, setControlVisible] = useState(true);
  const [controlVisibleConfirm, setControlVisibleConfirm] = useState(true);
  const [control, setControl] = useState(true);
  const [vectorControl, setvectorControl] = useState(false);
  const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPassword1, setConfirmPassword1] = useState("");
  const [gender, setgender] = useState("");
  // const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [islogin, setIsLogin] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [nameUpdate, setnameUpdate] = useState(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")).name
      : null
  );
  const [emailUpdate, setemailUpdate] = useState(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")).email
      : null
  );
  const [genderUpdate, setgenderUpdate] = useState(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")).gender
      : null
  );
  const [countryUpdate, setcountryUpdate] = useState(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")).country
      : null
  );
  const [cityUpdate, setcityUpdate] = useState(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")).city
      : null
  );
  const [pointUpdate, setpointUpdate] = useState(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")).point
      : null
  );
  const [controlCity, setcontrolCity] = useState(true);
  const [controlCountry, setcontrolCountry] = useState(true);
  useEffect(  ()  =>  {
    setTimeout(() => {
      setcontrolCity(false);
    
     axios
      .post(
        "/api/user/cities",
        {
          country: JSON.parse(localStorage.getItem('auth')).country,
        },

        {}
      )
      .then((result) => {
        console.log(result);
        const cityData = [];
        result.data.data.surveys.map((item) => {
          //console.log(item)
          cityData.push(item);
        });

        setCityList(cityData);
      });

    //alert(countryOption)

    //

    console.log(cityUpdate);
      
    }, 200);
       axios 
    .get(
      "/api/user/countries",

      {}
    )
    .then((result) => {
      console.log('jefnksjdmnlşawösdixşawçsd')
      const countryData = [];
      result.data.data.surveys.map((item) => {
        //console.log(item)
        countryData.push(item);
      });
      console.log('ülke:',countryData)
      setCountryList(countryData);
    });
   

    
  
  }, []);
 
  function InvalidMsg(e) {
    if (e.target.value == "") {
      e.target.setCustomValidity("Please fill in the marked fields");
    } else if (e.target.validity.typeMismatch) {
      e.target.setCustomValidity(
        "Please write a valid e-mail address in the marked field."
      );
    } else {
      e.target.setCustomValidity("");
    }
    return true;
  }
  function InvalidMsgPassword(e) {
    console.log(password);
    if (e.target.value == "") {
      e.target.setCustomValidity("Please fill in the marked fields");
    } else if (password === confirmPassword) {
      e.target.setCustomValidity("");
    }
    return true;
  }
  function InvalidMsgConfirmPassword(e) {
    console.log("password confrim passwrod");
    console.log(password);
    console.log(confirmPassword);
    if (e.target.value == "") {
      e.target.setCustomValidity("Please fill in the marked fields");
    } else if (password == confirmPassword) {
      e.target.setCustomValidity(
        "Your new password cannot be the same as your old password."
      );
    } else {
      e.target.setCustomValidity("");
    }
    return true;
  }
  function InvalidMsgConfirmPassword1(e) {
    console.log("password confrim passwrod")
    console.log(password)
    console.log(confirmPassword)
    if (confirmPassword1 != confirmPassword) {
      e.target.setCustomValidity('Passwords do not match.');
    }
    else {
      e.target.setCustomValidity('');
    }
    return true;
  }
  const handleSubmit = async (e) => {
    console.log(nameUpdate);
    console.log(emailUpdate);
    console.log(genderUpdate);
    console.log(cityUpdate);
    console.log(countryUpdate);
    console.log(pointUpdate)
    e.preventDefault();
    let alertMessage = "";
    if (document.getElementById("exampleInputPassword2").value.length >= 8) {
      if (localStorage.getItem("token")) {
        await axios
          .put(
            "/api/profile/updatepassword",

            {
              oldPassword: document.getElementById("exampleInputPassword1")
                .value,
              newPassword: document.getElementById("exampleInputPassword2")
                .value,
            },
            {
              headers: {
                authorization: localStorage.getItem("token"),
              },
            },
            console.log("geçti")
          )
          .then((result) => {
            if (result.status) {
              console.log(result.status);
              alertMessage = "Password updated successfully\n\r";
              navigate("/userInfo");
            }
          })
          .catch((result) => {
            alertMessage =
              "Password: " +
              JSON.stringify(result.response.data.message).replaceAll(
                '"',
                " "
              ) +
              "\n\r";
            setIsLogin(true);
          });
      }
    }
    if (
      JSON.parse(localStorage.getItem("auth")).name != nameUpdate ||
      JSON.parse(localStorage.getItem("auth")).email != emailUpdate ||
      JSON.parse(localStorage.getItem("auth")).gender != genderUpdate ||
      JSON.parse(localStorage.getItem("auth")).country != countryUpdate ||
      JSON.parse(localStorage.getItem("auth")).city != cityUpdate
    ) {
      if (localStorage.getItem("token")) {
        await axios
          .post(
            "/api/profile/update",
            {
              userName: nameUpdate,
              email: emailUpdate,
              city: cityUpdate,
              country: countryUpdate,
              gender: genderUpdate,
              point: pointUpdate
            },
            {
              headers: {
                authorization: localStorage.getItem("token"),
              },
            }
          )
          .then((result) => {
            if (result.data.accessToken) {
              localStorage.removeItem("token");
              localStorage.setItem("token", result.data.accessToken);
              localStorage.removeItem("auth");
              let object = {
                name: nameUpdate,
                gender: genderUpdate,
                email: emailUpdate,
                city: cityUpdate,
                country: countryUpdate,
                point: pointUpdate,
              };
              localStorage.setItem("auth", JSON.stringify(object));
            }
            if (result.status) {
              console.log(result.status);
              alertMessage += "Profile Informations updated successfully\n\r";

              navigate("/userInfo");
            }
          })
          .catch((result) => {
            //alert("name and email information can only be used once, please enter a name or email that has not been used before.")
            console.log(result);
            setIsLogin(true);
          });
      }
    }
    alert(alertMessage);
  };
  return (
    <div className="App">
      <Menu isLogin={true} test="false" to="/userInfo" />


      <div className="tableImg">
        <div className="aInfo">
          Account Info
        </div>
        <img src={TableImg} alt="" />
        
      </div>
      <div className="casualImg">
        <img src={CasualLife} alt="" />
      </div>
      <div className="UserInfo">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input
                onInput={(e) => e.target.setCustomValidity("")}
                onInvalidCapture={(e) =>
                  e.target.setCustomValidity("Please fill in the marked fields")
                }
                value={nameUpdate}
                onChange={(e) => setnameUpdate(e.target.value)}
                required
                type="name"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                onInput={InvalidMsg}
                onInvalidCapture={InvalidMsg}
                value={emailUpdate}
                onChange={(e) => setemailUpdate(e.target.value)}
                required
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your e-mail address"
              />
            </div>
            <div class="form-group">
              <label for="sel1">Choose Gender</label>
              <select
                onInput={(e) => e.target.setCustomValidity("")}
                onInvalidCapture={(e) =>
                  e.target.setCustomValidity("Please Choose Gender")
                }
                value={genderUpdate}
                onChange={(e) => setgenderUpdate(e.target.value)}
                required
                class="form-control"
                id="sel1"
                name="sellist"
              >
                <option></option>
                <option>Female</option>
                <option>Male</option>
                <option>I do not want to specify</option>
              </select>
            </div>
            <div class="form-group">
              <label for="sel1">Select Country</label>
              <select
                value={countryUpdate}
                onInput={(e) => e.target.setCustomValidity("")}
                onInvalidCapture={(e) =>
                  e.target.setCustomValidity("Please Choose Country")
                }
                onChange={(event) => {
                  setcountryUpdate(event.target.value);

                  setcontrolCity(false);
                  axios
                    .post(
                      "/api/user/cities",
                      {
                        country: event.target.value,
                      },

                      {}
                    )
                    .then((result) => {
                      console.log(result);
                      const cityData = [];
                      result.data.data.surveys.map((item) => {
                        //console.log(item)
                        cityData.push(item);
                      });

                      setCityList(cityData);
                    });

                  //alert(countryOption)
                }}
                required
                class="form-control"
                id="sel1"
              >
              
                  
                  
                  
              
                
                {countryList.map((country, index) => {
                  return <option value={country}>{country}</option>;
                })}
              </select>
            </div>
            <div class="form-group">
              <label for="sel1">Select City</label>
              <select
                onInput={(e) => e.target.setCustomValidity("")}
                onInvalidCapture={(e) =>
                  e.target.setCustomValidity("Please Choose city")
                }
                value={cityUpdate}
                onChange={(e) => setcityUpdate(e.target.value)}
                required
                class="form-control"
                id="sel1"
              >
                {controlCity ?
                  <option style={{ display: controlCity ? "block" : "none" }}>
                    {cityUpdate}
                  </option> :
                  <option>

                  </option>
                }

                {cityList.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Old Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                onInput={nameUpdate.length > 0 ? null : InvalidMsgPassword}
                onInvalidCapture={InvalidMsgPassword}
                value={password}
                type={controlVisible ? "password" : "text"}
                class="form-control"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                id="exampleInputPassword1"
                placeholder="Enter your password"
              />
              <div
                className="eyeIcon"
                style={{ left: "90%", position: "relative", top: "-25px" }}
                type="button"
                onClick={() => setControlVisible(!controlVisible)}
              >
                <img src={eyeIcon} alt="" />
              </div>
            </div>
            <div
              class="form-group"
              style={{ position: "relative", top: "-20px" }}
            >
              <label for="exampleInputPassword2">New Password</label>
              <input
                value={confirmPassword}
                onInput={
                  nameUpdate.length > 0 ? null : InvalidMsgConfirmPassword
                }
                onInvalidCapture={InvalidMsgConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={controlVisibleConfirm ? "password" : "text"}
                class="form-control"
                id="exampleInputPassword2"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                placeholder="Enter your new password"
              />
              <div
                className="eyeIcon"
                style={{ left: "90%", position: "relative", top: "-25px" }}
                type="button"
                onClick={() => setControlVisibleConfirm(!controlVisibleConfirm)}
              >
                <img src={eyeIcon} alt="" />
              </div>
            </div>
            <div
              class="form-group"
              style={{ position: "relative", top: "-40px" }}
            >
              <label for="exampleInputPassword2">Confirm Password</label>
              <input
                value={confirmPassword1}
                onInput={InvalidMsgConfirmPassword1}
                onInvalidCapture={InvalidMsgConfirmPassword1}
                onChange={(e) => setConfirmPassword1(e.target.value)}
                type={controlVisibleConfirm ? "password" : "text"}
                class="form-control"
                id="exampleInputPassword2"

                placeholder="Confirm your password"
              />
              <div
                className="eyeIcon"
                style={{ left: "90%", position: "relative", top: "-25px" }}
                type="button"
                onClick={() => setControlVisibleConfirm(!controlVisibleConfirm)}
              >
                <img src={eyeIcon} alt="" />
              </div>
            </div>
            <div style={{ position: "relative", top: "-25px" }} className="buttonLayout">
              <button type="submit" className="submitButton">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="footerUserInfo">
        <div className="footerBorder"></div>
        <div className="footerItem">
          <ul>
            <li>
              <a href="#create" className="linkStyle" to={"/"}>
                Home
              </a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="">Contact Us</a>
            </li>
            <li>
              <img className="logoImage" src={Logo} alt="" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
