'use client'

import React from 'react';
import './home.css'; // Import the CSS file
import { FlightSearchForm } from '@/components/FlighSearchForm';


const Home = () => {
  return (
    <div className="HomeContainer"> {/* Apply the CSS class */}
      <div className="ContentWrapper"> {/* Apply the CSS class */}
        <h1 className="Title">Welcome to Ayrus Flight Booking App</h1> {/* Apply the CSS class */}
        <p className="Subtitle">Start searching for flights to your destination</p> {/* Apply the CSS class */}
        <FlightSearchForm/>
      </div>
      
    </div>
  );
};

export default Home;
