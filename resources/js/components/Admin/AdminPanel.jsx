import React, { useEffect, useState } from 'react';
import './admin.css';
import SectionHeader from './SectionHeader'
import backgroundImage from '../../../images/admin/background-admin.jpg';
import HallManagement from './HallManagment';
import HallConfig from './HallConfig';
import PriceConfig from './PriceConfig';
import Login from './Login';
import HallSaleManagement from './HallSaleManagement';
import Api from '../../functions/Api';
import AdminContext from './AdminContext';
import AdminProvider from './AdminProvider';
import MovieShowConfig from './MovieShowConfig';
import AddFilmPopup from './AddFilmPopup';


function AdminPanel() {

    const backgroundImageStyle = `
        background-image: url(${backgroundImage});
        background-color: rgba(0, 0, 0, 0.5);
        background-blend-mode: multiply;
        background-size: cover;
        background-attachment: fixed;
        counter-reset: num;
    `;

    document.body.style  = backgroundImageStyle;

    const [isLogged, setIsLogged] = useState(true);
    const [loginError, setLoginError] = useState(false);

    const handleLogin = async (evt, address, login, password) => {
      evt.preventDefault();
      const response = await Api.userLogin(address, login, password);
      if (response === 'Logged succesful') {
        setIsLogged(true);
        setLoginError(false);
      } else {
        setLoginError(true);
      }
    }

    return (
        <AdminProvider>
    <header className="page-header">
        <h1 className="page-header__title">Идём<span>в</span>кино</h1>
        <span className="page-header__subtitle">Администраторррская</span>
      </header>
      
      <main className="conf-steps">

        {!isLogged &&<Login handleClick={handleLogin} loginError={loginError}/>}
        {isLogged && <section className="conf-step">
          <SectionHeader title="Управление залами" />
          <HallManagement />
        </section>}
        
        {isLogged &&<section className="conf-step">
          <SectionHeader title="Конфигурация залов" />
          <HallConfig />
        </section>}
        
        {isLogged &&<section className="conf-step">
          <SectionHeader title="Конфигурация цен" />
          <PriceConfig />
        </section>}
        
        {isLogged &&<section className="conf-step">
          <SectionHeader title="Сетка сеансов" />
          <MovieShowConfig/>
        </section>}
        
        {isLogged &&<section className="conf-step">
          <SectionHeader title="Открыть продажи" />
          <HallSaleManagement />
        </section>} 
      </main>
  </AdminProvider>
    );
  }
  
  export default AdminPanel;