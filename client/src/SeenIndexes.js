import React from 'react';

export default function SeenIndexes(props) {
  const seen = () => {
    return props.indexes.map(({ number }) => number).join(', ');
  };
  return (
    <div>
      <p>{seen()}</p>
    </div>
  );
}
