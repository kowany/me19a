import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit {

  @Input() doughnutChartLabels: string[];
  @Input() doughnutChartData: number[];
  @Input() doughnutChartType: string;
  @Input() doughnutChartColors: any[];

  constructor() { }

  ngOnInit() {
  }

}
