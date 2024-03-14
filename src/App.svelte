    <script lang="ts">
        import * as conf from "./lib/config"
        let popUp: HTMLDivElement
        let bg:HTMLDivElement
        let timeDiv:HTMLDivElement
        let timeBtn:HTMLButtonElement
    function creating(){
        // conf.addcsengő()
        popUp?.classList.remove("hidden");
        bg.classList.add("opacity-40")
    }
    function done(){
        popUp?.classList.add("hidden");
        bg.classList.remove("opacity-40")
    }

    function plusTime(){
        console.log("még jó")
        let newTime = document.createElement("input");
        newTime.type="time"
        newTime.classList.add( "my-2 ","text-white"," text-center" ,"bg-blue-700 "," rounded-2xl "," text-2xl","transition-all size-0")
        newTime.classList.add("size-100")
        timeDiv.insertBefore(newTime,timeBtn)
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
            <form >

                <button class="absolute py-3 px-5 bottom-5 right-5 rounded-xl  bg-blue-700 text-white text-center hover:bg-blue-800" on:submit={()=>done()}>Kész</button>
                <div class="grid grid-cols-3 content-around">
                    <div></div>
                    <div class="text-center content-center grid " bind:this={timeDiv}>
                        
                        <span class="bg-blue-700 text-white text-2xl   rounded-2xl my-2">
                            Idő
                        </span>
                        <input type="time"  class=" my-2 text-white text-center bg-blue-700 rounded-2xl text-2xl" >
                        <button class=" py-3 px-5  rounded-xl  bg-blue-700 text-white text-center hover:bg-blue-800" on:click={()=>plusTime()} bind:this={timeBtn}>+</button>
                    </div>
                    <div></div>
                </div>
            </form>
            </div>
        </div>
        
    </div>
    


