import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'reactstrap';
import React from 'react';

function ShowMore({ onClick, show }) {
  return (
    <div>
      <Button
        type="button"
        title="Show full name"
        onClick={onClick}
        className="py-0 px-1"
        color="transparent"
      >
        {show ? (
          <FontAwesomeIcon icon={faEye} />
        ) : (
          <FontAwesomeIcon icon={faEyeSlash} />
        )}
      </Button>
    </div>
  );
}

export default ShowMore;
