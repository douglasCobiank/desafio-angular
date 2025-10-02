import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TituloService } from '../../services/titulo.service';
import { TituloDto } from '../../models/titulo.model';

@Component({
  selector: 'app-titulo-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatToolbarModule
  ],
  templateUrl: './titulos-form.component.html',
  styleUrls: ['./titulos-form.component.scss']
})
export class TituloFormComponent implements OnInit {
  form!: FormGroup;
  editingId?: string;

  constructor(
    private fb: FormBuilder,
    private tituloService: TituloService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      numero: ['', Validators.required],
      nomeDevedor: ['', Validators.required],
      cpfDevedor: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      percentualMulta: [2, [Validators.required, Validators.min(0)]],
      percentualJurosMes: [1, [Validators.required, Validators.min(0)]],
      parcelas: this.fb.array([])
    });

    this.addParcela();
  }

  get parcelas(): FormArray {
    return this.form.get('parcelas') as FormArray;
  }

  addParcela() {
    const grupo = this.fb.group({
      numeroParcela: [1, Validators.required],
      dataVencimento: [null, Validators.required],
      valorParcela: [0.0, [Validators.required, Validators.min(0.01)]]
    });
    this.parcelas.push(grupo);
  }

  removeParcela(index: number) {
    this.parcelas.removeAt(index);
  }

  populate(t: TituloDto) {
    this.form.patchValue({
      numeroTitulo: t.numeroTitulo,
      nomeDevedor: t.nomeDevedor,
      cpf: t.cpf,
      porcentagemMulta: t.porcentagemMulta,
      porcentagemJuros: t.porcentagemJuros,
      valorOriginal: t.valorOriginal,
      diasAtraso: t.diasAtraso,
      valorAtualizado: t.valorAtualizado
    });
    this.parcelas.clear();
    (t.parcelas || []).forEach(p => {
      this.parcelas.push(this.fb.group({
        numeroParcela: [p.numeroParcela, Validators.required],
        dataVencimento: [new Date(p.dataVencimento), Validators.required],
        valorParcela: [p.valorParcela, [Validators.required, Validators.min(0.01)]]
      }));
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.value;
    const payload: TituloDto = {
      numeroTitulo  : raw.numeroTitulo,
      nomeDevedor: raw.nomeDevedor,
      cpf: raw.cpf,
      porcentagemMulta: raw.porcentagemMulta,
      porcentagemJuros: raw.porcentagemJuros,
      valorOriginal: raw.valorOriginal,
      diasAtraso: raw.diasAtraso,
      valorAtualizado: raw.valorAtualizado,
      parcelas: raw.parcelas.map((p: any) => ({
        numeroParcela: p.numeroParcela,
        dataVencimento: p.dataVencimento instanceof Date ? p.dataVencimento.toISOString().split('T')[0] : p.dataVencimento,
        valorParcela: Number(p.valorParcela)
      }))
    };

    console.log(payload);

    this.tituloService.postDivida(payload).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => console.error(err)
    });
  }
}
