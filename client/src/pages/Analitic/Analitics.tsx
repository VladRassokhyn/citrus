import React from 'react';
import { useEffect, useState } from 'react';
import { Preloader } from '../../Components/Preloader';

export const Analitic = (): JSX.Element => {
  const [show, setSHow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSHow(true);
    }, 2000);
  }, []);

  if (show) {
    return <h2>Самозванец</h2>;
  } else {
    return <Preloader />;
  }
};
