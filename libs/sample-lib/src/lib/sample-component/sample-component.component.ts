import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-sample-component',
  standalone: true,
  imports: [CommonModule, TranslocoDirective],
  templateUrl: './sample-component.component.html',
})
export class SampleComponentComponent {}
