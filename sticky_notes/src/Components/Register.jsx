import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Register() {

    const [user, setUser] = useState({ first_name: "", last_name: "", email: "", password: "", })
    let navigate = useNavigate();
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    function getUser(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
        // user={...user}
        // user[e.target.name]= e.target.value
        // setuser(user)
    }

    async function sendData(e) {
        e.preventDefault()
        setIsLoading(true)
        let { data } = await axios.post("http://localhost:3000/register", user)
        console.log(data)

        if (data.message === "success") {
            navigate("/login")
        } else {
            setError(data.message)
        }
        setIsLoading(false)
    }

    return (
        <>
            <div className="container my-5 py-5">
                <div className="col-md-5 m-auto text-center">
                    <form onSubmit={sendData}>
                        <div className="form-group">
                            <input onChange={getUser} placeholder="Enter your name" name="first_name" type="text" className=" form-control" />
                        </div>
                        <div className="form-group my-2 ">
                            <input onChange={getUser} placeholder="Enter your name" name="last_name" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input onChange={getUser} placeholder="Enter email" type="email" name="email" className="form-control" />
                        </div>
                        <div className="form-group my-2">
                            <input onChange={getUser} placeholder="Enter you password" type="password" name="password" className=" form-control" />
                        </div>
                        <button type="submit" className="btn btn-info w-100">{isLoading? <i class="fa-solid fa-spinner fa-spin"></i>: "SignUp"}</button>

                        {error && <div className="alert alert-danger mt-2">
                            {error}
                        </div>}
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
