import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public constructor(private _titleService: Title ) { }

      public setTitle( newTitle: string) {
        this._titleService.setTitle( 'Foodle' );
      }
}
