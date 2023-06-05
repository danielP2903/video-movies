import { Component, TemplateRef } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss']
})
export class ToastContainerComponent {

  constructor(public toastService: ToastService) {}

  isTemplate(toast:any) {
		return toast.textOrTpl instanceof TemplateRef;
	}
}
