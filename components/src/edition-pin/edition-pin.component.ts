import { Component, OnInit, Input } from '@angular/core';

/**
 * _Note:_ Set style to its container
 * ```
 * position: relative;
 * ````
 */
@Component({
  selector: 'ngbiz-edition-pin',
  templateUrl: './edition-pin.component.html',
  styleUrls: ['./edition-pin.component.scss'],
})
export class EditionPinComponent implements OnInit {
  @Input() mode!: string;
  constructor() {}
  ngOnInit(): void {}
}
