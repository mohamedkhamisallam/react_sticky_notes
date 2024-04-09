import React, { useState } from 'react'
import axios from "axios"
import { json, useNavigate } from 'react-router-dom'

function Login() {
    const [user, setUser] = useState({ email: "", password: "", })
    let navigate = useNavigate();
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    function getUser({ target }) {
        setUser({ ...user, [target.name]: target.value })
    }

    async function sendData(e) {
        e.preventDefault()
        setIsLoading(true)
        let { data } = await axios.post("http://localhost:3000/user",user)
        console.log(data)

        if (data.message === "success") {
            localStorage.setItem("token", JSON.stringify(data.findUser) )
            navigate("/home")

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
                            <input onChange={getUser} placeholder="Enter email" type="email" name="email" className="form-control" />
                        </div>
                        <div className="form-group my-2">
                            <input onChange={getUser} placeholder="Enter you password" type="password" name="password" className=" form-control" />
                        </div>
                        <button type="submit" className="btn btn-info w-100">{isLoading? <i className="fa-solid fa-spinner fa-spin"></i>: "SignIn"}</button>

                        {error && <div className="alert alert-danger mt-2">
                            {error}
                        </div>}
                    </form>
                </div>
            </div>
        </>
    )
}
export default Login
