import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Donut } from '../../model/donut.model';

@Component({
  selector: 'donut-form',
  template: `
  <form class="donut-form" #form="ngForm" *ngIf="donut; else loading">
    <label>
      <span>Name</span>
      <input
        type="text"
        name="name"
        class="input"
        required
        [ngModel]="donut.name"
        [ngModelOptions]="{updateOn:'blur'}"
        #name="ngModel"/>
      <ng-container *ngIf="name.invalid&&name.touched">
        <div class="donut-form-error" *ngIf="name.errors?.minlength">Minimum length of a name is 5</div>
        <div class="donut-form-error" *ngIf="name.errors?.required">Name is required</div>
      </ng-container>
    </label>
    <label>
      <span>Icon</span>
      <select
        name="icon"
        class="input input--select"
        minlength="5"
        required
        [ngModel]="donut.icon"
        #icon="ngModel"
      >
      <!-- <option *ngFor="let icon of icons" [ngValue]="icon" [text]="icon"></option> -->
      <option *ngFor="let icon of icons" [ngValue]="icon">{{icon}}</option>
      </select>
      <ng-container *ngIf="icon.invalid&&icon.touched">
        <div class="donut-form-error" *ngIf="icon.errors?.required">Icon is required</div>
      </ng-container>
    </label>
    <label>
      <span>Price</span>
      <input type="number" name="price" class="input" required [ngModel]="donut.price" #price="ngModel"/>
      <ng-container *ngIf="price.invalid&&price.touched">
        <div class="donut-form-error" *ngIf="price.errors?.required">Price is required</div>
      </ng-container>
    </label>
    <div class="donut-form-radios">
      <p class="donut-form-radios-label">Promo:</p>
      <label>
        <input type="radio" name="promo" [value]="undefined" [ngModel]="donut.promo"/>
        <span>None</span>
      </label>
      <label>
        <input type="radio" name="promo" value="new" [ngModel]="donut.promo"/>
        <span>New</span>
      </label>
      <label>
        <input type="radio" name="promo" value="limited" [ngModel]="donut.promo"/>
        <span>Limited</span>
      </label>
    </div>

    <label>
      <span>Description</span>
      <textarea name="description" class="input input--textarea" required [ngModel]="donut.description" #description="ngModel"></textarea>
      <ng-container *ngIf="description.invalid&&description.touched">
        <div class="donut-form-error" *ngIf="description.errors?.required">Description is required</div>
      </ng-container>
    </label>

    <button type="button" class="btn btn--green" *ngIf="!isEdit" (click)="handleCreate(form)">Create</button>
    <button type="button" class="btn btn--green" *ngIf="isEdit" [disabled]="form.untouched" (click)="handleUpdate(form)">Update</button>
    <button type="button" class="btn btn--red" *ngIf="isEdit" (click)="handleDelete()">Delete</button>
    <button type="button" class="btn btn--grey" *ngIf="form.touched||isEdit" (click)="form.resetForm(donut)">Clear</button>
    <div class="donut-form-working" *ngIf="form.valid&&form.submitted">
      Working...
    </div>
    <pre>{{donut|json}}</pre>
    <pre>{{form.value|json}}</pre>
  </form>
  <ng-template #loading >Loading...</ng-template>
  `,
  styles: [`
  .donut-form{
    &-radios{
      display:flex;
      align-content: center;
      &-label{
        margin-right:10px;
      }
      label{
        display:flex;
        align-items: center;
        span{
          color:#444;
          margin-bottom:0;
        }
      }
    }
    &-error{
      font-size: 12px;
      color:#e66262;
    }
    &-working{
      font-size:12px;
      font-style: italic;
      margin: 10px 0;
    }
  }
  `
  ]
})
export class DonutFormComponent implements OnInit{

  @Input() donut!:Donut;
  @Input() isEdit!:boolean;
  @Output() create = new EventEmitter<Donut>();
  @Output() update = new EventEmitter<Donut>();
  @Output() delete = new EventEmitter<Donut>();


  icons: string[] = [
    'caramel-swirl',
    'glazed-fudge',
    'just-chocolate',
    'sour-supreme',
    'strawberry-glaze',
    'vanilla-sundae',
    'zesty-lemon'
  ];

  ngOnInit(): void {

  }

  handleCreate(ngForm:NgForm){
    if(ngForm.valid){
      this.create.emit(ngForm.value);
    }else{
      ngForm.form.markAllAsTouched();//marca a todos como tocados en caunto da click para activar las validaciones
    }

  }

  handleUpdate(ngForm:NgForm){
    if(ngForm.valid){
      this.update.emit({id:this.donut.id,...ngForm.value});
    }else{
      ngForm.form.markAllAsTouched();//marca a todos como tocados en caunto da click para activar las validaciones
    }

  }

  handleDelete(){
    if(confirm(`Really delete ${this.donut.name}`)){
      this.delete.emit({id:this.donut.id,...this.donut});
    }

  }
}
