import React, { useState, useEffect } from 'react';
import AdminContext from './AdminContext';
import Api from '../../functions/Api';

export default function AdminProvider(props) {
    const API = new Api;
    const [halls, setHalls] = useState([]);

    const loadFromServer = async () => {
        setHalls(await API.getItems('hall'));
    };

    useEffect(loadFromServer, []);

    

    return (
        <AdminContext.Provider value={{halls, setHalls}}>
            {props.children}
        </AdminContext.Provider>
    )
}