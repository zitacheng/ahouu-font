import * as React from 'react';
import Image from 'react-bootstrap/Image';
import france from '../Assets/france.png';
import usa from '../Assets/usa.png';

const Multilang: React.FC = (): React.ReactElement => (
  <div className="flagBlock">
    <Image
      className="flagIcon"
      src={france}
      onClick={() => {
        localStorage.setItem('lang', 'fr');
        window.location.reload();
      }}
    />
    <Image
      className="flagIcon"
      src={usa}
      onClick={() => {
        localStorage.setItem('lang', 'en');
        window.location.reload();
      }}
    />
  </div>
);

export default Multilang;
