import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TituloService } from '../../services/titulo.service';
import { TituloDto } from '../../models/titulo.model';

@Component({
  selector: 'app-titulos-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule, MatToolbarModule],
  templateUrl: './titulos-list.component.html',
  styleUrls: ['./titulos-list.component.scss']
})
export class TitulosListComponent implements OnInit {
  titulos: TituloDto[] = [];
  displayedColumns = ['numero', 'nomeDevedor', 'qtdParcelas', 'valorOriginal', 'diasAtraso', 'valorAtualizado', 'actions'];

  constructor(private tituloService: TituloService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.tituloService.getDivida().subscribe({
      next: (data) => this.titulos = data,
      error: (err) => console.error(err)
    });
  }
}
