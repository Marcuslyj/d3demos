import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VDraggerComponent } from './v-dragger.component';

describe('VDraggerComponent', () => {
  let component: VDraggerComponent;
  let fixture: ComponentFixture<VDraggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VDraggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VDraggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
