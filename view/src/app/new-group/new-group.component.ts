import { Component } from '@angular/core';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrl: './new-group.component.css'
})
export class NewGroupComponent {
  imageUrl: string = '';

  onUrlChange() {
    if(this.isValidUrl(this.imageUrl)) {
      console.log('Valid URL: ', this.imageUrl);
    }else {
      console.log('Invalid URL: ', this.imageUrl)
    }
  }

  isValidUrl(url: string): boolean {
    try{
      new URL(url)
      return true;
    } catch (_) {
      return false;
    }
  }
}
