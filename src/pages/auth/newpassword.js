import React from 'react'
import { useState } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import './loginpage.css';
import history from '../history/history';
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
        marginTop: "70px"
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
const Newpassword = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

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
                        <h2 style={{ marginLeft: '33%', marginTop: '10px', fontSize: '16px', marginBottom: '-5px' }}>Reset Password</h2>
                        <form className={classes.root} >
                            <div style={{ marginLeft: "8%" }}>
                            <TextField
                                    required
                                    id="outlined-password-input"
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    label="Create new Password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    required
                                    id="outlined-password-input"
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    label="Conform new Password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>
                            <div>
                            <Route render={({ history }) => (
                                <Button
                                    variant="contained"
                                    style={{ marginLeft: "37%", marginBottom: "20px", marginTop: '10px' }}
                                    onClick={() => { history.push('/loginpage') }}
                                    color="primary" >
                                    Submit
                                </Button>)} 
                            />

                                <Backdrop className={classes.backdrop} open={open} >
                                    <CircularProgress color="primary" />
                                </Backdrop>
                            </div>
                        </form>
                    </div>
                </div >
            </Card >
        </div >
   
  )
}

export default Newpassword