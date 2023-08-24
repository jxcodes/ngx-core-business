import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxKitBusinessComponent } from './ngx-kit-business.component';

describe('NgxKitBusinessComponent', () => {
  let component: NgxKitBusinessComponent;
  let fixture: ComponentFixture<NgxKitBusinessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxKitBusinessComponent]
    });
    fixture = TestBed.createComponent(NgxKitBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
