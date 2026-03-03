import { TitleCasePipe } from '@angular/common';
import { Character } from '../../../interfaces/character-interface';
import { Component, computed, input, signal } from '@angular/core';
import { CharacterModalComponent } from '../../modal/character-modal/character-modal.component';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css'],
  imports: [TitleCasePipe, CharacterModalComponent]
})
export class CharacterCardComponent {
  character = input.required<Character>();
  openModal = signal(false);

  characterProperties = computed(() => {
    const excluded = ['image', 'deletedAt', 'id'];

    return Object.entries(this.character())
      .map(([key, value]) => { return { key, value } })
      ///.filter((value) => value.key != 'image' && value.key != 'deletedAt' && value.key != 'id'); forma 1
      .filter(({ key }) => !excluded.includes(key))
  });

  image = computed(() => {
    return this.character().image;
  });




}
