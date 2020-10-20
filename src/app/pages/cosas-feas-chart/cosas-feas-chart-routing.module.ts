import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CosasFeasChartPage } from './cosas-feas-chart.page';

const routes: Routes = [
  {
    path: '',
    component: CosasFeasChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CosasFeasChartPageRoutingModule {}
