import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CosasFeasChartPage } from './cosas-feas-chart.page';

describe('CosasFeasChartPage', () => {
  let component: CosasFeasChartPage;
  let fixture: ComponentFixture<CosasFeasChartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosasFeasChartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CosasFeasChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
