import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ngbiz-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['./text-filter.component.scss']
})
export class TextFilterComponent {
  @Input() debounceTime: number = 500;
  @Input() placeholder: string = "Buscar";
  value: string = '';
  // Se usa valueChange porque change produce un error.
  @Output() valueChange: EventEmitter<string> = new EventEmitter();
  private searchBoxObs = new Subject<string>();
  public searchBox = this.searchBoxObs.asObservable();

  constructor() {
    const me = this;
    me.searchBox.pipe(debounceTime(me.debounceTime)).subscribe((word) => {
      me.fireEvent(word);
    });
  }

  /**
   * Called when searchbox value changes.
   * @param e
   */
  onSearchValueChange(e: any) {
    let value = (e.value || '').trim();
    if (this.debounceTime > 0) {
      this.searchBoxObs.next(value);
      return;
    }
    this.fireEvent(value);
  }
  fireEvent(value: string) {
    this.valueChange.emit(value);
  }
  clearText() {
    this.value = '';
    this.fireEvent('');
  }
}
