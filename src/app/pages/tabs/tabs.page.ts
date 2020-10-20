import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  changeColor: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  cambio(e): void {
    if(e.tab === 'charts') {
      this.changeColor = true;
    } else {
      this.changeColor = false;
    }
  }
}
