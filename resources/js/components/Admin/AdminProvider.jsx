import React, { useState, useEffect } from 'react';
import AdminContext from './AdminContext';
import Api from '../../functions/Api';

export default function AdminProvider(props) {
    // const API = new Api;
    const [halls, setHalls] = useState([]);
    const [activeHall, setActiveHall] = useState('');

    const loadFromServer = async () => {
        // setHalls(await API.getItems('hall'));
        setHalls(await Api.getItems('hall'));
        setActiveHall(0);
    };

    useEffect(loadFromServer, []);

    

    return (
        <AdminContext.Provider value={{halls, setHalls, activeHall, setActiveHall}}>
            {props.children}
        </AdminContext.Provider>
    )
}