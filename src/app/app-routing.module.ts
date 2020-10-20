import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from './guards/check-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [CheckLoginGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'cosas-lindas',
    loadChildren: () => import('./pages/cosas-lindas/cosas-lindas.module').then( m => m.CosasLindasPageModule)
  },
  {
    path: 'cosas-feas',
    loadChildren: () => import('./pages/cosas-feas/cosas-feas.module').then( m => m.CosasFeasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
