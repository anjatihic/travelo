import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelGroupBoardComponent } from './travel-group-board.component';

describe('TravelGroupBoardComponent', () => {
  let component: TravelGroupBoardComponent;
  let fixture: ComponentFixture<TravelGroupBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelGroupBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TravelGroupBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
