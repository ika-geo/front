import React from 'react';
import {useHistory} from "react-router-dom";

const ErrorPage = () => {

    const history = useHistory()

    history.push('/')

    return (
        <></>
    );
};

export default ErrorPage;