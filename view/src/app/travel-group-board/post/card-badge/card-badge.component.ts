import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card-badge',
  templateUrl: './card-badge.component.html',
  styleUrl: './card-badge.component.css'
})
export class CardBadgeComponent {
  @Input() planTypeId: number | undefined;

}
