import React from 'react';

import Poll from '../components/Poll';
import ErrorMessage from '../components/ErrorMessage';

const PollPage = ({ match, getPoll, poll }) => {
    const host = window.location.href;  //this page will render only if windows url points to the correct node
    getPoll(match.params.id);   //match.params.id comes from react router
  
    return (
      <div>
        <ErrorMessage />
        <Poll />
      </div>
    );
  };
  
  export default PollPage;