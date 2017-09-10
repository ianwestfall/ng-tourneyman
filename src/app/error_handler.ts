import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class TopLevelErrorHandler implements ErrorHandler {
  constructor(private injector: Injector){}

  handleError(error){
    let toastr = <ToastsManager>this.injector.get(ToastsManager);

    setTimeout(() => {
      console.error(error);
      toastr.error(error.message || error, null);
    });
  }
}
