import { Component } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import { TooltipComponent } from "../../shared/components/tooltip/tooltip.component";

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [
    TranslatePipe,
    TooltipComponent
  ],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.scss'
})
export class ConnectComponent {
  tooltip = false;

  showTooltip() {
    this.tooltip = true;
  }

  hideTooltip() {
    this.tooltip = false;
  }
}
