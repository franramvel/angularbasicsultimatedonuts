import { DonutService } from './../../services/donut.service';
import { Component, OnInit } from '@angular/core';
import { Donut } from '../../model/donut.model';

@Component({
  selector: 'donut-list',
  template: `
    <div>
      <div class="donut-list-actions">
        <a routerLink="new" class="btn btn--green">
          New Donut
          <img src="/assets/img/icon/plus.svg">
        </a>
      </div>

      <ng-container *ngIf="donuts?.length; then cards; else nothing" >

      </ng-container>
      <ng-template #cards>
        <donut-card
        *ngFor="let donut of donuts "
        [donut]="donut"></donut-card>
      </ng-template>
      <ng-template #nothing>
        No donuts here...
      </ng-template>
    </div>
  `,
  styles: [
    `
    .donut-list{
      &-actions{
        margin-bottom:10px;
      }
    }
    `
  ]
})
export class DonutListComponent implements OnInit {

  donuts!:Donut[]

  /**
   *
   */
  constructor(private donutService:DonutService) {

  }
  ngOnInit(): void {
    this.donutService.read().subscribe((donuts:Donut[])=>{
      this.donuts=donuts
    });
  }

  trackBy(index:number, value:Donut){
    console.log(index,value)
  }
}
