import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaseLeaveComponent } from './please-leave.component';

describe('PleaseLeaveComponent', () => {
  let component: PleaseLeaveComponent;
  let fixture: ComponentFixture<PleaseLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PleaseLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PleaseLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
