import { Component, Input } from '@angular/core';
import { FiltersContainerComponent } from '../filters-container.component';
import { CollectionFilter } from 'ngx-kit-business/types';

@Component({
  selector: 'ngbiz-list-toolbar',
  templateUrl: './list-toolbar.component.html',
  styleUrls: ['./list-toolbar.component.scss'],
  //host: { class: 'flex-column flex-md-row align-items-md-center' },
})
export class ListToolbarComponent extends FiltersContainerComponent {
  @Input() searchDebounceTime = 500;
  override searchFilter: CollectionFilter = { id: '_query', type: 'string', field: '_query', operator: '~' };
}
