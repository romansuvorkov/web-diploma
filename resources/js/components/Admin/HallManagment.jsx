import React, { useEffect } from 'react';
import { useContext } from 'react';
import HallManageItem from './HallManageItem';
import AdminContext from './AdminContext';
import Api from '../../functions/Api';

function HallManagement() {

    const { halls, loadFromServer } = useContext(AdminContext);

    const handleDeleteHall = async (id) => {
        const response = await Api.deleteItem('hall', id);
        console.log(response);
        if (response === 'Successful delete') {
            loadFromServer();            
        }

    }


    return (
            <div className="conf-step__wrapper">
                <p className="conf-step__paragraph">Доступные залы:</p>
                <ul className="conf-step__list">
                {halls.map(o => (
                    <HallManageItem key={o.id} name={o.name} hallId={o.id} handleDeleteHall={handleDeleteHall} />
                ))}
                </ul>
                <button className="conf-step__button conf-step__button-accent">Создать зал</button>
            </div>
    );
  }
  
  export default HallManagement;