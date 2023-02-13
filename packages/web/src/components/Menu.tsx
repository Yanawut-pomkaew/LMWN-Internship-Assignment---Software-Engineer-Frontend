import React, { useState , useEffect , Component , useRef ,  ReactNode} from 'react';
import getRestaurant , {InfoStore} from '../../../api-gateway/controller/Restaurant';
import getShortMenu , {InfoShortMenu} from '../../../api-gateway/controller/Restaurant';
import getFullMenu , {InfoFullMenu} from '../../../api-gateway/controller/Restaurant';
import {BrowserRouter as Router,Route,Link,useParams} from "react-router-dom";
import axios from 'axios';
import Popup from './Popup';
import Index from "../../../api-gateway/index";
import ReactDOM from 'react-dom/client';
import './style/Menu.css';

var max = 0;
var count = 0;
export var selectMenu = "";
export var selectImg:any;
export var selectPrice: any;
export var selectLabel: any;
export var selectChoice: any;

var txtMenu;

const Menu: React.FC<InfoStore> = (menus: InfoStore) => {
    const {id} = useParams();
    const ID = Object.values({id});
    const txt = String(Object.values(menus)[4]);
    var txtMenu = txt.split(',');
    const [menu , setMenu] = useState<InfoFullMenu[]>([])
    
    useEffect( () => {
         //ข้อมูลทุกตัวของร้านตาม ID ตามลำดับ
        const fetchData = async () => {
            for (let i = 0; i < Object.values(menus).length ; ++i) {
                await fetch(`https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/`+ ID + `/menus/` +Object.values(menus)[i]+ `/full.json`)
                .then(res => res.json())
                .then(data => {
                    setMenu([data]);
                });
            }
        }
        fetchData();
    }, []);

    // ดูว่าเมนูไหนขายดี
    menu.map(data => {
        if(data.sold > max) {
            max = data.sold;
        }
    })
 
    const [popup , setPopup] = useState("")
    const [show , setShow] = useState(false)
    const [select , setSelect] = useState()
    var [labels , setLabels] = useState([])
    var [choices , setChoices] = useState([])

    function callMenu() {
        const a = menu.map(data => {
        var parent = document.getElementById("menu-container");
        var post = document.createElement("div");
        var post_inner = document.createElement("div");
        post.setAttribute("class" , "menu-section");
        post_inner.setAttribute("class" , "post-menu-inner");
        var infoMenu = document.createElement("p");
        var price = document.createElement("p");

        infoMenu.setAttribute("class" , "menu-text");
        var img = document.createElement('img');
        img.setAttribute("class", "menu-post-img");
        img.src = `${data.thumbnailImage}`;
        if(data.sold === max) {
            infoMenu.innerHTML = `<span>${data.name}</span>`;
            infoMenu.innerHTML += '&nbsp;&nbsp;&nbsp; <small style="color:#FF3333">ขายดี!</small><br /><br />';
        }else {
            infoMenu.innerHTML = `${data.name} <br /><br /`;
        }

        if(data.discountedPercent != 0){
            infoMenu.innerHTML += `<s>${data.fullPrice} บาท</s> &nbsp;&nbsp;`;
            infoMenu.innerHTML += String((data.discountedPercent % 100) * data.fullPrice) ;
            infoMenu.innerHTML += ' บาท<br/>';
            infoMenu.innerHTML += `<small style="font-size:10px">ลดพิเศษเฉพาะช่วง ${data.discountedTimePeriod?.begin} - ${data.discountedTimePeriod?.end} เท่านั้น</small>`;
        }else {
            infoMenu.innerHTML += `${data.fullPrice} บาท`;
        }
        
        var btn = document.createElement("button");
        btn.setAttribute("class" , "btn-menu");
        btn.onclick = function() {
            selectMenu = `${data.name}`; 
            setPopup(selectMenu); 
            setShow(true);
            selectImg =`${data.largeImage}`;
            setPopup(selectImg);
            selectPrice = data.fullPrice;
            setPopup(String(selectPrice));

            data.options.map( d => {
   
                selectLabel = d.label;

                setLabels(selectLabel);
                
                d.choices.map( i => {
                    selectChoice = i.label;
                    setChoices(selectChoice);
                })  
             
            })
            setPopup(selectLabel);
            count++;
        };

        btn.value = `${data.name}`;
        btn.innerHTML = `สั่งเมนู`;
        parent?.appendChild(post);
        post_inner?.appendChild(img);
        post_inner?.appendChild(infoMenu);
        post_inner?.appendChild(btn);
        post?.appendChild(post_inner);
    })}
    
    callMenu();
    function callPopup() {
        if(count > 0) {
            return <Popup menuListName={selectMenu} id={ID} largeImage={selectImg} fullP={selectPrice} labelOp={labels} choiceOp={choices} show={show} onClose={() => {setShow(false); selectMenu="" ; selectImg="" ; setLabels=( ()=> [""]); setChoices=( ()=> [""]) ; choices=[] ; labels=[] ; location.reload()}}/> 
        }
    }
    return (
        <div className="menu-container" id="menu-container" >
            <div className="menu-section" id="menu-section">
                {callPopup()}
            </div>
        </div>
    )
};
export default Menu;