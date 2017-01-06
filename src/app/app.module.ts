import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';

// TODO: this should go in a shared module. 
import { DomSanitizer } from '@angular/platform-browser'
@Pipe({ name: 'escapeHtml', pure: false })
export class EscapeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) { }
    transform(value: any, args: any[] = []) {       
        // simple JS inj cleanup that should be done on server side primarly
        if (value.indexOf('<script>') != -1) {
            console.log('JS injection. . . html purified');
            return value.replace('<script>', '').replace('<\/script>', '');
        }
        return this.sanitized.bypassSecurityTrustHtml(value); // so ng2 does not remove CSS
    }
}
// End

@NgModule({
    declarations: [
        AppComponent,
        DemoComponent,
        EscapeHtmlPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            {
                path: 'Demo', component: DemoComponent
            },
            { //default
                path: '', redirectTo: 'Demo', pathMatch: 'full'
            },
            { // not found
                path: '**', component: DemoComponent // will have a page not found component
            }
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
