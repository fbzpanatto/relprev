import { Component, ChangeDetectorRef, OnInit, signal } from '@angular/core';
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
export class AppComponent implements OnInit {
  title = 'relprev';

  isMaxWidth728 = false

  #mobileQueryListener: (() => void) | undefined;
  #mobileQuery!: MediaQueryList;

  constructor(
    private responsive: BreakpointObserver,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    this.#mobileQuery = media.matchMedia('(max-width: 728px)')
    this.#mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.#mobileQuery.addEventListener('change', this.#mobileQueryListener);
  }

  ngOnInit(): void { this.setBreakpointObserver() }

  setBreakpointObserver() {

    const maxWidth728 = '(max-width: 728px)'

    this.responsive
      .observe([maxWidth728])
      .subscribe(result => {
        const breakpoints = result.breakpoints;
        this.isMaxWidth728 = breakpoints[maxWidth728]
      });
  }
}
