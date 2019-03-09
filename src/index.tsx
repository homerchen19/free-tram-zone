import * as React from 'react';
import { render } from 'react-dom';
import ReactGA from 'react-ga';

import Map from './map';

ReactGA.initialize('UA-135887227-1');

const App = () => {
  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      <h1 style={{ display: 'none' }}>Am I in Melbourne's Free Tram Zone?</h1>
      <Map />
    </>
  );
};

const rootElement = document.getElementById('root');
render(<App />, rootElement);
