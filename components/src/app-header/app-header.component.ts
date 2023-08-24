import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngbiz-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {

  @Output() menuButtonClick = new EventEmitter();
  @Output() logoutButtonClick = new EventEmitter();
  @Input() appName: string = '';
  @Input() userName: string = '';
  @Input() roleName: string = '';
  @Input() logoutText: string = 'Close session';

}
