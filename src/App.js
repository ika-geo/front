import Login from './pages/auth/login';
import Home from './pages/home';
import Client from './components/addClient/client'
import Candidate from './components/addCandidate/candidate'
import History from './pages/history/history';
import Header from './components/header'
import ViewClient from './pages/viewClient/viewClient';
import ViewCandidate from './pages/viewCandidate/viewCandidate';
import {Route, Router, Switch} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import history from './history'
import TimeSheetComp from './components/addTimeSheet/TimeSheetComp'
import ViewTimeSheet from './components/viewTimesheet'
import ScheduleInvoice from './components/scheduleInvoice/ScheduleInvoice'
import ViewSchedule from './pages/schedule/viewSchedule'
import InvoiceFilter from './pages/InvoiceFilter/InvoiceFilter'
import charts from './pages/charts/charts'
import loginpage from "./pages/auth/loginpage";
import signup from './pages/auth/signup'
import password from './pages/auth/password'
import newpassword from './pages/auth/newpassword'
import Paysliphistory from './pages/history/paysliphistory';
import payslip from "./pages/payslip";
import ViewPayslip from './pages/viewPayslip/viewPayslip';
import EditInvoice from './pages/EditInvoice/EditInvoice'
import ErrorPage from "./pages/ErrorPage";
import {createContext, useState} from "react";


export const TokenContext = createContext();

function App() {
    const [token, setToken] = useState(localStorage.signedin)

    if (!token) {
        return (
            <TokenContext.Provider value={{token, setToken}}>
                <Router history={history}>
                    <Header/>
                    <Switch>
                        <Route path="/" component={Login} exact/>
                        <Route path="*" component={ErrorPage} exact/>
                    </Switch>
                </Router>
            </TokenContext.Provider>
        );
    }

    return (
        <TokenContext.Provider value={{token, setToken}}>
            <Router history={history}>
                <Header/>
                <Switch>
                    <ProtectedRoute path="/" component={History} exact/>
                    <ProtectedRoute path="/create-invoice" component={Home} exact/>
                    <ProtectedRoute path="/edit-invoice/:id" component={EditInvoice} exact/>
                    <ProtectedRoute path="/client" key="add-client" component={Client} exact/>
                    <ProtectedRoute path="/client/:id" key="edit-client" component={Client} exact/>
                    <ProtectedRoute path="/candidate" key="add-candidate" component={Candidate} exact/>
                    <ProtectedRoute path="/candidate/:id" key="edit-candidate" component={Candidate} exact/>
                    <ProtectedRoute path="/payslip" key="add-payslip" component={payslip} exact/>
                    <ProtectedRoute path="/payslip/:id" key="edit-payslip" component={payslip} exact/>
                    <ProtectedRoute path="/timesheet" component={TimeSheetComp} exact/>
                    <ProtectedRoute path="/view-timesheet" component={ViewTimeSheet} exact/>
                    <ProtectedRoute path="/view-client" component={ViewClient} exact/>
                    <ProtectedRoute path="/paysliphistory" component={Paysliphistory} exact/>
                    <ProtectedRoute path="/view-payslip" component={ViewPayslip} exact/>
                    <ProtectedRoute
                        path="/view-candidate"
                        component={ViewCandidate}
                        exact
                    />
                    <ProtectedRoute
                        path="/schedule-invoice"
                        component={ScheduleInvoice}
                        exact
                    />
                    <ProtectedRoute path="/view-schedule" component={ViewSchedule} exact/>
                    <ProtectedRoute
                        path="/schedule/:id"
                        key="edit-schedule"
                        component={ScheduleInvoice}
                        exact
                    />
                    <ProtectedRoute
                        path="/invoice-filter"
                        component={InvoiceFilter}
                        exact
                    />
                    <ProtectedRoute
                        path="/charts"
                        component={charts}
                        exact
                    />
                    <ProtectedRoute
                        path="/loginpage"
                        component={loginpage}
                        exact
                    />
                    <ProtectedRoute
                        path="/signup"
                        component={signup}
                        exact
                    />
                    <ProtectedRoute
                        path="/password"
                        component={password}
                        exact
                    />
                    <ProtectedRoute
                        path="/newpassword"
                        component={newpassword}
                        exact
                    />
                  <Route path="*" component={ErrorPage} exact/>
                </Switch>
            </Router>
        </TokenContext.Provider>
    );
}

export default App;