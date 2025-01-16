import { Component, HostBinding, Input } from '@angular/core';
@Component({
  selector: 'ngbiz-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: false
})
export class AvatarComponent {
  @Input() src: string | undefined;
  @Input() name: string | undefined;
  @Input() size: number = 32;
  @HostBinding('style.height.px') get height() { return this.size; }
  @HostBinding('style.width.px') get width() { return this.size; }
  getAvarType() {
    if (this.src) {
      return 'image';
    }
    return 'text';
  }
  getInitials() {
    if (this.name) {
      const names = this.name.split(' ');
      let initials = '';
      names.forEach((name) => {
        initials += name[0];
      });
      return initials;
    }
    return '';
  }
}
