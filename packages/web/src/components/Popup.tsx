import React , { ReactNode , useEffect , useState} from 'react';
import getFullMenu , {InfoFullMenu , InfoShortMenu , InfoStore} from '../../../api-gateway/controller/Restaurant';
import * as ReactDOM from 'react-dom';
import App from '../App';
import './style/Popup.css';
import Menu , {selectMenu} from './Menu';

interface Props {
  //ReactNode
  menuListName?: any,
  id?: any,
  show? : any,
  onClose? : any,
  largeImage? : any,
  fullP? : any,
  labelOp? : any,
  choiceOp? : any,
  labels? : any,
  choices? : any
}

function Popup ({ id , menuListName, show , largeImage ,fullP , labelOp , choiceOp ,onClose , ...props }: Props) {
  
  const [menuInfo , setMenuInfo] = useState<InfoFullMenu[]>([]);
  useEffect(() => {
      fetch(`https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/`+ id + `/menus/` +menuListName+ `/full.json`)
      .then( res => res.json())
      .then(data => {
        setMenuInfo([data]);
      })
  } , []);
  
  function renderData() {
      return menuInfo.map( (data , index) => {
        return (
          <div className="overlay" >
          <div className="content-menu" key={data.id}>
            <div className="top-content">
              <h3 id="foodName">{menuListName}</h3>
              <div className="exit">
                <h3 onClick={onClose}>X</h3>
              </div>
            </div>
            <div className="frame">
              <img src={largeImage}/>
            </div>
            <div className="price-section">
              <p>ราคา {fullP} บาท</p>
              <button className="order" onClick={onClose}>สั่งเมนูนี้</button>
            </div>
            <div className="option">
            <h5>ตัวเลือกเพิ่มเติม</h5>
        
              {data.options.map( (label,index)=> (
                
                <div key={index}>
                  <p id="option-name">{label.label}</p>

                    <select id="option-list">
                      {label.choices.map( d => (
                        <option className="">{d.label}</option>
                      ))}
                    </select>
                  
                </div> 
              ))}
          
            </div>

          </div>
        </div>
        );
      })
  }

  if (show == false) return null;
  return (
    <div>
        {renderData()}
    </div>
  )
}

export default Popup;
