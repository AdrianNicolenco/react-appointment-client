import React, { useState }from 'react'
import { useSelector } from 'react-redux'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useSnackbar } from 'notistack'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

import AddDialog from './customer/addDialog'

const MyCalendar = (props) => {
  
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [selectable, setSelectable] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const businessEmail = useSelector((state) => state.UserReducerState.businessEmail);
  const businessAppointment = useSelector((state) => state.UserReducerState.businessAppointment);
  
  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  const handleDateSelect = (event) => {
    let calendarApi = event.view.calendar;
    if(businessEmail === '') {
      enqueueSnackbar("Please Select Business", {variant: 'warning', autoHideDuration: 1000})
      calendarApi.unselect()
      return;
    }
    setOpen(true);
    setData(event);
  }

  const handleEventClick = (event) => {
    console.log("eventClicked")
    console.log(event);
  }

  const handleEventAdd = (event) => {
    console.log("HandleEventadd")
    console.log(event)
  }

  const handleEventChange = (event) => {
    console.log("EvnetChange")
    console.log(event);
  }

  const dialogClose = () => {
    setOpen(false);
  }

  return (
    <div style={{width:'70%', marginTop:'8%',}} >
        <FullCalendar
        schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'      
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin]}
        initialView='resourceTimelinePlugin'
        aspectRatio='2'
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        selectAllow={
          
          (selectInfo)=> (
            businessAppointment.forEach((value, index)=>{
              if(index === 3) {
                
                let businessStart = new Date(value.start).getTime()
                let businessEnd = new Date(value.end).getTime()
                let selectStart = new Date(selectInfo.start).getTime()
                let selectEnd = new Date(selectInfo.end).getTime()
                console.log()
                if((selectEnd > businessStart && selectStart < businessStart) || 
                   (selectStart > businessEnd && selectEnd < businessEnd))
                  setSelectable(false)
              }
                //return false
            }),
            selectInfo.start > new Date() ? selectable & true : selectable & false
          )
        }
        initialView='dayGridMonth'
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={handleDateSelect}
        allDaySlot={false}
        events={businessAppointment}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventAdd={handleEventAdd}
        eventChange={handleEventChange}
        />
        <AddDialog open={open} dialogClose={dialogClose} data={data}/>
    </div>
  )
}

export default MyCalendar;
