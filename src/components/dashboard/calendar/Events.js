import './EventCalendar.css';
import './Events.css';
import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const Events = ({ selectedDate }) => {
    const [open, setOpen] = useState(false);
    const [events, setEvents] = useState([]);

    const handleAddEvent = (event) => {
        event.preventDefault();
        const title = event.target.title.value;

        setEvents([...events, { title, date: selectedDate }]);
        event.target.reset();

        setOpen(false);
    };

    const [tags, setTags] = useState([]);

    const handleTags = () => {
        const newTag = prompt('Enter a new tag');
        if (newTag) {
            setTags([...tags, newTag]);
        }
    };

    return (
        <div className="event">
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add event</DialogTitle>
                    <DialogContent>
                    <form onSubmit={handleAddEvent}>
                        <TextField name="title" label="Title" size="small" className="event-input" />            
                        <div className="tag" onClick={handleTags}>+ Add tags</div>
                    <DialogActions>                        
                        <Button type="reset" size="small" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" size="small">Save</Button>
                    </DialogActions>
                    </form>
                    </DialogContent>
                    
            </Dialog>
            <Button type="button" size="small" onClick={() => setOpen(true)}>Add Event</Button>            

            {events.map((event, index) => ( 
                <div key={index} className="event-item">
                    <h4>{event.title}</h4>
                    <p>{event.date ? event.date.format('DD-MM-YY') : ''}</p>
                </div>
            ))}


        </div>
    );
}

export default Events;
