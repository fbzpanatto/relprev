import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from "./components/form/form.component";
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, FormComponent]
})
export class AppComponent {

  title = 'relprev';

  condition!: boolean

  #mobileQueryListener: (() => void) | undefined;
  #mobileQuery!: MediaQueryList;

  constructor(
    private responsive: BreakpointObserver,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    this.#mobileQuery = media.matchMedia('(max-width: 960px)')
    this.#mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.#mobileQuery.addEventListener('change', this.#mobileQueryListener);

    this.setBreakpointObserver()
  }

  setBreakpointObserver() {

    const maxWidth728 = '(max-width: 728px)'
    const minWidth728 = '(min-width: 728px)'

    this.responsive
      .observe([maxWidth728, minWidth728])
      .subscribe(result => {
        const breakpoints = result.breakpoints;
        const isMaxWidth728 = breakpoints[maxWidth728]
        const isMinWidth728 = breakpoints[minWidth728]

        this.condition = !isMinWidth728 && isMaxWidth728
      });
  }
}
