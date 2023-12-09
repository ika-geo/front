import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import { Box } from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import MuiAlert from "@material-ui/lab/Alert";
import { Checkbox, FormControlLabel } from '@mui/material';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// import history from "../../history";
import TextEditor from "../TextEditor/TextEditor";
import EmailBlock from "./EmailBlock"

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  multiline: {
    width: "400px",
  },
  payment: {
    width: "195px",
  },
  item: {
    width: "500px",
    padding: "5px",
  },
  quantity: {
    width: "50px",
    padding: "5px",
  },
  rate: {
    width: "100px",
    padding: "5px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  wrapper: {
    height: "300px",
  },
  editor: {
    backgroundColor: "white",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FormPropsTextFields() {
  let { id } = useParams();
  const classes = useStyles();
  const [clientData, setState] = React.useState({
    client_name: "",
    billing_address: "",
    shipping_address: "",
    payment_terms: "",
    notes: "",
    terms: "",
    date_of_contract: String(new Date()),
    toEmails: [],
    ccEmails: "",
    email_content: "",
    isLut: false
  });
  const history = useHistory()
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [alert, setMessage] = React.useState({ message: "", severity: "" });
  const [openLoader, setOpenLoader] = React.useState(false);
  const [toEmailStr, setToEmailStr] = React.useState(['']);
  const [ccEmailStr, setCCEmailStr] = React.useState("");
  const [isLut, setIsLut] = React.useState(false);
  const [email_content, setEmailContent] = React.useState("");
  const [emptyEditor, setEmptyEditor] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const htmlData = (data) => {
    setEmailContent(data);
  };

  const fetchData = () => {
    var toEmailString = [""],
      ccEmailString = "";
    axios
      .get(`${process.env.REACT_APP_API_URL}/client/${id}`)
      .then((response) => {
        const Data = response.data;
        if (Data.ccEmails.length !== 0) {
          for (var j = 0; j < Data.ccEmails.length; j++) {
            if (j !== Data.ccEmails.length - 1)
              ccEmailString = ccEmailString + Data.ccEmails[j] + ",";
            else ccEmailString = ccEmailString + Data.ccEmails[j];
          }
        }
        setToEmailStr(Data.toEmails);
        setCCEmailStr(ccEmailString);
        setIsLut(Data.isLut)
        setEmailContent(Data.email_content);
        setState({
          client_name: Data.client_name,
          billing_address: Data.billing_address,
          shipping_address: Data.shipping_address,
          payment_terms: Data.payment_terms,
          notes: Data.notes,
          terms: Data.terms,
          date_of_contract: Data.date_of_contract,
          toEmails: Data.toEmails,
          ccEmails: Data.ccEmails,
          email_content: Data.email_content,
        });
        setUpdate(true);
        setUpdate(false);
      })
      .catch((error) => {
        console.log(error);
        history.push("/client");
      });
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDateChange = (date) => {
    setSelectedDate(date);
    clientData.date_of_contract = String(date);
  };

  const handleChange = (e) => {
    setState({
      ...clientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeIsLut = (e)=>{
    setIsLut(e.target.checked);
  }

  const getEmailDetails = () => {
    const currCCEmails = ccEmailStr.split(",");
    const finalCCEmails = [];
    const regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    currCCEmails.forEach((ccEmail) => {
      if (regx.test(ccEmail.trim())) finalCCEmails.push(ccEmail.trim());
    });
    const clientInfo = { ...clientData };
    clientInfo.toEmails = toEmailStr.filter(email=>email);
    clientInfo.ccEmails = finalCCEmails;
    clientInfo.email_content = email_content;
    clientInfo.isLut=isLut;
    return clientInfo;
  };

  function addClient() {
    const clientInfo = getEmailDetails();
    setOpenLoader(true);
    console.log(clientInfo)
    axios
      .post(`${process.env.REACT_APP_API_URL}/client`, clientInfo, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        console.log(response);
        setOpenLoader(false);
        setEmptyEditor(true);
        const message = alert;
        message.message = "client added successfully";
        message.severity = "success";
        setMessage(message);
        setOpen(true);
        setToEmailStr([""]);
        setCCEmailStr("");
        setIsLut(false)
        setState({
          client_name: "",
          billing_address: "",
          shipping_address: "",
          payment_terms: "",
          notes: "",
          terms: "",
          date_of_contract: String(new Date()),
          toEmails: "",
          ccEmails: "",
          email_content: "",
        });
        setEmptyEditor(false);
        history.push('/view-client')
      })
      .catch((error) => {
        setOpenLoader(false);
        // setEmptyEditor(false);
        const message = alert;
        console.log(error.response)
        if(error?.response?.data?.status?.message){
          message.message = error.response.data.status.message;
        }
        else{
          message.message = error.response.data.error;
        }
        message.severity = "error";
        setMessage(message);
        setOpen(true);
      });
  }

  const editClient = () => {
    const clientInfo = getEmailDetails();
    setOpenLoader(true);
    axios
        .put(`${process.env.REACT_APP_API_URL}/client/${id}`, clientInfo, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response);
        setOpenLoader(false);
        setEmptyEditor(true);
        const message = alert;
        message.message = "Client Details Updated Successfully";
        message.severity = "success";
        setMessage(message);
        setOpen(true);
        setState({
          client_name: "",
          billing_address: "",
          shipping_address: "",
          payment_terms: "",
          notes: "",
          terms: "",
          date_of_contract: String(new Date()),
          toEmails: "",
          ccEmails: "",
          email_content: "",
        });
        setToEmailStr([""]);
        setCCEmailStr("");
        setIsLut(false)
        setEmailContent("");
        setEmptyEditor(true);
      })
      .then(()=>{
        history.push("/view-client")
      })
      .catch((error) => {
        setOpenLoader(false);
        const message = alert;
        if (error?.response?.data?.status?.message){
          message.message = error.response.data.status.message;
        }
        else{
          message.message = "Updating Client Details Unsuccessful";
        }
        message.severity = "error";
        setMessage(message);
        setOpen(true);
        console.log(error.message);
      });
  };

  const deleteClient = () => {
    setOpenLoader(true);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/client/${id}`)
      .then((response) => {
        setOpenLoader(false);
        const message = alert;
        message.message = "Client Details Deletion Successfully";
        message.severity = "success";
        setMessage(message);
        setOpen(true);
        history.push("/view-client");
      })
      .catch((error) => {
        setOpenLoader(false);
        const message = alert;
        message.message = "Deletion Client Details Unsuccessful";
        message.severity = "error";
        setMessage(message);
        setOpen(true);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <h1 style={{ marginLeft: "300px", marginTop: "50px" }}>
        {id ? "Edit Client Details" : "Add Client"}
      </h1>
      <Box className="form">
        <div style={{ marginLeft: "10px", display:"flex", flexWrap:"wrap"}}>
          <form noValidate autoComplete="off">
            <div className="leftDivision">
              <div style={{ marginRight: "15px"}}>
                <TextField
                  id="outlined-required"
                  required
                  label="Name of the client"
                  name="client_name"
                  value={clientData.client_name}
                  variant="outlined"
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  marginRight: "15px",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}
              >
                <TextField
                  required
                  id="outlined-required"
                  label="Bill To"
                  variant="outlined"
                  name="billing_address"
                  value={clientData.billing_address}
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  marginRight: "15px",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}
              >
                <TextField
                  required
                  id="outlined-required"
                  label="Ship To"
                  variant="outlined"
                  name="shipping_address"
                  value={clientData.shipping_address}
                  onChange={handleChange}
                />
              </div>

              <div style={{ marginBottom: "10px", marginRight: "15px" }}>
                <TextField
                  required
                  id="outlined-textarea"
                  label="Payment Terms"
                  multiline
                  variant="outlined"
                  inputProps={{ className: classes.payment }}
                  name="payment_terms"
                  value={clientData.payment_terms}
                  onChange={handleChange}
                />
              </div>

              <h3 style={{margin:'15px 0'}}>Email</h3>
              <EmailBlock
                  classes={classes}
                  toEmailStr={toEmailStr}
                  setToEmailStr={setToEmailStr}
                  ccEmailStr={ccEmailStr}
                  setCCEmailStr={setCCEmailStr}
              />
            </div>
          </form>
          <div>
            <div style={{ marginBottom: "10px", marginRight: "15px" }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date of contract"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div style={{ marginTop: "15px" }}>
              <TextField
                id="outlined-textarea"
                label="Notes"
                placeholder="Notes - any relevant information already not covered"
                multiline
                variant="outlined"
                inputProps={{
                  className: classes.multiline,
                }}
                name="notes"
                value={clientData.notes}
                onChange={handleChange}
              />
            </div>
            <div style={{ marginTop: "15px", marginBottom: "20px" }}>
              <TextField
                id="outlined-textarea"
                label="Terms"
                placeholder="Terms and conditions"
                multiline
                variant="outlined"
                inputProps={{
                  className: classes.multiline,
                }}
                name="terms"
                value={clientData.terms}
                onChange={handleChange}
              />
            </div>
            <FormControlLabel
                control={
                  <Checkbox
                      checked={isLut}
                      onChange={handleChangeIsLut}
                      color="primary"
                  />
                }
                label="LUT"
            />
          </div>

          <div
            style={{
              height: "400px",
              width: "100%",
              marginLeft: "20px",
              marginRight: "50px",
            }}
          >
            <TextEditor
              getHtml={htmlData}
              isEmpty={emptyEditor}
              isUpdate={update}
              htmlContent={email_content}
            ></TextEditor>
          </div>

          <div style={{ clear: "both" }} />
        </div>
      </Box>

      <div style={{ marginLeft: "300px", marginTop: "10px" }}>
        {!id && (
          <Button
            type="reset"
            variant="contained"
            color="primary"
            onClick={addClient}
          >
            Add Client
          </Button>
        )}
        {id && (
          <div>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={editClient}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="contained"
              color="primary"
              style={{ marginLeft: "10px" }}
              onClick={deleteClient}
            >
              Delete
            </Button>
          </div>
        )}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alert.severity}>
            {alert.message}
          </Alert>
        </Snackbar>
        <Backdrop className={classes.backdrop} open={openLoader}>
          <div>
            <CircularProgress color="primary" />
          </div>
          <span>Request Processing...</span>
        </Backdrop>
      </div>
    </div>
  );
}