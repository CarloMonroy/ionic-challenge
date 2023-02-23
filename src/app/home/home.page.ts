import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  task: string = '';
  task2: string = '';
  isEditable: boolean = false;
  id: number = 0;
  itemId: number = 0;
  clickedIndex: number = 10000;
  i: number = 0;
  items: any = [];
  hideComponent: boolean = false;
  name: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('https://todolistapi-production-ffac.up.railway.app/registros')
      .subscribe((data) => {
        this.items = data;
        console.log(data);
      });
  }
  addTask(task: string) {
    task = task;

    const payload = new HttpParams().set('task', task);

    this.http
      .post(
        'https://todolistapi-production-ffac.up.railway.app/registros',
        payload
      )
      .subscribe((data) => {
        console.log(data);
        this.items = data;
      });

    this.task = '';
    window.location.reload();
  }

  deleteTask(id: number) {
    this.http
      .delete(
        `https://todolistapi-production-ffac.up.railway.app/registros/${id}`
      )
      .subscribe((data) => {
        console.log(data);
        this.items = data;
      });
  }

  async editTask(id: number, task: string) {
    const payload = new HttpParams().set('task', task);

    await this.http
      .patch<any>(
        `https://todolistapi-production-ffac.up.railway.app/registros/${id}`,
        payload
      )
      .subscribe((data) => {
        console.log(data);
        this.items = data;
      });
    this.endEditTask();
  }

  enableEdit(id: number) {
    this.isEditable = true;
    let task_id = id;
  }

  endEditTask() {
    this.isEditable = false;
    this.hideComponent = false;
  }

  clickedButton(id: number) {
    this.clickedIndex = id;
    this.hideComponent = true;
  }
}
