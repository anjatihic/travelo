import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelGroupService } from "../service/travel-group.service";

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {
  imageUrl: string = '';

  // Properties for ngModel
  name: string = '';
  tripStart: Date | null = null;
  tripEnd: Date | null = null;
  description: string = '';
  image: string = '';

  submitted = false;
  isSuccessful = false;
  isSubmitFailed = false;
  errorMessage = '';

  constructor(private router: Router, private travelGroupService: TravelGroupService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted = true;

    if (!this.name || !this.tripStart || !this.tripEnd) {
      return;
    }

    const { name, tripStart, tripEnd, description, image } = this;

    this.travelGroupService.createNewTravelGroup({ name, tripStart, tripEnd, description, image }).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.router.navigate(['/travelGroup/' + data.id]);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSubmitFailed = true;
      }
    });
  }

  onUrlChange(): void {
    if (this.isValidUrl(this.imageUrl)) {
      console.log('Valid URL: ', this.imageUrl);
    } else {
      console.log('Invalid URL: ', this.imageUrl);
    }
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  // Method to handle date input changes
  onDateChange(dateString: string, isStart: boolean): void {
    const date = dateString ? new Date(dateString) : null;
    if (isStart) {
      this.tripStart = date;
    } else {
      this.tripEnd = date;
    }
  }
}
