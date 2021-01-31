import React, { useEffect } from 'react';
import { useContext } from 'react';
import AdminContext from './AdminContext';

function SectionHeader(props) {

    const { halls } = useContext(AdminContext);

    const title = props.title;

    const onClick = (event) => {
        console.log(halls);
        event.currentTarget.classList.toggle('conf-step__header_closed');
        event.currentTarget.classList.toggle('conf-step__header_opened');
    };

    return (
          <header className="conf-step__header conf-step__header_closed" onClick={(event) => onClick(event)}>
            <h2 className="conf-step__title">{title}</h2>
          </header> 
    );
  }
  
  export default SectionHeader;