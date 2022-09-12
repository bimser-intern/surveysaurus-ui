import React from 'react'
import MapChart from "../components/MapChart";
import Menu from '../components/Menu';

function Map() {
    return (
        <div className='map'>
            <Menu isLogin={localStorage.getItem("token") ? true : false} />
            <MapChart/>
        </div>
    )
}
export default Map
