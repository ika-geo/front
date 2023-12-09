import React, {useState} from "react";
import Card from "../../components/historyCard";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        paddingLeft: "100px",
        marginTop: "20px",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
}));


function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function History() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [clients, setClients] = useState([])
    const [filteredClient, setFilteredClient] = useState('All')

    React.useEffect((open) => {
        fetchData();
    }, []);

    // moved the function outside
    const fetchData = () => {
        setOpen(!open);
        axios.get(`${process.env.REACT_APP_API_URL}/invoice`).then((res) => {
            setOpen(false);
            setData(res.data.data.results);
        });
    };

    React.useEffect(() => {
        setClientsForFilter()
    }, [data])


    async function setClientsForFilter() {
        try {
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/client`)
            const clientsResult = result.data
            let innerClients = []
            data.forEach(item => {
                if (!innerClients.includes(item.client)) {
                    innerClients.push(item.client)
                    let name = clientsResult.find(clientsResultItem => clientsResultItem._id === item.client)
                    setClients((prev) => [...prev, {id: item.client, active: true, name: name.client_name}])
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const changeFilteredClient = (e)=>{
        setFilteredClient(e.target.value)
    }

    return (
        <div>
            <h1 style={{marginLeft: "45%"}}>History</h1>
            <FormControl style={{paddingLeft:'100px'}} className={classes.formControl}>
                <Select
                    value={filteredClient}
                    onChange={(e)=>changeFilteredClient(e)}
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    input={<Input />}
                    className={classes.select}
                >
                    <MenuItem value="All">
                        <em>All clients</em>
                    </MenuItem>
                    {clients.map((name) => (
                        <MenuItem
                            key={name.id}
                            value={name.id}
                        >
                            {name.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Grid container spacing={1} className={classes.gridContainer}>
                {data.map((historyData, index) => {
                    if (filteredClient!=="All"&&historyData.client!==filteredClient){
                        return
                    }
                    return (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card data={historyData} idx={index} fetchData={fetchData} setClients={setClients}/>
                        </Grid>
                    );
                })}
            </Grid>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="primary"/>
            </Backdrop>
        </div>
    );
}
