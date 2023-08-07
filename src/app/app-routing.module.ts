import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IzipayComponent } from './pages/izipay/izipay.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  
  {
    path: '',
    component: MenuComponent,
    
  },
  {
    path: 'izipay',
    component: IzipayComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
