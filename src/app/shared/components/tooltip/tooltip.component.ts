import {Component, Input, input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
  standalone: true,
})
export class TooltipComponent implements OnInit {

  @Input() tooltip: boolean | undefined;
  constructor() { }

  ngOnInit() {
  }

}
