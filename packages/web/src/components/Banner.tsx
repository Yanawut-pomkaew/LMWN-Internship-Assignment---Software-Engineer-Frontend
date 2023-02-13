import React, { useState , useEffect } from 'react';
import getRestaurant , {InfoStore} from '../../../api-gateway/controller/Restaurant';
import {BrowserRouter as Router, Route ,Routes ,useParams , Link} from 'react-router-dom';
import axios from 'axios';
import './style/Banner.css';
import Menu from './Menu';
import e from '../../../api-gateway/index';

function Banner() {
    const {id} = useParams();
    const ID = Object.values({id});
    const [Restaurant , setRestaurant] = useState<InfoStore[]>([]);
    
    useEffect(() => {
        fetch(`https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/`+ ID+`.json`)
          .then(res => res.json())
          .then(data => {
            setRestaurant([data]);
            
          });
    }, []);

    return(
            <div>
                <div id="banner-ja">
                    <div className="image">
                        {Restaurant.map( (data , index) => (
                            <img className="banner" id="banner" key={index} src={data.coverImage} alt="logo"/>
                        ))}
                    </div>
                
                    <div className="name">
                        {Restaurant.map( (data , index) => (
                            <div key={index}>
                            <h1 id="resName">{data.name}</h1> 
                            <p>ให้บริการทุกวันเวลา : {data.activeTimePeriod.open} - {data.activeTimePeriod.close}</p>
                            </div>
                        ))}
                        <div className="frame-open">
                            <p>เปิด</p>
                        </div> 
                    </div>   
                        {(Restaurant.map(  (data , index) => (
                            
                            <div key={index}>  
                                <Menu {...data.menus} />
                            </div>
                        )))}
                </div>  
            </div>
    )
}

export default Banner;