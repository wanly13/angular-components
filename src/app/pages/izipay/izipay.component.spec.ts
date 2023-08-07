import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzipayComponent } from './izipay.component';

describe('IzipayComponent', () => {
  let component: IzipayComponent;
  let fixture: ComponentFixture<IzipayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzipayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IzipayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
