import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from './api.service';
import { List } from './Model/List';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'to-do-list';
  dataSource: any[] = [];
  displayedColumns: string[] = ['date', 'details', 'action'];
  todolist: FormGroup;
  dateEntered: string = "";
  detailsEntered: string = "";
  dialogRef: any;
  selectedId: string;

  // dataSource = ELEMENT_DATA;
  constructor(private apiService: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.getAllDetails();
    this.todolist = new FormGroup({
      date: new FormControl(''),
      detail: new FormControl('')
    });
  }
  getAllDetails() {
    this.apiService.gettodolist().subscribe(data => {
      this.dataSource = data;
    })
  }
  AddToDoList(template: any) {
    this.dialogRef = this.dialog.open(template, {
      height: '400px',
      width: '600px',
    });
  }
  AddItemsInToDoList() {
    //console.log(this.dateEntered);
    //console.log(this.todolist.getRawValue());
    let objToDoList: List = this.todolist.getRawValue();
    this.apiService.addtodolist(objToDoList).subscribe(data => {

    });
    this.openSnackBar("Successfully added todo item");
    this.getAllDetails();
    this.dialogRef.close();
    this.todolist.reset();
  }
  deleteToDoList(id: any) {
    console.log(id);
    this.apiService.deletetodolist(id).subscribe(result => {
      console.log(result);
    });
    this.openSnackBar('Successfully deleted todo item');
    this.getAllDetails();
  }
  openSnackBar(message: any) {
    this.snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'

    })
  }
  updateToDoList(id: any, template: any) {
    this.selectedId = '';
    this.dialogRef = this.dialog.open(template);
    this.selectedId = id;
    this.apiService.getsingletodolist(this.selectedId).subscribe((data) => {
      this.dateEntered = data.date;
      this.detailsEntered = data.detail;

    });
  }
  updateItemsInToDoList() {
    let objToDoList = new List();
    objToDoList.date = this.dateEntered;
    objToDoList.detail = this.detailsEntered;
    this.apiService.updatetodolist(this.selectedId, objToDoList).subscribe(data => {

    });
    this.openSnackBar("Successfully Updated todo item");
    this.getAllDetails();
    this.dialogRef.close();
    this.todolist.reset();
  }
  closeToDoDialog() {
    this.dialogRef.close();
    this.todolist.reset();
  }
}
