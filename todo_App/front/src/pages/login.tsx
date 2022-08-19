import React, {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import updateUI from '../redux/uiActions'
import { ToastContainer, toast } from 'react-toastify';

const Login: React.FC = () => {
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginFormData = new FormData();
        loginFormData.append("email", formValue.email)
        loginFormData.append("password", formValue.password);

        try {
            // make axios post request
            const response = await axios({
                method: "post",
                url: "http://localhost:8080/todo/login",
                data: loginFormData,
                headers: {"Content-Type": "multipart/form-data"},
            }).then((response) => {
                if (response.data.status) {
                    localStorage.setItem('token', response.data.token);
                    window.location.href = '/';
                } else {
                    toast.error(response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                }

            }).catch((error) => {
                console.log(error);
            });


        } catch (error) {
            console.log(error)
        }
    }

    const [formValue, setformValue] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }


    return (
        <>
           <div className="loginPage">
              <div className="login">
                  <form onSubmit={handleSubmit}>
                      <p>Login Form</p>
                      <input
                          type="email"
                          name="email"
                          placeholder="enter an email"
                          value={formValue.email}
                          onChange={handleChange}
                          required
                      />
                      <input
                          type="password"
                          name="password"
                          placeholder="enter a password"
                          value={formValue.password}
                          onChange={handleChange}
                          required
                      />
                      <button className='btn btn-dark'
                          type="submit"
                      >
                          Login
                      </button>
                  </form>
              </div>
               <ToastContainer />
           </div>
        </>
    );
}

export default Login;