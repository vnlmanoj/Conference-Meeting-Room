import { Component } from '@angular/core';
import { AppService } from './app.service';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'room-bookings';
  showFiller = false;
  bookings = false;
  rooms = false;
  employees = false;
  premesis = false;
  services = false;
  bookinggranttext = "";
  bookinggranted = false;
  roomsData : any;
  roomscolumns: any;
  public readonly SelectionType = SelectionType;
  public readonly ColumnMode = ColumnMode;

  selected :any=[];

  constructor(private readonly appService:AppService){
    this.resetFlags();
    this.showRoomsModule();
    this.roomsData = [];
    this.defineColumns();
  }

  resetFlags(){
    this.bookings = false;
    this.rooms = false;
    this.employees = false;
    this.premesis = false;
    this.services = false;
  }

  showBookingsModule(){
    this.resetFlags();
    this.bookings = true;
  }

  showRoomsModule(){
    this.resetFlags();
    this.rooms = true;
    this.appService.get('/room/getallrooms').subscribe((response:any) => {
      this.roomsData = response;
    });
  }

  deleteRoom(){
    this.appService.delete('/room/deleteroom/'+this.selected[0].id).subscribe((response:any) => {
      alert("Deleted !!!");
    });
  }

  showEmployeeModule(){
    this.resetFlags();
    this.employees = true;
  }

  showPremesisModule(){
    this.resetFlags();
    this.premesis = true;
  }

  showServicesModule(){
    this.resetFlags();
    this.services = true;
  }

  toggleemployeebookinggrants(){
    this.bookinggranted = ! this.bookinggranttext;
    this.bookinggranttext = this.bookinggranted ? "Access grant for booking":"Remove grant for booking";
  }

  defineColumns(){
    this.roomscolumns = [{
      name: 'Type of Rooms',
      prop: 'typeOfRooms',
      flexGrow: 1,
      cellClass: 'left-aligned'
    },
    {
      name: 'Room name',
      prop: 'roomName',
      flexGrow: 1,
      cellClass: 'left-aligned'
    },
    {
      name: 'Video conference',
      prop: 'vedioConference',
      flexGrow: 1,
      cellClass: 'left-aligned'
    },
    {
      name: 'Capacity',
      prop: 'capacity',
      flexGrow: 1,
      cellClass: 'left-aligned'
    },
    {
      name: 'White Board',
      prop: 'whiteBoard',
      flexGrow: 1,
      cellClass: 'left-aligned'
    },
    {
      name: 'Round Table',
      prop: 'roundTable',
      flexGrow: 1,
      cellClass: 'left-aligned'
    },
    {
      name: 'Floor',
      prop: 'floor',
      flexGrow: 1,
      cellClass: 'left-aligned'
    },
    {
      name: 'Available',
      prop: 'available',
      flexGrow: 1,
      cellClass: 'left-aligned'
    }];
  }
  
}
