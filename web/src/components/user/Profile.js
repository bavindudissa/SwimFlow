import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Profile() {
    // State to store user input
    const [userDetails, setUserDetails] = useState([]);
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
    const [sucess, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        getData()
    },[])

    const getData = async () =>{
        try{
            const userId = localStorage.getItem('userId');
            const data = await axios.get("http://localhost:3001/api/v1/user/"+userId)
            console.log(data.data.data);
            setUserDetails(data.data)
            setName(data.data.data.name)
            setExperience(data.data.data.experience)
            setAge(data.data.data.age)
            setGender(data.data.data.gender)
            setHeight(data.data.data.height)
            setWeight(data.data.data.weight)
            setEmail(data.data.data.email)
        }
        catch(e){
            console.log(e)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            await axios.put(`http://localhost:3001/api/v1/user/${userId}`, {
                name,
                experience,
                age,
                gender,
                height,
                weight,
                email,
            });
            setSuccess("Details update!");
        } catch (error) {
            setError(error.response.data.message);
            console.error('Error updating user data:', error);
        }
    };



  return (
        <div>
            <div className="content-wrapper">
            {/* Content */}
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="py-3 mb-4"><span className="text-muted fw-light">My Profile /</span> Account</h4>
                <div className="row">
                <div className="col-md-12">
                    <ul className="nav nav-pills flex-column flex-md-row mb-3">
                        <li className="nav-item">
                            <a className="nav-link active" href="/user/profile"><i className="bx bx-user me-1" /> Account</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/user/resetpassword"><i className="bx bx-user me-1" /> Reset Password</a>
                        </li>

                    </ul>
                    <div className='row'>
                        <div className='col-8'>
                            <div className="card mb-4">
                                <h5 className="card-header">Profile Details</h5>
                                {/* Account */}
                                {/* <div className="card-body">
                                    <div className="d-flex align-items-start align-items-sm-center gap-4">
                                    <img src="../assets/img/avatars/1.png" alt="user-avatar" className="d-block rounded" height={100} width={100} id="uploadedAvatar" />
                                    <div className="button-wrapper">
                                        <label htmlFor="upload" className="btn btn-primary me-2 mb-4" tabIndex={0}>
                                        <span className="d-none d-sm-block">Upload new photo</span>
                                        <i className="bx bx-upload d-block d-sm-none" />
                                        <input type="file" id="upload" className="account-file-input" hidden accept="image/png, image/jpeg" />
                                        </label>
                                        <button type="button" className="btn btn-outline-secondary account-image-reset mb-4">
                                        <i className="bx bx-reset d-block d-sm-none" />
                                        <span className="d-none d-sm-block">Reset</span>
                                        </button>
                                        <p className="text-muted mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
                                    </div>
                                    </div>
                                </div> */}
                                <hr className="my-0" />
                        
                                <div className="card-body">
                                    <form id="formAccountSettings" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="username" className="form-label">Username</label>
                                            <input type="text" className="form-control" id="username" name="username" placeholder="Enter your username" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="experience" className="form-label">Experience Level</label>
                                            <select className="form-select" id="experience" aria-label="Experience" value={experience} onChange={(e) => setExperience(e.target.value)}>
                                                <option selected disabled>Open this select menu</option>
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                                <option value="Expert">Expert</option>
                                            </select>
                                        </div>
                                        <div className="mb-3 col-md-3">
                                            <label htmlFor="age" className="form-label">Age</label>
                                            <input type="number" className="form-control" id="age" name="age" placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)} />
                                        </div>
                                        <div className="mb-3 col-md-3">
                                            <label htmlFor="gender" className="form-label">Gender</label>
                                            <select className="form-select" id="gender" aria-label="Gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                                <option selected disabled>Open this select menu</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                        <div className="mb-3 col-md-3">
                                            <label htmlFor="height" className="form-label">Height (CM)</label>
                                            <input type="number" className="form-control" id="height" name="height" placeholder="Enter your height" value={height} onChange={(e) => setHeight(e.target.value)} />
                                        </div>
                                        <div className="mb-3 col-md-3">
                                            <label htmlFor="weight" className="form-label">Weight (Kg)</label>
                                            <input type="number" className="form-control" id="weight" name="weight" placeholder="Enter your weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="text" className="form-control" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        {error && <p className="text-danger">{error}</p>}
                                        {sucess && <p className="text-success">{sucess}</p>}
                                        <button type="submit" className="btn btn-primary me-2">Save changes</button>
                                        <button type="reset" className="btn btn-outline-secondary">Reset</button>
                                    </div>
                                    </form>
                                </div>
                                {/* /Account */}
                            </div>
                        </div>
                        <div className='col-4'>
                        <div className="card">
                    <h5 className="card-header">Delete Account</h5>
                    <div className="card-body">
                        <div className="mb-3 col-12 mb-0">
                        <div className="alert alert-warning">
                            <h6 className="alert-heading mb-1">Are you sure you want to delete your account?</h6>
                            <p className="mb-0">Once you delete your account, there is no going back. Please be certain.</p>
                        </div>
                        </div>
                        <form id="formAccountDeactivation" onsubmit="return false">
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" name="accountActivation" id="accountActivation" />
                            <label className="form-check-label" htmlFor="accountActivation">I confirm my account deactivation</label>
                        </div>
                        <button type="submit" className="btn btn-danger deactivate-account">Deactivate Account</button>
                        </form>
                    </div>
                    </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            {/* / Content */}
            {/* Footer */}
            <footer className="content-footer footer bg-footer-theme">
                <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                <div className="mb-2 mb-md-0">
                    ©
                    2024
                </div>
                </div>
            </footer>
            {/* / Footer */}
            <div className="content-backdrop fade" />
            </div>
        </div>

  )
}

export default Profile
