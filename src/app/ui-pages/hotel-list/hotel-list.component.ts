import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit, OnDestroy {
  hotelData: any;
  selectedHotel: any;
  hotelsToShow: any[] = [];
  hotelsPerPage = 10;
  isLoading: boolean = true;
  isLoadingMore: boolean = false;

  @ViewChild('loadMore', { static: false }) loadMore!: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.hotelData = history.state.data.message;
    setTimeout(() => {
      this.hotelsToShow = this.hotelData.hotels.slice(0, this.hotelsPerPage);
      this.isLoading = false;
    }, 2000); // Simulate a 2-second delay
  }

  loadMoreHotels(): void {
    this.isLoadingMore = true;
    setTimeout(() => {
      const currentLength = this.hotelsToShow.length;
      const moreHotels = this.hotelData.hotels.slice(currentLength, currentLength + this.hotelsPerPage);
      this.hotelsToShow = [...this.hotelsToShow, ...moreHotels];
      this.isLoadingMore = false;
      if (this.hotelsToShow.length === this.hotelData.hotels.length) {
        this.loadMore.nativeElement.style.display = 'none';
      }
    }, 2000); // Simulate a 2-second delay before loading more data
  }

  openModal(hotel: any): void {
    this.selectedHotel = hotel;
    const modalElement = document.getElementById('hotelDetailsModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  ngOnDestroy(): void {
    // Clean up if necessary
  }
}