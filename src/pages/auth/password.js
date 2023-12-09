import React from 'react'
import { useState } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import './loginpage.css';
import { Route } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '35ch',
        },

    },
    card: {
        maxWidth: 345,
        margin: 'auto',
        marginTop: "80px"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    menuItem: {
        fontSize: '15px',
        cursor: 'pointer',
        marginleft: '18px',
        alignItems: 'center',
        display: 'flex',
        color: '#3553b4',
        '&:hover': {
            color: '#000000',
        }
    },

}));


const Password = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setOpen(true)
    }

    return (
        <div>
            <Card className={classes.card}>
                <div>
                    <div>
                        <div className="logo">
                            <img
                                src="https://www.codeunity.in/images/logo/logo.png"
                                loading="lazy"
                                alt="CodeUnity logo"
                                id="ember499"
                                style={{
                                    marginLeft: '31%',
                                    marginRight: '31%',
                                    marginTop: '10%',
                                    marginBottom: '10px',
                                    height: '0%',
                                    width: '40%',
                                }}
                            ></img>
                        </div>
                        <h2 style={{ marginLeft: '15%', marginTop: '10px', fontSize: '16px', marginBottom: '-5px' }}>Please enter your email id for otp</h2>
                        <form className={classes.root} >
                            <div style={{ marginLeft: "8%" }}>
                                <TextField
                                    required
                                    name="email"
                                    type="email"
                                    id="outlined-full-width"
                                    label="Email"
                                    variant="outlined"
                                    inputProps={{
                                        className: classes.textField
                                    }} />
                                {open &&
                                    <div>
                                        <TextField
                                            required
                                            id="outlined-full-width"
                                            label="Enter otp"
                                            variant="outlined"
                                            inputProps={{
                                                className: classes.textField
                                            }} />
                                        <text
                                            style={{ marginLeft: '3%', fontSize: '12px' }}
                                            className={classes.menuItem} > Resend otp
                                        </text>
                                    </div>
                                }
                            </div>
                            <div >
                                {!open && <Button
                                    variant="contained"
                                    color="primary"
                                    style={{marginLeft:'40%',marginTop:'10px',marginBottom:'20px'}}
                                    onClick={onSubmitHandler} >
                                    Send otp
                                </Button> }
                                {open && 
                                <Route render={({ history }) => (<Button
                                    variant="contained"
                                    color="primary"
                                    style={{marginLeft:'35%',marginTop:'15px',marginBottom:'20px'}}
                                    onClick={() => { history.push('/newpassword') }}
                                    >
                                    Conform otp
                                </Button>)}/> }

                            </div>

                        </form>
                    </div>
                </div >
            </Card >
        </div >
    )
}

export default Password