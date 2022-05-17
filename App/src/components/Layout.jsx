import React from 'react';

import Navbar from './Navbar';
import NavigationBar from './NavigationBar';

export default function Layout(props) {
  return (
    <React.Fragment>
      <Navbar />
      {props.children}
    </React.Fragment>
  );
}