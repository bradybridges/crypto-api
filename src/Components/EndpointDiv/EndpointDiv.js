import React from 'react';
import './EndpointDiv.css';

const EndpointDiv = ({ title, endpoint, handleClick, fetch, parameters}) => {
  return (
    <div className="endpoint">
      <h3>{title}</h3>
      <code>
        {endpoint}
      </code>
      { parameters && <h4>Parameters</h4>}
      { parameters && (
        <ul>
          {parameters.map((param, i) => <li key={i}>{param}</li>)}
        </ul>
      )}
      <button onClick={handleClick}>Run</button>
      <h4>JS example</h4>
      <pre>{fetch}</pre>
    </div>
  );
}

export default EndpointDiv;