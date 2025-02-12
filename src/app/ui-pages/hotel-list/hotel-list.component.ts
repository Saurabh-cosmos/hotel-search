import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


declare var bootstrap: any;


@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent {
  hotelData: any;
  selectedHotel: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.hotelData = history.state.data.message;
    console.log(this.hotelData);
  }

  openModal(hotel: any): void {
    this.selectedHotel = hotel;
    const modalElement = document.getElementById('hotelDetailsModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
