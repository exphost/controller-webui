import React, { useState } from 'react';

function RegisterForm() {
    const [input, setInputs] = useState({
        login: "",
        mail: "",
        sn: "",
        gn: "",
        password: "",
        password2: ""
    });
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const fields = [["login","login"], ["mail","email"], ["sn","surname"], ["gn", "name"], ["password", "password"], ["password2", "password2"]];
        for(let i = 0; i < fields.length; i++) {
            if(input[fields[i][0]] == "") {
                alert("Field "+fields[i][1]+" cannot be empty");
                return 2;
            }

        }
        if(input['password'] != input['password2']) {
            alert("Passwords didn't match");
            return 1;
        }
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                login: input['login'],
                mail: input['mail'],
                sn: input['sn'],
                gn: input['gn'],
                password: input['password']
            })
        }
        fetch(window.API_URL+'/users/users/', requestOptions)
            .then(response => alert('Submitted successfully'))
            .catch(error => alert('Form submit error' + error))
    };
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    };
    return (
        <fragments>
        <h1>Register Form</h1>
        <form onSubmit={handleSubmit}>
          login: <input name="login" onChange={handleChange}/><br/>
          e-mail: <input type="email" name="mail" onChange={handleChange}/><br/>
          name: <input name="gn" onChange={handleChange}/><br/>
          surname: <input name="sn" onChange={handleChange}/><br/>
          password: <input type="password" name="password" onChange={handleChange}/><br/>
          password2: <input type="password" name="password2" onChange={handleChange}/><br/>
          <button type="submit">Submit</button>
        </form>
        </fragments>
    );
}

export default RegisterForm;
