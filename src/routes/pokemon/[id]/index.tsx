import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '../../../hooks/use-pokemon-game';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
    const id = Number(params.id);
    if( isNaN(id) ) redirect( 301, '/' );
    if( id <= 0 ) redirect( 301, '/' );
    if( id > 1010 ) redirect( 301, '/' );

    return id;
});

export default component$(() => {

    const {
        toggleFromBack,
        toggleVisible,
        isPokemonVisible,
        showBackImage,
        pokemonId
      } = usePokemonGame();

    return (
        <>
            {/* <span class="text-5xl">Pokemon: {loc.params.id}</span> */}
            <span class="text-5xl">Pokemon: {pokemonId.value}</span>
            <PokemonImage 
                id={ pokemonId.value }
                isVisible={isPokemonVisible.value}
                backImage={showBackImage.value}/>

            <div class="mt-2">
                <button onClick$={ toggleFromBack } class="btn btn-primary mr-2">Voltear</button>
                <button onClick$={ toggleVisible } class="btn btn-primary">{isPokemonVisible.value ? 'Ocultar' : 'Revelar'}</button>
            </div>
        </>
    )

});