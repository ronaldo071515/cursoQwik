import { $, component$, useSignal, useStore } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { PokemonImage } from '../components/pokemons/pokemon-image';

export default component$(() => {

  // const pokemonId2 = useStore();//arrays, objetos
  const pokemonId = useSignal(1);//primitivos string, number, booleans
  const showBackImage = useSignal(false);
  const isVisibleImage = useSignal(true);
  
  const changePokemonId = $((value: number) => {
    if( pokemonId.value + value <= 0 ) return; 
    
    pokemonId.value += value;
  });
  
  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{ pokemonId }</span>

      {/* <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`} 
        alt="Pokemon Sprite"
        style={{ width: '200px' }}/> */}

      <PokemonImage id={pokemonId.value} 
        size={200} 
        backImage={showBackImage.value} 
        isVisible={isVisibleImage.value}/>

      <div class="mt-2">
        <button onClick$={() => changePokemonId(-1) } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => changePokemonId(+1) } class="btn btn-primary mr-2">Siguiente</button>

        <button onClick$={() => showBackImage.value = !showBackImage.value } class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={() => isVisibleImage.value = !isVisibleImage.value } class="btn btn-primary mr-2">Revelar</button>
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
