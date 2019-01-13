import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationComponent } from './presentation/presentation.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { MenuShortcutComponent } from '../../../../apps/codelab/src/app/codelabs/components/menu-shortcut/menu-shortcut.component';
import { ClosingSlideComponent } from './closing-slide/closing-slide.component';
import { AnalyticsService } from './analytics.service';
import { HammerGestureConfig } from '@angular/platform-browser';

// export class MyHammerConfig extends HammerGestureConfig {
//   overrides = {
//     stop_browser_behavior: false,
//     cssProps: {
//       userSelect: 'auto',
//     },
//   }
// }


@NgModule({
  declarations: [
    PresentationComponent,
    ProgressBarComponent,
    MenuShortcutComponent,
    ClosingSlideComponent
  ],
  exports: [
    PresentationComponent,
    ProgressBarComponent,
    MenuShortcutComponent,
    ClosingSlideComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    AnalyticsService
  ],
  bootstrap: []
})
export class PresentationModule {

}
