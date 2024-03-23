import React from 'react';
import '../ToolBar.js';
import './Gsettings.css';
import { Link } from 'react-router-dom';
import user1 from '../../../media/ProfileImg1.jpg';
import user2 from '../../../media/Darwizzy.jpg';
import { useState } from 'react';

const Gsettings = () =>{
     const [isRemoveVisible] = useState(true);

     const handleRemoveClick = (event) => {          
               if (window.confirm("Are you sure you want to remove this member?")) {
                    event.target.parentNode.remove();
               }          
     };
     const handleAddMember = () => {
          console.log('Add Member clicked');
     };
     return (
          <div className="section">
               <Link to = "/canvas"><h3>X</h3></Link>
               <h2>Settings</h2>
               <div className="options">Members</div>
               <div className="UserPic-container"> 
              {isRemoveVisible && <div className="picitem" onClick={handleRemoveClick}>
                    <img className="UserPic" src={user1} width="50" height="50" alt=""></img> 
                    <div className="tool" >Remove</div>
               </div>
               }               
               {isRemoveVisible && <div className="picitem" onClick={handleRemoveClick}>
                    <img className="UserPic" src={user2} width="50" height="50" alt=""></img> 
                    <div className="tool" >Remove</div>
               </div>
               }
               {isRemoveVisible && <div className="picitem" onClick={handleRemoveClick}>
                    <img className="UserPic" src={user2} width="50" height="50" alt=""></img> 
                    <div className="tool" >Remove</div>
               </div>
               }
               {isRemoveVisible && <div className="picitem" onClick={handleRemoveClick}>
                    <img className="UserPic" src={user1} width="50" height="50" alt=""></img> 
                    <div className="tool" >Remove</div>
               </div>
               }
               {isRemoveVisible && <div className="picitem" onClick={handleRemoveClick}>
                    <img className="UserPic" src={user2} width="50" height="50" alt=""></img> 
                    <div className="tool" >Remove</div>
               </div>
               }
               {isRemoveVisible && <div className="picitem" onClick={handleRemoveClick}>
                    <img className="UserPic" src={user2} width="50" height="50" alt=""></img> 
                    <div className="tool" >Remove</div>
               </div>
               }
               </div>                           
               <div className="tool" onClick={handleAddMember}>Add +</div> 
               <div className="tool" >Make admin</div>               
               <div className="options" >Rename</div>
               <div className="options">Leave group</div>                              
               <div className="options">Delete group</div>
          </div>
     );
}

export default Gsettings;