import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTasks, faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons';

const Toolbar = () => {
  return (
    <div className="toolbar flex flex-col items-center bg-gray-200 p-4 space-y-4">
        <FontAwesomeIcon icon={faHome} size="lg" />
        <FontAwesomeIcon icon={faTasks} size="lg" />
        <FontAwesomeIcon icon={faInfoCircle} size="lg" />
        <FontAwesomeIcon icon={faUser} size="lg" />
    </div>
  )
}

export default Toolbar