import { component$, useSignal, useTask$ } from '@builder.io/qwik';


interface Props {
    backImage: boolean;
    id: number;
    isVisible?: boolean;
    size?: number;
}


export const PokemonImage = component$(( {id, size = 200, backImage = false, isVisible = true}: Props ) => {

    const imageLoaded = useSignal(false);

    //Disparar efectos secundarios
    useTask$(({ track }) => {
        track( () => id);

        imageLoaded.value = false;
    });

    /* https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png */
    let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/${ backImage? 'pokemon': 'pokemon/back' }/${id}.png`;

    return (
        <div class="flex items-center justify-center"
            style={{ width: `${ size }px`, height: `${ size }px`}}>
            { !imageLoaded.value && <span>Cargando...</span> }
            <img src={ imageUrl } 
                alt="Pokemon Sprite"
                style={{ width: `${ size }px` }}
                onLoad$={ () => imageLoaded.value = true }
                class={[{ 'hidden': !imageLoaded.value, 'brightness-0': isVisible }, 'transition-all']}/>
        </div>
    )
})

/* onLoad$={ () => {
    setTimeout(() => {
        imageLoaded.value = true
    }, 2000);
}} */