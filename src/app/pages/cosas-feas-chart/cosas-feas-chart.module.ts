import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CosasFeasChartPageRoutingModule } from './cosas-feas-chart-routing.module';

import { CosasFeasChartPage } from './cosas-feas-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CosasFeasChartPageRoutingModule
  ],
  declarations: [CosasFeasChartPage]
})
export class CosasFeasChartPageModule {}
