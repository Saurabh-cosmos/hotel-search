import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.scss']
})
export class HotelSearchComponent implements OnInit {
  searchForm!: FormGroup;
  submitLoader:boolean = false;
  unsubscribe = new Subject();
  today = new Date();
  constructor(
    private fb: FormBuilder,
  private api:ApiService,
    private router: Router
) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      location: ['SIN', Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
      passengerCount: [1, [Validators.required, Validators.min(1)]],
      roomsCount: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      let checkin = formatDate(this.searchForm.value.fromDate, 'dd-MM-yyyy', 'en-US')
      let checkout = formatDate(this.searchForm.value.toDate, 'dd-MM-yyyy', 'en-US')
      let body = {
        location: this.searchForm.value.location,
        checkin_date: checkin,
        checkout_date: checkout,
        rooms: this.searchForm.value.roomsCount,
        guests: this.searchForm.value.passengerCount
      }
      this.submitLoader = true;
      this.api.getHotelInfo(body).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/availability'], { state: { data: res } });  
        },
        error:(err) => {},
        complete: () => {
          this.submitLoader = false;
        }
      });
      
    }else{
      this.searchForm.markAllAsTouched();
    }
  }

  getCheckOutMinDate(): Date {
    return this.searchForm.value.fromDate > this.today ? this.searchForm.value.fromDate : this.today;
  }
  
  ngOnDestroy(){
    this.unsubscribe.unsubscribe();
  }
}