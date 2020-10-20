import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CosasLindasChartPage } from './cosas-lindas-chart.page';

describe('CosasLindasChartPage', () => {
  let component: CosasLindasChartPage;
  let fixture: ComponentFixture<CosasLindasChartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosasLindasChartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CosasLindasChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
