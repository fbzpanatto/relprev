import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, type OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../../../styles/general.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  typeOfMedia = input('')

  ngOnInit(): void { }

}
