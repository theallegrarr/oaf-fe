import React from "react"
import { useHistory } from "react-router";

import LoginForm from "./components/Login"

import apiCall from "../../api/request"

export default function Login(){
    const history = useHistory();
    const login = (username, password) => {
        apiCall("POST","api/auth/login", { username, password }, (res) => {
            let token = JSON.parse(res).user.token
            localStorage.setItem("oaf_token", token)
            history.push("/summary")
        })
    }
    return(<>
        <LoginForm 
            login={login}
        />
    </>)
}