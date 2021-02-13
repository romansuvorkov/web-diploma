import React, { useEffect, useState } from 'react';
import './admin.css';
import SectionHeader from './SectionHeader'
import backgroundImage from '../../../images/admin/background-admin.jpg';
import HallManagement from './HallManagment';
import HallConfig from './HallConfig';
import PriceConfig from './PriceConfig';
import API from '../../functions/Api';
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

    // const [isAddPopup, setIsAddPopup] = useState(false);

    // const handleOnAddClick = () => {
    //   setIsAddPopup(true);
    // }

    return (
        <AdminProvider>
    <header className="page-header">
        <h1 className="page-header__title">Идём<span>в</span>кино</h1>
        <span className="page-header__subtitle">Администраторррская</span>
      </header>
      
      <main className="conf-steps">
        <section className="conf-step">
          <SectionHeader title="Управление залами" />
          <HallManagement />
        </section>
        
        <section className="conf-step">
          <SectionHeader title="Конфигурация залов" />
          <HallConfig />
        </section>
        
        <section className="conf-step">
          <SectionHeader title="Конфигурация цен" />
          <PriceConfig />
        </section>
        
        <section className="conf-step">
          <SectionHeader title="Сетка сеансов" />
          <MovieShowConfig/>
        </section>
        
        <section className="conf-step">
          <SectionHeader title="Открыть продажи" />
          <div className="conf-step__wrapper text-center">
            <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
            <button className="conf-step__button conf-step__button-accent">Открыть продажу билетов</button>
          </div>
        </section>    
      </main>
  </AdminProvider>
    );
  }
  
  export default AdminPanel;