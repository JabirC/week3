import './App.css';
import { withAuthenticator, MapView} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import TopBar from "./components/TopBar"
import Dashboard from './components/Dashboard';
// import Maps from './components/Maps';
import React, { useEffect, useState } from "react";
import { Marker } from 'react-map-gl';

function App({ signOut, user }) {
 
  return (
    <div className="App">
          <TopBar uname={user.username} signout={signOut} />
          <Dashboard uname={user.username}/>
          <MapView 
            initialViewState={{
              latitude: 40.7,
              longitude: -73.7,
              zoom: 14,
            }} > 
                    <Marker
        latitude={40.7}
        longitude={-73.7} /></MapView>
            
    </div>
  );
}

export default withAuthenticator(App);