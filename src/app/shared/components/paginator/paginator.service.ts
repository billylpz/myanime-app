import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';


  
@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  private route = inject(ActivatedRoute);
  

  currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => params.get("page") ? parseInt(params.get("page")!) : 1),
      map((page) => isNaN(page) ? 1 : page),
      map((page) => page==0 ? 1:page),
    ),
    { initialValue: 1 }
  )

}
