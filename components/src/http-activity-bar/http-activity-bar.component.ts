import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { HttpActivityService } from './http-activity.service';

@Component({
    selector: 'ngbiz-http-activity-bar',
    templateUrl: './http-activity-bar.component.html',
    styleUrls: ['./http-activity-bar.component.scss'],
    standalone: false
})
export class HttpActivityBarComponent implements OnInit {
  @HostBinding('style.z-index')
  @Input() zIndex: number = 1;
  active: boolean = false;
  constructor(private service: HttpActivityService) { }

  ngOnInit(): void {
    const me = this;
    me.service.statusChange.subscribe((active) => {
      setTimeout(() => {
        me.active = active;
      }, 0);
    });
  }
}
