import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Persona } from './../../models/persona';

@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./plantilla.component.scss']
})
export class PlantillaComponent implements OnInit {
  @Input('personas') personas: Array< Persona > ;

  constructor( public route: ActivatedRoute ) { }

  ngOnInit() {
  }

}
