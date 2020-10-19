import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() back: boolean;

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {}

  logout() {
    this.authSvc.logout();
    this.router.navigate(['login']);
  }
}
