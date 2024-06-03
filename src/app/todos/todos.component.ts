import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodosService } from '../todos.service';
import { Todo } from './todos.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  searchTerm: string = '';
  isSearchEnabled: boolean = false;

  constructor(private todosService: TodosService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.todosService.getTodos().subscribe(
      (data: Todo[]) => {
        this.todos = data;
        this.filteredTodos = data;
      },
      (error) => {
        console.error('Error fetching todos', error);
      }
    );
  }

  onInput(): void {
    this.isSearchEnabled = this.searchTerm.trim().length >= 0;
  }

  randomMethod(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    if (this.searchTerm.trim() === '') {
      this.filteredTodos = this.todos;
    } else {
      this.filteredTodos = this.todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTermLower)
      );
    }
  }

  viewDetails(id: number): void {
    this.router.navigate(['/todos', id]);
  }
}
