import * as React from 'react';

import centerIcon from './center.png';

interface Props {
  onClick: () => void;
}

const CenterButton: React.FunctionComponent<Props> = ({ onClick }) => {
  return (
    <button
      style={{
        display: 'flex',
        width: 34,
        height: 34,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid rgba(0, 0, 0, 0.3)',
        borderRadius: '4px',
        outline: 'none',
        backgroundColor: '#fff',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <img src={centerIcon} style={{ width: '100%' }} />
    </button>
  );
};

export default CenterButton;
