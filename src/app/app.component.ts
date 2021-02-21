import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertComponent } from './alert/alert.component';
import '@webcomponents/custom-elements';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  content = null;

  constructor(injector: Injector, domSanitizer: DomSanitizer) {
    const AlertElement = createCustomElement(AlertComponent, {injector: injector});
    customElements.define('my-alert', AlertElement);

    setTimeout(() => {
      this.content = domSanitizer.bypassSecurityTrustHtml(
        `<p>This is a static test!</p>
        <hr>
        <p>Here should be alert:</p>
        <br>
        <my-alert message="This is a simple message rendered dynamically!"></my-alert>`);
    }, 1000);
  }
}
