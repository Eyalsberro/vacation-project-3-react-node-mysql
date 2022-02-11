import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions'; 
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';



export default function Login() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [update, setUpdate] = useState(false);
    const [role, setRole] = useState(false)

    const handleClcik = async () => {
        const res = await fetch('http://localhost:1000/users/login', {
            method: "post",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ username, password, role }),
            credentials: "include"
        })
        const data = await res.json()

        if (data.err) {
            alert(data.err)
        } else {
            localStorage.username = data.username
            localStorage.role = data.role
            localStorage.id = data.user[0].id
            navigate('/')
            // setUpdate(up=> !up)
        }
        console.log(data);

    }




    return (
        <div>
            <div className='login'>

                <Card sx={{ height: 320, width: 365}}>
                    <CardContent sx={{ margin:1}}>

                        <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <br />
                        <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <FormGroup row={true}>
                            <FormControlLabel control={<Switch />} onChange={() => setRole("admin")} label="Admin" />
                            <FormControlLabel control={<Switch />} onChange={() => setRole("user")} label="User" />
                        </FormGroup>

                    </CardContent>
                    <CardActions>
                        <Button onClick={handleClcik} size="small">Login</Button>
                    </CardActions>
                    <span>Dont have an account yet? <Link to="/register">Register Now</Link></span>
                </Card>

            </div>
        </div>
    )
}