import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'ngbiz-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {
  @Output() menuButtonClick = new EventEmitter();
  @Output() logoutButtonClick = new EventEmitter();
  @Input() appName: string = '';
  @Input() user: User | null = null;
  @Input() logoutText: string = 'Logout';
  @Input() @HostBinding('style.height.px') height: number = 36;
  showMenu: boolean = false;
  avatarSize: number = 24;
}
