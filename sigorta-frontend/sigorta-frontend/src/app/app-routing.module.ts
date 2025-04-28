import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigortaFormComponent} from './components/sigorta-form/sigorta-form.component';

const routes: Routes = [
  { path: '', component: SigortaFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
