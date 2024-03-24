import React from 'react';
import '../ToolBar.js';
import './Gsettings.css';
import { Link } from 'react-router-dom';
import user1 from '../../../media/ProfileImg1.jpg';
import user2 from '../../../media/Darwizzy.jpg';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Gsettings = () =>{
     const [isRemoveVisible] = useState(true);
     const [open, setOpen] = useState(false);

     const handleRemoveClick = (event) => {          
               if (window.confirm("Are you sure you want to remove this member?")) {
                    event.target.parentNode.remove();
               }          
     };
     const handleAddMember = () => {
          console.log('Add Member clicked');
          setOpen(true);
     };
     return (
          <div className="section">
               <button className="closebtn"><Link to = "/canvas"><h3>x</h3></Link></button>
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
               <Button type="button" size="small" onClick={() => setOpen(true)} className="tool" >Add +</Button> 
               <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add member</DialogTitle>
                    <DialogContent>
                    <form onSubmit={handleAddMember}>
                        <TextField name="username" label="Username" size="small" className="event-input" />  
                    <DialogActions>                        
                        <Button type="reset" size="small" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" size="small">Save</Button>
                    </DialogActions>
                    </form>
                    </DialogContent>                    
               </Dialog>
               <button className="tool" >Make admin</button>               
               <div className="options" >Rename  <span className="Textfield"><input type="text" /><Button type="submit" size="small">Save</Button></span> </div>
               <button className="options">Leave group</button>                              
               <button className="options">Delete group</button>
          </div>
     );
}

export default Gsettings;