import React from 'react';
import './GetEndpointDiv.css';

const GetEndpointDiv = ({ title, endpoint, handleClick, fetch, parameters }) => {
  return (
    <div className="endpoint">
      <h3>{title}</h3>
      <code>
        {endpoint}
      </code>
      { parameters && (
        <ul>
          {parameters.map((param, i) => <li key={i}>{param}</li>)}
        </ul>
      )}
      <h4>JS example</h4>
      <pre>{fetch}</pre>
      <button onClick={handleClick}>Run Example</button>
    </div>
  );
}

export default GetEndpointDiv;