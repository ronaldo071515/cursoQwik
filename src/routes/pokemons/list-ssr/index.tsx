import { component$, useComputed$, useSignal, $, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { DocumentHead, useLocation } from '@builder.io/qwik-city';
import { Link, routeLoader$ } from '@builder.io/qwik-city';

import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';
import { PokemonImage } from '../../../components/pokemons/pokemon-image';
import { Modal } from '../../../components/shared/modal/modal';
import { getFunFactAboutPokemon } from '../../../helpers/get-chat-gpt-response';

export const usePokemonList = routeLoader$<SmallPokemon[]>( async({ query, redirect, pathname }) => {

  const offset = Number(query.get('offset') || '0');
  if( isNaN( offset ) ) redirect( 301, pathname );
  if( offset < 0 ) redirect( 301, pathname );
  return await getSmallPokemons( offset );
});

export default component$(() => {

  const pokemons = usePokemonList();
  const location = useLocation();

  const modalVisible = useSignal(false);
  const modalPokemon = useStore({
    id: '',
    name: '',
  });

  const chatGptPokemonFac = useSignal('');

  // modal funtions
  const showModal = $((id: string, name: string) => {
    modalPokemon.id = id;
    modalPokemon.name = name;
    modalVisible.value = true;
  });
  
  const closeModal = $(() => {
    modalVisible.value = false;
  });

  // TODO: Probar Asycn
  useVisibleTask$(({ track }) => {
    track(() => modalPokemon.name);

    chatGptPokemonFac.value = '';
    
    if( modalPokemon.name.length > 0 ) {
      getFunFactAboutPokemon( modalPokemon.name )
        .then( resp => chatGptPokemonFac.value = resp);
    }

  });

  const currentOffset = useComputed$<number>( () => {
    const offsetString = new URLSearchParams( location.url.search );
    return Number(offsetString.get('offset') || 0);
  });
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
               <div key={name}
                onClick$={ () => showModal( id, name ) } 
                class="m-5 flex flex-col justify-center items-center" >
                <PokemonImage id={id} isVisible />
                <span class="capitalize">{name}</span>
               </div>
             ))
          }
        </div>

        <Modal
          persistent={true} 
          showModal={ modalVisible.value } 
          closeFn={ closeModal }>
          <div q:slot='title'>{ modalPokemon.name }</div>
          <div q:slot='content' class="flex flex-col justify-center items-center">
            <PokemonImage id={modalPokemon.id} isVisible/>
            <span>
              {
                chatGptPokemonFac.value === ''
                ? 'Preguntandole a ChatGPT...'
                : chatGptPokemonFac.value
              }
            </span>
          </div>
        </Modal>

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