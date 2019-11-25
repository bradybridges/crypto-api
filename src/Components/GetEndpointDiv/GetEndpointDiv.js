import React from 'react';
import './GetEndpointDiv.css';

const GetEndpointDiv = ({ title, endpoint, handleClick, fetch }) => {
  return (
    <div className="endpoint">
      <h3>{title}</h3>
      <code>
        {endpoint}
      </code>
      <h4>JS example</h4>
      <pre>{fetch}</pre>
      <button onClick={handleClick}>Run</button>
    </div>
  );
}

export default GetEndpointDiv;