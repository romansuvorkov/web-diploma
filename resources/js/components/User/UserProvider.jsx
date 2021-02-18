import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';

export default function UserProvider(props) {
    
    const [movieShows, setMovieShows] = useState([]);
    // const [activeHall, setActiveHall] = useState('');
    // const [films, setFilms] = useState([]);

    // const loadMovies = async () => {
    //     const movies = await Api.getItems('movie_hall');
    //     setHalls(movies);
    // };
    
    // const loadFilmsFromServer = async () => {
    //     setFilms(await Api.getItems('film'));
    //     console.log('loadFilmsFromServer');
    // };

    useEffect(() => {
        // loadMovies();
    }, []);

    

    return (
        <UserContext.Provider value={{setMovieShows, movieShows}}>
            {props.children}
        </UserContext.Provider>
    )
}