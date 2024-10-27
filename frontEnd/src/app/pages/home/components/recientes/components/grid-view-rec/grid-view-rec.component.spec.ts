import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridViewRecComponent } from './grid-view-rec.component';

describe('GridViewRecComponent', () => {
  let component: GridViewRecComponent;
  let fixture: ComponentFixture<GridViewRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridViewRecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridViewRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
