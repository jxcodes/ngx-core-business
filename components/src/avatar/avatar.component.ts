import { Component, HostBinding, Input } from '@angular/core';
@Component({
  selector: 'ngbiz-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() src: string | undefined;
  @Input() size: number = 32;
  @HostBinding('style.height.px') get height() { return this.size; }
  @HostBinding('style.width.px') get width() { return this.size; }
  getAvarType() {
    if (this.src) {
      return 'image';
    }
    return 'text';
  }
}
