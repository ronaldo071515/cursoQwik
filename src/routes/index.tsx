import { $, component$, useContext } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';

import { PokemonImage } from '../components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export default component$(() => {

  // const pokemonId2 = useStore();//arrays, objetos
  // const pokemonId = useSignal(1);//primitivos string, number, booleans
  // const showBackImage = useSignal(false);
  // const isPokemonVisible = useSignal(true);//las reemplazo por nuestro contexto

  const pokemonGame = useContext( PokemonGameContext );//como es un store no ocupo el .value

  const nav = useNavigate();
  
  const changePokemonId = $((value: number) => {
    if( pokemonGame.pokemonId + value <= 0 ) return; 
    pokemonGame.pokemonId += value;
  });

  const goToPokemon = $(() => {
    nav(`/pokemon/${ pokemonGame.pokemonId }/`);
  });
  
  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{ pokemonGame.pokemonId }</span>

      {/* <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`} 
        alt="Pokemon Sprite"
        style={{ width: '200px' }}/> */}

      {/* <Link href={`/pokemon/${ pokemonId.value }/`}>
      </Link> */}
      <div onClick$={ () => goToPokemon() }>
        <PokemonImage id={pokemonGame.pokemonId} 
          size={200} 
          backImage={pokemonGame.showBackImage} 
          isVisible={pokemonGame.isPokemonVisible}/>
      </div>

      <div class="mt-2">
        <button onClick$={() => changePokemonId(-1) } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => changePokemonId(+1) } class="btn btn-primary mr-2">Siguiente</button>

        <button onClick$={() => pokemonGame.showBackImage = !pokemonGame.showBackImage } class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={() => pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible } class="btn btn-primary mr-2">Revelar</button>
      </div>

    </>
  );
});

export const head: DocumentHead = {
  title: 'PoqueQwik',
  meta: [
    {
      name: 'description',
      content: 'Está es mi primera aplicación en Qwik',
    },
  ],
};
