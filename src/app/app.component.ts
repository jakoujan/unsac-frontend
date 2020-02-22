import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastService } from './services/toast.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  url: string;
  ws: string;

  constructor(public toastService: ToastService) {}

  ngOnInit() {
  }

}
