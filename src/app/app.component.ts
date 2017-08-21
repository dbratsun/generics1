import { Component } from '@angular/core';
import { MockService } from './core/mock-backend/mock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  /*
  constructor(private mockService: MockService) {
    this.mockService.start();  
  }
  */
}
