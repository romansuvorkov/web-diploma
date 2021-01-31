import React, { useEffect } from 'react';
import { useContext } from 'react';
import HallManageItem from './HallManageItem';
import AdminContext from './AdminContext';

function HallManagement() {

    const { halls } = useContext(AdminContext);

    return (
            <div className="conf-step__wrapper">
                <p className="conf-step__paragraph">Доступные залы:</p>
                <ul className="conf-step__list">
                {halls.map(o => (
                    <HallManageItem key={o.id} name={o.name} />
                ))}
                </ul>
                <button className="conf-step__button conf-step__button-accent">Создать зал</button>
            </div>
    );
  }
  
  export default HallManagement;