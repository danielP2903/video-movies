import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastContainerComponent } from 'src/app/components/toast-container/toast-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ToastContainerComponent],
  imports: [
    CommonModule,
    NgbModule,

  ],
  exports:[ToastContainerComponent,NgbModule]
})
export class SharedModule { }
