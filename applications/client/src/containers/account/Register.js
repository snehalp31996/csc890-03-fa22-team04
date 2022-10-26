// import { useState } from "react";
// import React from "react";
// import Image from "react-bootstrap/Image";
// import accountImg from '../../assets/Account/account.svg'
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import "./account.css";

// const Register = () => {
//   const[data, setData] = useState({
//     firstName:"",
//     lastName:"",
//     email:"",
//     password:""
//   });

//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const handleChange = ({currentTarget: input}) =>{
//     setData({...data,[input.name]:input.value});
//   };

//   const handleSubmit = async(e) =>{
//     e.preventDefault();
//     try{
//       const url = "http://localhost:8080/api/users";
//       const {data:res} = await axios.post(url,data);
//       navigate("/login")
//       console.log(res.message);
//     }catch(error){
//       if(error.response && 
//         error.response.status >= 400 && 
//         error.response.status <= 500){
//           setError(error.response.data.message)
//         }
//     }
//   }
//     return (
//       <div className="base-container" ref={this.props.containerRef}>
//         <span className="box square border border-dark">
        
//           <div className="header">Register</div>
//           <div className="content">
//             <div className="image">
//               <Image src={accountImg} alt="Register" height="100%" width="100%" />
//             </div>

//             <div className="form-class">
//               <form className="form-group" onSubmit={handleSubmit}>
//               <input 
//                 type="text" 
//                 name="firstName" 
//                 placeholder="First Name" 
//                 onChange={handleChange}
//                 value={data.firstName}
//                 required
//                 className="input"
//                 />
//                 <input 
//                 type="text" 
//                 name="lastName" 
//                 placeholder="Last Name" 
//                 onChange={handleChange}
//                 value={data.lastName}
//                 required
//                 className="input"
//                 />
//                 <input 
//                 type="email" 
//                 name="email" 
//                 placeholder="Email" 
//                 onChange={handleChange}
//                 value={data.email}
//                 required
//                 className="input"
//                 />
//                 <input 
//                 type="password" 
//                 name="password" 
//                 placeholder="Password" 
//                 onChange={handleChange}
//                 value={data.password}
//                 required
//                 className="input"
//                 />
//                 {error && <div className="error_message">{error}</div>}
//                 <button type="submit" className="btn highlighted-btn">
//                   Register
//                 </button>
//               </form>
//               {/* <div className="form-group">
//                 <label htmlFor="name">Name: </label>
//                 <input type="text" name="name" placeholder="Enter name" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Email: </label>
//                 <input type="text" name="email" placeholder="Enter email" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password: </label>
//                 <input type="text" name="password" placeholder="Enter password" />
//               </div> */}
//             </div>

//           </div> 
//           <div className="footer">

//             <Link to="/login">
//                 <button type="button" className="btn highlighted-btn">
//                   Register
//                 </button>
//             </Link>

//             <p id="signUp"> Already registered? <Link to="/Login"> Sign in </Link></p>

//           </div>
//         </span>
//       </div>
//     );
//   }


// export default Register;

import { useState } from "react";
import React from "react";
import Image from "react-bootstrap/Image";
import accountImg from '../../assets/Account/account.svg'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./account.css";


  const Register = () => {
    const[data, setData] = useState({
      firstName:"",
      lastName:"",
      email:"",
      password:""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleChange = ({currentTarget: input}) =>{
      setData({...data,[input.name]:input.value});
    };

    const handleSubmit = async(e) =>{
      e.preventDefault();
      try{
        const url = "http://localhost:8080/api/users";
        const {data:res} = await axios.post(url,data);
        navigate("/login")
        console.log(res.message);
      }catch(error){
        if(error.response && 
          error.response.status >= 400 && 
          error.response.status <= 500){
            setError(error.response.data.message)
          }
      }
    }
    return (
      <div className="base-container">
        <span className="box square border border-dark">
        
          <div className="header">Register</div>
          <div className="content">
            <div className="image">
              <Image src={accountImg} alt="Register" height="100%" width="100%" />
            </div>

            <div className="form-class">              
              <form className="form-group" onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  name="firstName" 
                  placeholder="First Name" 
                  onChange={handleChange}
                  value={data.firstName}
                  required
                  className="input"
                  />
                  <input 
                  type="text" 
                  name="lastName" 
                  placeholder="Last Name" 
                  onChange={handleChange}
                  value={data.lastName}
                  required
                  className="input"
                  />
                  <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  onChange={handleChange}
                  value={data.email}
                  required
                  className="input"
                  />
                  <input 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  onChange={handleChange}
                  value={data.password}
                  required
                  className="input"
                  />
                  {/* <Form.Select aria-label="Default select example">
        <option>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select> */}
                  {error && <div className="error_message">{error}</div>}
                  <button type="submit" className="btn highlighted-btn">
                    Register
                  </button>
                </form>
            </div>

          </div> 
          <div className="footer">
            <p id="signUp"> Already registered? <Link to="/Login"> Sign in </Link></p>

          </div>
        </span>
      </div>
    );
  }


export default Register;