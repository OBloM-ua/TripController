import React from 'react'
import './App.css'
import UpcomingTravelsList from './UpcomingTravelsList'
import AppBar from './AppBar'
import AddPassenger from './AddPassenger'

const App = () => {

    return (
        <div className='App'>
            <AppBar/>
            <div className='WokingArea'>
                <UpcomingTravelsList/>
                <AddPassenger/>
            </div>
        </div>
    );

};

export default App
