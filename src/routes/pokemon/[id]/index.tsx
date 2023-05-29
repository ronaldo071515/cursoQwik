import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

// routeLoader$ Nos permite ejecurar antes que se renderise el component

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
    const id = Number(params.id);
    if( isNaN(id) ) redirect( 301, '/' );
    if( id <= 0 ) redirect( 301, '/' );
    if( id > 1010 ) redirect( 301, '/' );

    return id;
});

export default component$(() => {

    // const loc = useLocation();
    const pokemonId = usePokemonId();
    const pokemonGame = useContext( PokemonGameContext );

    return (
        <>
            {/* <span class="text-5xl">Pokemon: {loc.params.id}</span> */}
            <span class="text-5xl">Pokemon: {pokemonId}</span>
            <PokemonImage 
                id={ pokemonId.value }
                isVisible={pokemonGame.isPokemonVisible}
                backImage={pokemonGame.showBackImage}/>
        </>
    )

});