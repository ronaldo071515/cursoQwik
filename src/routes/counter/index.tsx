import { component$ } from '@builder.io/qwik';

export default component$(() => {
  
    return (
        <>
            <span class="text-2xl">Counter</span>
            <span class="text-7xl">10</span>


            <div class="mt-2">
                <button class="btn btn-primary mr-2">+1</button>
                <button class="btn btn-primary">-1</button>
            </div>

        </>
    )

});