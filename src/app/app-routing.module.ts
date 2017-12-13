import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const rootRoutes: Routes = [
  {
    path: '',

  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(rootRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
