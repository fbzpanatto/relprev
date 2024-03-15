import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
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

  minWidth728 = false
  maxWidth728 = true

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
  }

  ngOnInit(): void {
    this.setBreakpointObserver()
  }

  setBreakpointObserver() {

    const minWidth728 = '(min-width: 728px)'
    const maxWidth728 = '(max-width: 728px)'

    this.responsive
      .observe([minWidth728, maxWidth728])
      .subscribe(result => {
        const breakpoints = result.breakpoints;

        this.minWidth728 = breakpoints[minWidth728];
        this.maxWidth728 = breakpoints[maxWidth728];

        console.log('menor que 728', this.maxWidth728, 'maior que 728', this.minWidth728)

        const condition = !this.minWidth728 && this.maxWidth728

        console.log('condition', condition)
      });
  }
}
