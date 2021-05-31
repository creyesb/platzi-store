import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { ProductDetailComponent } from './product/components/product-detail/product-detail.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminGuard } from './admin.guard';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'contacto',
        canActivate: [AdminGuard],
        loadChildren: () =>
          import('./contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'productos',
        canActivate: [AdminGuard],
        loadChildren: () =>
          import('./product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'productos/:id',
        component: ProductDetailComponent
      },
      {
        path: 'demo',
        canActivate: [AdminGuard],
        loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)
      }
    ]
  },
  {
    path: '**',
    loadChildren: () =>
      import('./page-not-found/page-not-found.module').then(
        m => m.PageNotFoundComponentModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
