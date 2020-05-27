import { Component } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService } from '../../../shared-ng/services/request.service';

@Component({
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent {
  departments: any = [];

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    // get departments data
    this.requestService.get('/pages/departments', (data) => {
      this.departments = data.departments;
    });
  }
}
