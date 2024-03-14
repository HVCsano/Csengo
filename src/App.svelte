    <script lang="ts">
        import * as conf from "./lib/config"
        let popUp: HTMLDivElement
        let bg:HTMLDivElement

    function creating(){

        popUp?.classList.remove("hidden");
        bg.classList.add("opacity-40")
    }
    function done(){
        popUp?.classList.add("hidden");
        bg.classList.remove("opacity-40")
    }

    
    </script>
<div>
    <div bind:this={bg} >
        <button id="plus" class="rounded-full  bg-blue-700 hover:bg-blue-800 w-24 h-24  fixed text-center text-white  bottom-2 left-2 " on:click={()=>creating()}  >
            +
        </button>
    </div>
        


    <div  class=" hidden  opacity-80 flex  items-center justify-center h-screen m-auto  " bind:this={popUp}>
        <div class="z-10  bg-slate-700 h-5/6 w-5/6 relative rounded-2xl">
            <button class="absolute py-3 px-5 bottom-5 right-5 rounded-xl  bg-blue-700 text-white text-center hover:bg-blue-800" on:click={()=>done()}>Kész</button>
            <div class="grid grid-cols-3">

            </div>
        </div>
    </div>
    
</div>



