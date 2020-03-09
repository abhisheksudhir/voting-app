import React from 'react';

import Poll from '../components/Poll';
import ErrorMessage from '../components/ErrorMessage';

const PollPage = ({ match, getPoll}) => {
    getPoll(match.params.id);   //match.params.id comes from react router
  
    return (
      <div>
        <ErrorMessage />
        <Poll />
      </div>
    );
  };
  
  export default PollPage;  //we don't need to connect it to redux as getPoll is coming from the parent