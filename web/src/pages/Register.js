import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Register() {
  // State to store user input
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('Beginner');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Check if terms are agreed
      if (!termsAgreed) {
        throw new Error('Please agree to the terms and conditions');
      }
      const user_type = "User";
      // Make API call to register user using Axios
      const response = await axios.post('http://localhost:3001/api/v1/user/register', {
        email,
        password,
        user_type,
        experience,
        gender,
        name,
        age,
        height,
        weight
      });

      if (response.data.success === true) {
        console.log('Login successful:', response.data);
        if (response.data.user) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.user._id);
            localStorage.setItem('userType', response.data.user.user_type);
            localStorage.setItem('userName', response.data.user.name);
            if(response.data.user.user_type === "Admin"){
                navigate("/admin");
            }else{
            navigate("/user");
            }
        }
      }
    } catch (error) {
      // Handle error
      setError(error.message);
    }
  };

  return (
    <div className="container-xxl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          {/* Register Card */}
          <div className="card">
            <div className="card-body">
              <center>
                <h4 className="mb-2">Adventure starts here 🚀</h4>
                <p className="mb-4">Make your swimming management easy and fun!</p>
              </center>
              <form onSubmit={handleRegister} className="mb-3" action="#">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control" id="username" name="username" placeholder="Enter your username" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="experience" className="form-label">Experience Level</label>
                  <select className="form-select" id="experience" aria-label="Experience" value={experience} onChange={(e) => setExperience(e.target.value)}>
                    <option selected disabled>Open this select menu</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">Age</label>
                      <input type="number" className="form-control" id="age" name="age" placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label">Gender</label>
                      <select className="form-select" id="gender" aria-label="Gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option selected disabled>Open this select menu</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <div className="mb-3">
                      <label htmlFor="height" className="form-label">Height (CM)</label>
                      <input type="number" className="form-control" id="height" name="height" placeholder="Enter your height" value={height} onChange={(e) => setHeight(e.target.value)} />
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className="mb-3">
                      <label htmlFor="weight" className="form-label">Weight (Kg)</label>
                      <input type="number" className="form-control" id="weight" name="weight" placeholder="Enter your weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="text" className="form-control" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3 form-password-toggle">
                  <label className="form-label" htmlFor="password">Password</label>
                  <div className="input-group input-group-merge">
                    <input type="password" id="password" className="form-control" name="password" placeholder="············" aria-describedby="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span className="input-group-text cursor-pointer"><i className="bx bx-hide" /></span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="terms-conditions" name="terms" checked={termsAgreed} onChange={(e) => setTermsAgreed(e.target.checked)} />
                    <label className="form-check-label" htmlFor="terms-conditions">
                      I agree to <a href="javascript:void(0);">privacy policy & terms</a>
                    </label>
                  </div>
                </div>
                <button className="btn btn-primary d-grid w-100">Sign up</button>
              </form>
              {error && <p className="text-danger">{error}</p>}
              <p className="text-center">
                <span>Already have an account?</span>
                <a href="auth-login-basic.html">
                  <span>Sign in instead</span>
                </a>
              </p>
            </div>
          </div>
          {/* Register Card */}
        </div>
      </div>
    </div>
  );
}

export default Register;
