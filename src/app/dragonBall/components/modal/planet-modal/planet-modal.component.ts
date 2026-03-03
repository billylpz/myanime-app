import { Component, computed, effect, ElementRef, inject, input, OnInit, output, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DbzService } from '../../../services/dbz.service';
import { Character } from '../../../interfaces/character-interface';

@Component({
  selector: 'app-planet-modal',
  templateUrl: './planet-modal.component.html',
  styleUrls: ['./planet-modal.component.css']
})
export class PlanetModalComponent {
  modal = viewChild<ElementRef<HTMLDialogElement>>('modal')
  close = output<boolean>();
  planetId = input.required<number>()
  service = inject(DbzService);

  effects = effect(() => {
    this.openModal();
  });

  planetResource = rxResource({
    params: () => ({ planetId: this.planetId() }),
    stream: ({ params }) => this.service.getPlanet(params.planetId)
  });

  planetCharacters = computed(() => {
    return this.planetResource.value()?.characters!;
  });

  // characterProperties(character: Character) {
  //   return Object.entries(character)
  //     .map(([key, value]) => { return { key, value } })
  //     .filter(( value ) => value.key != 'id'  
  //       && value.key!='image'
  //     )
  // }

  openModal(): void {
    this.modal()?.nativeElement.showModal();
  }

  closeModal(): void {
    this.modal()?.nativeElement.close()
    this.close.emit(false);
  }

}
