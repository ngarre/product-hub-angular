import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionProducto } from './edicion-producto';

describe('EdicionProducto', () => {
  let component: EdicionProducto;
  let fixture: ComponentFixture<EdicionProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicionProducto],
    }).compileComponents();

    fixture = TestBed.createComponent(EdicionProducto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
