import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CosasLindasChartPageRoutingModule } from './cosas-lindas-chart-routing.module';

import { CosasLindasChartPage } from './cosas-lindas-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CosasLindasChartPageRoutingModule
  ],
  declarations: [CosasLindasChartPage]
})
export class CosasLindasChartPageModule {}
