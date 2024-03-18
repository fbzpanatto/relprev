import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from "./components/form/form.component";
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { HeaderComponent } from "./components/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles/general.scss'],
  imports: [RouterOutlet, FormComponent, HeaderComponent, CommonModule]
})
export class AppComponent {

  title = 'relprev';

  typeOfMedia = ''

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

    const breakpointsArray = [Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]

    this.responsive
      .observe(breakpointsArray)
      .subscribe(result => {

        const breakpoints = result.breakpoints;

        if (breakpoints[Breakpoints.XSmall]) { this.typeOfMedia = 'xsmall' }

        if (breakpoints[Breakpoints.Small]) { this.typeOfMedia = 'small' }

        // if (breakpoints[Breakpoints.Medium]) { this.typeOfMedia = 'medium' }

        if (
          breakpoints[Breakpoints.Medium] ||
          breakpoints[Breakpoints.Large ||
          Breakpoints.XLarge]) { this.typeOfMedia = 'xlarge' }
      });
  }
}
