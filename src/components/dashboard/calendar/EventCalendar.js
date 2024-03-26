import './EventCalendar.css';
import Events from './Events.js';
import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const EventCalendar = () => {
     const [selectedDate, setSelectedDate] = useState(null);
          return (
          <div className="cal">
               <span className="calendar">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                         <StaticDatePicker
                              orientation="portrait"
                              onChange={(date) => {
                                   setSelectedDate(date);
                              }}
                         />                   
                    </LocalizationProvider>                       
               </span>  
          <Events selectedDate={selectedDate} /> 
          </div> 
     )
}
export default EventCalendar;