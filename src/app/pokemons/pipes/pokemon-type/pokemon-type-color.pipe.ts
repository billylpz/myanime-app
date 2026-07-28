import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'pokemonTypeColor',
  standalone: true
})
export class PokemonTypeColorPipe implements PipeTransform {
  transform(type: string): string {
  switch (type) {
    case 'normal':
      return 'bg-gray-400 text-black';

    case 'fire':
      return 'bg-red-500 text-white';

    case 'water':
      return 'bg-blue-500 text-white';

    case 'grass':
      return 'bg-green-600 text-white';

    case 'electric':
      return 'bg-yellow-400 text-black';

    case 'ice':
      return 'bg-cyan-400 text-black';

    case 'fighting':
      return 'bg-red-700 text-white';

    case 'poison':
      return 'bg-purple-500 text-white';

    case 'ground':
      return 'bg-amber-600 text-white';

    case 'flying':
      return 'bg-sky-400 text-black';

    case 'psychic':
      return 'bg-pink-500 text-white';

    case 'bug':
      return 'bg-lime-600 text-white';

    case 'rock':
      return 'bg-stone-600 text-white';

    case 'ghost':
      return 'bg-indigo-700 text-white';

    case 'dragon':
      return 'bg-violet-700 text-white';

    case 'dark':
      return 'bg-neutral-800 text-white';

    case 'steel':
      return 'bg-slate-500 text-white';

    case 'fairy':
      return 'bg-fuchsia-400 text-black';

    default:
      return 'bg-gray-200 text-black';
  }
}

}
