import React from "react";
import styles from "./charts.module.css";
import { Chart } from "react-google-charts";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";

const options = {
  title: "Amount",
  is3D: true,
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const options1 = {
  chart: {
    title: "Company Performance",
  },
};

var fromdate = new Date();
fromdate.setMonth(fromdate.getMonth());
var fromMonth = fromdate.toLocaleString("default", { month: "short" });
var fromYear = fromdate.getFullYear().toString();

var todate = new Date();
todate.setMonth(todate.getMonth() + 1);
var toMonth = todate.toLocaleString("default", { month: "short" });
var toYear = todate.getFullYear().toString();

const Months = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

var chartdata;
var datab;
const Charts = () => {
  const [fromdate, setFromdate] = React.useState(
    `${fromYear}-${Months[fromMonth]}`
  );
  const [todate, setTodate] = React.useState(`${toYear}-${Months[toMonth]}`);
  const [frmdate, setFrmdate] = React.useState(`${fromMonth} ${fromYear}`);
  const [tdate, setTdate] = React.useState(`${toMonth} ${toYear}`);
  const [openDownloader, setOpenDownloader] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const getMonths = (from, to) => {
    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    var arr = [];
    var datFrom = new Date("1 " + from);
    var datTo = new Date("1 " + to);
    var fromYear = datFrom.getFullYear();
    var toYear = datTo.getFullYear();
    var diffYear = 12 * (toYear - fromYear) + datTo.getMonth();

    for (var i = datFrom.getMonth(); i <= diffYear; i++) {
      arr.push(monthNames[i % 12] + " " + Math.floor(fromYear + i / 12));
    }
    return arr;
  };

  const getMonthlyData = (Data) => {
    console.log(Data);
    const invoiceLists = Data.invoiceList;
    const payslipLists = Data.payslipList;
    console.log("invoiceList", invoiceLists);
    console.log("payslipList", payslipLists);
    setOpenDownloader(false);
    const len = Object.keys(invoiceLists).length;
    const monthlyData = [];
    for (var i = 0; i < len; i++) {
      monthlyData.push({
        totalAmount: 0,
        gst: 0,
        tds: 0,
      });
    }

    for (var month = 0; month < len; month++) {
      for (var j = 0; j < Object.keys(invoiceLists[month]).length; j++) {
        monthlyData[month].totalAmount =
          monthlyData[month].totalAmount +
          parseInt(invoiceLists[month][j].total);
        monthlyData[month].gst =
          monthlyData[month].gst + parseInt(invoiceLists[month][j].tax);
      }
    }
    for (month = 0; month < len; month++) {
      for (j = 0; j < Object.keys(payslipLists[month]).length; j++) {
        monthlyData[month].tds =
          monthlyData[month].tds + parseInt(payslipLists[month][j].td_S);
      }
    }
    console.log(monthlyData);
    return monthlyData;
  };

  const getDataHandler = async (event) => {
    event.preventDefault();
    const dates = {
      fromdate,
      todate,
    };
    setOpenDownloader(true);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/payslip/total/`,
      dates,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const Data = response.data.data;
    const monthlyData = getMonthlyData(Data);

    chartdata = [
      ["category", "Amount-share"],
      ["Total Amount", Data.totalAmount],
      ["TDS", Data.tDs],
      ["GST", Data.gST],
      ["salaries", Data.salaries],
    ];
    const months = getMonths(frmdate, tdate);
    console.log(months);
    datab = [["Month", "Total Amount", "TDS", "GST"]];
    for (var i = 0; i < Object.keys(monthlyData).length; i++) {
      datab.push([
        months[i],
        monthlyData[i].totalAmount,
        monthlyData[i].tds,
        monthlyData[i].gst,
      ]);
    }
    console.log(datab);
    setOpen(true);
    // setData(data)
  };

  const fromdateChangeHandler = (event) => {
    var selectedDate = event.target.value;
    console.log(event.target.value);
    const fromdate = new Date();
    const monthNumber = selectedDate.split("-")[1];
    fromdate.setMonth(monthNumber - 1);
    fromMonth = fromdate.toLocaleString("default", { month: "short" });
    fromYear = selectedDate.split("-")[0];
    setFromdate(`${fromYear}-${Months[fromMonth]}`);
    setFrmdate(`${fromMonth} ${fromYear}`);
    setOpen(false);
  };

  const todateChangeHandler = (event) => {
    var selectedDate = event.target.value;
    console.log(event.target.value);
    const todate = new Date();
    const monthNumber = selectedDate.split("-")[1];
    todate.setMonth(monthNumber - 1);
    toMonth = todate.toLocaleString("default", { month: "short" });
    toYear = selectedDate.split("-")[0];
    setTodate(`${toYear}-${Months[toMonth]}`);
    setTdate(`${toMonth} ${toYear}`);
    setOpen(false);
  };

  return (
    <>
      <form className={styles.container}>
        <div style={{ display: "flex", alignContent: "center" }}>
          <TextField
            style={{
              marginTop: "30px",
              marginLeft: "40px",
              marginBottom: "30px",
            }}
            label="Start Date"
            type="month"
            required
            value={fromdate}
            onChange={fromdateChangeHandler}
            InputLabelProps={{ shrink: true }}
          ></TextField>
          <TextField
            style={{
              marginTop: "30px",
              marginLeft: "40px",
              marginBottom: "30px",
            }}
            className={styles.enddate}
            label="End Date"
            type="month"
            required
            value={todate}
            onChange={todateChangeHandler}
            InputLabelProps={{ shrink: true }}
          ></TextField>
          <Button
            variant="contained"
            type="sumbit"
            color="primary"
            style={{
              width: "8rem",
              height: "3rem",
              marginLeft: "40px",
              marginTop: "30px",
              marginBottom: "30px",
            }}
            onClick={getDataHandler}
          >
            Get Data
          </Button>
        </div>
        {open && (
          <div
            style={{
              display: "flex",
              alignContent: "center",
              marginBottom: "40px",
            }}
          >
            <Chart
              style={{ marginLeft: "20px", marginTop: "10px" }}
              chartType="PieChart"
              data={chartdata}
              options={options}
              width={"300px"}
              height={"auto"}
            />
            <Chart
              style={{ marginLeft: "20px", marginTop: "10px" }}
              chartType="Bar"
              width="90%"
              height="auto"
              data={datab}
              options={options1}
            />
          </div>
        )}

        <Backdrop className={classes.backdrop}>
          <CircularProgress color="primary" />
        </Backdrop>
        <Backdrop className={classes.backdrop} open={openDownloader}>
          <div>
            <CircularProgress color="primary" />
          </div>
          <span>Fetchind data....</span>
        </Backdrop>
      </form>
    </>
  );
};

export default Charts;
