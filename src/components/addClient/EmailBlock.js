import {TextField, Button, Grid} from '@mui/material';
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

const EmailBlock = ({toEmailStr, setToEmailStr, ccEmailStr, setCCEmailStr}) => {
    const handleEmailChange = (index, event) => {
        const newEmails = [...toEmailStr];
        newEmails[index] = event.target.value;
        setToEmailStr(newEmails);
    };

    const ccChangeHandler = (event) => {
        setCCEmailStr(event.target.value);
    };

    const handleAddEmailField = () => {
        setToEmailStr([...toEmailStr, '']);
    };

    const handleRemoveEmailField = (index) => {
        const newEmails = [...toEmailStr];
        newEmails.splice(index, 1);
        setToEmailStr(newEmails);
    };
    return (
        <div style={{display: 'flex'}}>
            <div>
                {toEmailStr.map((email, index) => (
                    <Grid item key={index}>
                        <div style={{display: 'flex'}}>
                            <div
                                style={{
                                    marginRight: '35px',
                                    marginBottom: '15px',
                                    position:'relative'
                                }}
                            >
                                <TextField
                                    style={{marginBottom: '15px'}}
                                    required
                                    type="text"
                                    label="To"
                                    name="toEmails"
                                    variant="outlined"
                                    placeholder="Add , separated Emails"
                                    onChange={(event) => handleEmailChange(index, event)}
                                    value={toEmailStr[index]}
                                />
                                <div
                                    style={{
                                        position:'absolute',
                                        right:'-30px',
                                        top:'0'
                                    }}
                                >
                                    {index !== 0 && (
                                        <DeleteIcon style={{cursor:'pointer', fontSize:"200%"}} onClick={() => handleRemoveEmailField(index)}/>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Grid>
                ))}
                <Grid item>
                    <Button style={{marginBottom:'30px', cursor:'pointer'}} variant="contained" onClick={handleAddEmailField}>
                        Add Email
                    </Button>
                </Grid>
            </div>
            <Grid item xs={12}>
                <div style={{display: 'flex'}}>
                    <div
                        style={{
                            marginRight: '15px',
                        }}
                    >
                        <TextField
                            type="text"
                            label="CC"
                            name="ccEmails"
                            variant="outlined"
                            onChange={ccChangeHandler}
                            value={ccEmailStr}
                            placeholder="Add , separated Emails"
                        />
                    </div>
                </div>
            </Grid>
        </div>
    )
};

export default EmailBlock;