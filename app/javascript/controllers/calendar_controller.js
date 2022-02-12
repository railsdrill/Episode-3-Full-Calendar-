// Visit The Stimulus Handbook for more details 
// https://stimulusjs.org/handbook/introduction
// 
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus"
import Rails from "@rails/ujs"
const Calendar = window["FullCalendar"]
export default class extends Controller {
static targets =["calendar"]

deleteEvent(){
  this.calendar.on('eventClick', function (info) {
    info.jsEvent.preventDefault()

    info.event.remove()
    Rails.ajax({
      type: "DELETE",
      url: '/events/'+ info.event.id,
    })
    
  })
}

calendarDrag(){
  this.calendar.on('eventDrop',function(info){
    var formUpdate = new FormData()
    formUpdate.append("event[start]", info.event.start)
    formUpdate.append("event[end]", info.event.end)
    console.log(formUpdate)
    Rails.ajax({
      type: "PATCH",
      url: '/events/'+ info.event.id,
      data: formUpdate
      })

  })

};

  connect() {
    this.calendar = new Calendar.Calendar(this.calendarTarget, {
      initialView: 'dayGridMonth',
      editable: true,
      droppable: true,
      events: '/events.json'
    })
this.calendar.render();
this.calendarDrag();
this.deleteEvent()
  }
}
