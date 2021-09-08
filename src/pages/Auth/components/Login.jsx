import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function LoginForm({ login }){
    const [form, setForm] = useState({
        username: "",
        password: ""
    })
    const updateForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value 
        })
    }

    return(
        <Form>
            <Form.Group className="mb-3 form-row" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" placeholder="Enter username" onChange={e => updateForm(e)}/>
            </Form.Group>

            <Form.Group className="mb-3 form-row" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" onChange={e => updateForm(e)}/>
            </Form.Group>
            <Form.Group className="mb-3 form-row" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button
                variant="primary" 
                type="submit"
                onClick={(e) => {
                    e.preventDefault()
                    login(form.username, form.password)
                }}>
                Submit
            </Button>
        </Form>
    )
}