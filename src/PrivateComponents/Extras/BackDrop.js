import React from 'react';

function Backdrop({z}) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.1)', zIndex: {z} }}></div>
  );
}

export default Backdrop;