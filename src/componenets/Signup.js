import { useState } from 'react';
import  {useNavigate}  from 'react-router-dom';

const Signup = (props) => {
  const [credentails, setcredentails] = useState({ name: "", Email: "", password: "", cpassword: "" })

  const host = "http://127.0.0.1:5000"

  let navigate = useNavigate();
  const handleclick = async (e) => {
    e.preventDefault();
    console.log("singup")


    const { name, email, password } = credentails

    const response = await fetch(`${host}/api/auth/createuser`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },

      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json
    
    if (json.success) 
    {
      //save the authtoken and redirect
      localStorage.setItem('token', JSON.stringify(json.authtoken))
      navigate("/");
      props.showAlert("successfully created  Account" , "success")
    }
    else {
      props.showAlert("invalid details" , "danger")
    }
  }
  const onChange = (e) => {
    setcredentails({ ...credentails, [e.target.name]: e.target.value })
  }
  return (
    <div className="container">
      <h2>Sign up to continur to iNote-Book</h2>
      <form onSubmit={handleclick}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="text" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" minLength={5}  onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5}  onChange={onChange} required/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup