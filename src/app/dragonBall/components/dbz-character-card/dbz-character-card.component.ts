import { TitleCasePipe } from '@angular/common';
import { Character } from '../../interfaces/character-interface';
import { Component, computed, input, signal } from '@angular/core';
import { DbzCharacterModalComponent } from '../dbz-character-modal/dbz-character-modal.component';

@Component({
  selector: 'dbz-character-card',
  templateUrl: './dbz-character-card.component.html',
  styleUrls: ['./dbz-character-card.component.css'],
  imports: [TitleCasePipe, DbzCharacterModalComponent]
})
export class DbzCharacterCardComponent {
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
