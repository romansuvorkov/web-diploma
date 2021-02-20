import React from 'react';
import './user.css';
import DateNavigation from './DateNavigation';
import UserMoviesList from './UserMoviesList';
import backgroundImage from '../../../images/background.jpg';
import UserContext from './UserContext';
import UserProvider from './UserProvider';
import Api from '../../functions/Api';

function UserPanel() {

    const backgroundImageStyle = `
      background-image: url(${backgroundImage});
      background-size: cover;
      background-attachment: fixed;
      background-position: right;
    `;

    return (
      <>
        <header className="page-header">
        <h1 className="page-header__title">Идём<span>в</span>кино</h1>
        </header>
        <DateNavigation />
        <main>
          <UserMoviesList />
        </main>
      </>
    );
  }
  
  export default UserPanel;