import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CosasLindasChartPage } from './cosas-lindas-chart.page';

const routes: Routes = [
  {
    path: '',
    component: CosasLindasChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CosasLindasChartPageRoutingModule {}
