import { $, component$, useOnDocument, useStore, useTask$, useContext } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';


import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import type { SmallPokemon } from '~/interfaces';
import { PokemonListContext } from '~/context';

// interface PokemonPageState {
//   currentPage: number;
//   isLoading: boolean;
//   pokemons: SmallPokemon[];
// }

export default component$(() => {

  //crear un estado
  /* const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    isLoading: false,
    pokemons: []
  }); */

  //creando context
  const pokemonState = useContext( PokemonListContext );

  //Accion visible por el cliente solo cuando se monta el component
  //cleanup para hacer un debounce limpiar la tarea anterior
  // useVisibleTask$( async({ track }) => {
  //   track(() => pokemonState.currentPage);
  //   const pokemons = await getSmallPokemons( pokemonState.currentPage * 10 );
  //   pokemonState.pokemons = [ ...pokemonState.pokemons, ...pokemons ];
  // });
  /* useTask$( async({ track }) => {
    track(() => pokemonState.currentPage);
    // pokemonState.isLoading = true;
    const pokemons = await getSmallPokemons( pokemonState.currentPage * 10, 30 );
    pokemonState.pokemons = [ ...pokemonState.pokemons, ...pokemons ];
    pokemonState.isLoading = false;
  }); */
  useTask$( async({track}) => {

    track(() => pokemonState.currentPage);
    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30)
    // Aqui hacemos la verificacion y si almenos un pokemon esta dentro del listado, hacemos el return
    for (const key in pokemons) {
       if (pokemonState.pokemons.some(pokemon => pokemon.name == pokemons[key].name)) return
    }
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons]
    pokemonState.isLoading = false;
  });
  
  useOnDocument('scroll', $((event) => {
    const maxScroll = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;
    
    if(( currentScroll + 200 >= maxScroll && !pokemonState.isLoading )) {
      pokemonState.isLoading = true;
      pokemonState.currentPage++;
    }
  }));

    return (
      <>
        <div class="flex flex-col">
          <span class="my-5 text-5xl">Status</span>
          <span class="">Offset: { pokemonState.currentPage }</span>
          <span class="">Está Cargando:{ pokemonState.isLoading } </span>
        </div>

        <div class="mt-5">
          <button onClick$={() => pokemonState.currentPage++} class="btn btn-primary mr-2">Siguientes</button>
        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
          {
             pokemonState.pokemons.map( ({ name, id }, index) => (
               <div key={index} class="m-5 flex flex-col justify-center items-center" >
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
    title: 'Client | List',
    meta: [
      {
        name: 'description',
        content: 'Client - List',
      },
    ],
};