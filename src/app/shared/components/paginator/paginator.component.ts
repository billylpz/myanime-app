import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  imports: [RouterLink]
})
export class PaginatorComponent {
  currentPage=input.required<number>();
  totalPages=input.required<number>();
  
}
