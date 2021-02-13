import React, { useState, useEffect } from 'react';
import AdminContext from './AdminContext';
import Api from '../../functions/Api';

export default function AdminProvider(props) {
    
    const [halls, setHalls] = useState([]);
    const [activeHall, setActiveHall] = useState('');
    // const [films, setFilms] = useState([]);

    const loadFromServer = async () => {
        setHalls(await Api.getItems('hall'));
        setActiveHall(0);
    };
    
    // const loadFilmsFromServer = async () => {
    //     setFilms(await Api.getItems('film'));
    //     console.log('loadFilmsFromServer');
    // };

    useEffect(() => {
        loadFromServer();
        // loadFilmsFromServer();
    }, []);

    

    return (
        <AdminContext.Provider value={{halls, setHalls, activeHall, setActiveHall, loadFromServer}}>
            {props.children}
        </AdminContext.Provider>
        // <AdminContext.Provider value={{halls, setHalls, activeHall, setActiveHall, loadFromServer, loadFilmsFromServer, films}}>
        //     {props.children}
        // </AdminContext.Provider>
    )
}