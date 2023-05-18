import { component$, useComputed$ } from '@builder.io/qwik';
import { DocumentHead, useLocation } from '@builder.io/qwik-city';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';
import { PokemonImage } from '../../../components/pokemons/pokemon-image';

export const usePokemonList = routeLoader$<SmallPokemon[]>( async({ query, redirect, pathname }) => {

  const offset = Number(query.get('offset') || '0');
  if( isNaN( offset ) ) redirect( 301, pathname );
  if( offset < 0 ) redirect( 301, pathname );
  return await getSmallPokemons( offset )
  /* const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${ offset }`);
  const data = await resp.json() as PokemonListResponse;
  // console.log(data);
  return data.results; */
});

export default component$(() => {

  const pokemons = usePokemonList();
  const location = useLocation();

  const currentOffset = useComputed$<number>( () => {
    // const offsetString = location.url.searchParams.get('offset');
    const offsetString = new URLSearchParams( location.url.search );
    return Number(offsetString.get('offset') || 0);
  });

  // console.log(location.url.searchParams.get('offset'));

    return (
      <>
        <div class="flex flex-col">
          <span class="my-5 text-5xl">Status</span>
          <span class="">Offset: { currentOffset }</span>
          <span class="">Está Cargando Página: { location.isNavigating? 'SI': 'NO' }</span>
        </div>

        <div class="mt-5">
          <Link href={`/pokemons/list-ssr/?offset=${ currentOffset.value - 10 }`} 
            class="btn btn-primary mr-2">Anteriores</Link>
          <Link href={`/pokemons/list-ssr/?offset=${ currentOffset.value + 10 }`} 
            class="btn btn-primary mr-2">Siguientes</Link>
        </div>

        <div class="grid grid-cols-6 mt-5">
          {
             pokemons.value.map( ({ name, id }) => (
               <div key={name} class="m-5 flex flex-col justify-center items-center" >
                <PokemonImage id={id} isVisible />
                <span class="capitalize">{name}</span>
               </div>
             ))
          }
        </div>
      </>
    )
});

export const head: DocumentHead = {
    title: 'SSR | List',
    meta: [
      {
        name: 'description',
        content: 'SSR - List',
      },
    ],
};