import { Component, OnInit } from '@angular/core';
import { PmService } from 'src/app/services/pm.service';

@Component({
  selector: 'app-pm',
  templateUrl: './pm.component.html',
  styleUrls: ['./pm.component.css']
})
export class PmComponent implements OnInit {

  board: string;
  errorMessage: string;

  constructor(
    private pm: PmService
  ) { }

  ngOnInit() {
    this.pm.getPm().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

}
