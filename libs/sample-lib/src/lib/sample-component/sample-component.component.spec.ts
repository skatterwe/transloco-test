import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleComponentComponent } from './sample-component.component';
import { TranslocoModule } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { getTranslocoModule } from '../transloco-testing.module';
import { By } from '@angular/platform-browser';

describe('SampleComponentComponent', () => {
  let component: SampleComponentComponent;
  let fixture: ComponentFixture<SampleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleComponentComponent, getTranslocoModule()],
    }).overrideComponent(SampleComponentComponent, {
      set: {
        imports: [TranslocoModule, CommonModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    }).compileComponents();

    fixture = TestBed.createComponent(SampleComponentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should find element in dom', () => {
    fixture.detectChanges();

    const elem = fixture.debugElement.query(By.css('h1'));
    expect(elem.nativeElement.textContent).toContain('Hello World!');
  })
});
