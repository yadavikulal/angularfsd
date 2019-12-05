import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcatalogueComponent } from './productcatalogue.component';

describe('ProductcatalogueComponent', () => {
  let component: ProductcatalogueComponent;
  let fixture: ComponentFixture<ProductcatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductcatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductcatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
