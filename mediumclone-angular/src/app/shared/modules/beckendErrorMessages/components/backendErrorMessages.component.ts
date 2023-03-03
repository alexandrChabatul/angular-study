import { Component, Input, OnInit } from '@angular/core';
import { BackedErrorsInterface } from 'src/app/shared/types/backenErrors.interface';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.component.scss'],
})
export default class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: BackedErrorsInterface;

  errorMessages: string[];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps).map((name) => {
      const messages = this.backendErrorsProps[name].join(', ');
      return `${name} ${messages}`;
    });
  }
}
