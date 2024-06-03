import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodosService } from '../todos.service';
import { Todo } from '../todos/todos.model';

@Component({
  selector: 'app-todos-detalle',
  templateUrl: './todos-detalle.component.html',
  styleUrls: ['./todos-detalle.component.scss'],
})
export class TodosDetalleComponent implements OnInit {
  todo: Todo | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.getTodo();
  }

  getTodo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todosService.getTodosById(id).subscribe(
      (todo: Todo) => (this.todo = todo),
      (error) => console.error('Error fetching todo details', error)
    );
  }

  goBack(): void {
    this.router.navigate(['/todos']);
  }
}
