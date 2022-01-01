import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';
import {delay} from 'rxjs/operators'


export interface PeriodicElement {
  name: string;
  positions: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {positions: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {positions: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {positions: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {positions: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'AngMaterial';
  val=''
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];

  @ViewChild(MatSidenav) matSideNav:MatSidenav
  constructor(private observer:BreakpointObserver,private dial:MatDialog){}
  ngAfterViewInit(){
    this.observer.observe('(max-width : 800px)').pipe(delay(0)).subscribe((data) =>{
      if(data.matches){
        this.matSideNav.mode="over"
        this.matSideNav.close();
      }else{
        this.matSideNav.mode="side";
        this.matSideNav.open();
      }
      
    })
  }
  openDialog(){
     let ref= this.dial.open(MatDialogueComponent,{data: {name: 'this.name', animal: 'this.animal'}})
     ref.afterClosed().subscribe((data) =>{console.log(data)})
  }
}

import { OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogue',
  template: `
  <h1 mat-dialog-title>Hi {{data.name}}</h1>
<div mat-dialog-content>
  <p>What's your favorite animal?</p>
</div>
<div mat-dialog-actions>
  <button mat-button mat-dialog-close="close">No Thanks</button>
  <button mat-button mat-dialog-close>Ok</button>
</div>
  `
})

export class MatDialogueComponent implements OnInit {
  constructor( @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() { }
}