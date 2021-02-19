import React, { useEffect, useContext } from 'react';
import UserContext from './UserContext';
import { v4 as uuidv4 } from 'uuid';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Api from '../../functions/Api';

function UserMoviesList() {

    const { movieShows } = useContext(UserContext);

    const onClick = async () => {
        // console.log(halls);
        const test = await Api.getMovie('movie_seats', 1);
        console.log(test);
    };

    useEffect(async () => {
      console.log(movieShows);
    },[movieShows]);

    return (
      <>
      { movieShows && movieShows.map((film) => (
        <section className="movie" key={uuidv4()}>
          <div className="movie__info">
            <div className="movie__poster">
              <img className="movie__poster-image" alt="Звёздные войны постер" onClick={onClick} src={film.poster} />
            </div>
            <div className="movie__description">
              <h2 className="movie__title">{film.name}</h2>
              <p className="movie__synopsis">{film.description}</p>
              <p className="movie__data">
                <span className="movie__data-duration">{film.duration} минут</span>
                <span className="movie__data-origin"> {film.country}</span>
              </p>
            </div>
          </div>  

          { film.halls.map((hall) => (
            <div className="movie-seances__hall" key={uuidv4()}>
              <h3 className="movie-seances__hall-title">{hall.name}</h3>
              <ul className="movie-seances__list">
                { hall.seances.map((seance) => (
                  <li key={uuidv4()} className="movie-seances__time-block"><Link className="movie-seances__time" to={`/hall/${seance.id}`}>{parseInt(seance.start_time / 60)}:{seance.start_time % 60}</Link></li>
                ))}            
              </ul>
            </div>
          ))}
        </section> 
      ))}


    </>

  
    );
  }
  
  export default UserMoviesList;