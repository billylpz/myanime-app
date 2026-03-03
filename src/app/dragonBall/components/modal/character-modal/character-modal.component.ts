import { Component, computed, effect, ElementRef, inject, input, OnInit, output, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TitleCasePipe } from '@angular/common';
import { DbzService } from '../../../services/dbz.service';

@Component({
  selector: 'app-character-modal',
  templateUrl: './character-modal.component.html',
  styleUrls: ['./character-modal.component.css'],
  imports: [TitleCasePipe]
})
export class CharacterModalComponent {
  modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  characterId = input.required<number>();
  service = inject(DbzService)
  close = output<boolean>();


  effects = effect(() => {
    this.openModal();
  });

  characterResource = rxResource({
    params: () => ({ id: this.characterId() }),
    stream: ({ params }) => {
      return this.service.getCharacter(params.id)
    }
  });

  originPlanet = computed(() => {
    const originPlanet = this.characterResource.value()?.originPlanet;

    if (originPlanet) {
      return Object.entries(originPlanet)
        .map(([key, value]) => { return { key, value } })
        .filter((object) => object.value != null && object.key != 'id' && object.key != 'image')
    }
    return []
  });

  transformationsArray = computed(() => {
    return this.characterResource.value()?.transformations;
  });

  openModal() {
    this.modal()?.nativeElement.showModal()
  }

  closeModal() {
    this.modal()?.nativeElement.close()
    this.close.emit(false);
  }
}
