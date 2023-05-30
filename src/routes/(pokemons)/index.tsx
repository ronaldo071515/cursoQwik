import { $, component$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';

import { PokemonImage } from '../../components/pokemons/pokemon-image';
import { usePokemonGame } from '../../hooks/use-pokemon-game';

export default component$(() => {

  const nav = useNavigate();
  const {
    isPokemonVisible,
    pokemonId,
    showBackImage,
    nexPokemon,
    prevPokemon,
    toggleFromBack,
    toggleVisible
  } = usePokemonGame();
  
  

  const goToPokemon = $(() => {
    nav(`/pokemon/${ pokemonId.value }/`);
  });
  
  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{ pokemonId.value }</span>
      <div onClick$={ () => goToPokemon() }>
        <PokemonImage id={pokemonId.value} 
          size={200} 
          backImage={showBackImage.value} 
          isVisible={isPokemonVisible.value}/>
      </div>

      <div class="mt-2">
        <button onClick$={ prevPokemon } class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={ nexPokemon } class="btn btn-primary mr-2">Siguiente</button>

        <button onClick$={ toggleFromBack } class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={ toggleVisible } class="btn btn-primary mr-2">Revelar</button>
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
