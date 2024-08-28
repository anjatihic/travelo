import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card-link',
  templateUrl: './card-link.component.html',
  styleUrl: './card-link.component.css'
})
export class CardLinkComponent {
  @Input() url: string = '';

}
