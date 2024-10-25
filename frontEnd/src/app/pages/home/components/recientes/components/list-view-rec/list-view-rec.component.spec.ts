import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewRecComponent } from './list-view-rec.component';

describe('ListViewRecComponent', () => {
  let component: ListViewRecComponent;
  let fixture: ComponentFixture<ListViewRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListViewRecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListViewRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
