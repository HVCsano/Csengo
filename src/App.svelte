<script lang="ts">
    import * as conf from './lib/config'
    let popUp: HTMLDivElement
    let bg: HTMLDivElement
    let timeDiv: HTMLDivElement
    let dayDiv: HTMLDivElement
    let timeBtn: HTMLButtonElement
    let timeBtns: HTMLDivElement[] = []
    let napok = {
        Hétfő: 'hé',
        Kedd: 'ke',
        Szerda: 'sze',
        Csütörtök: 'csü',
        Péntek: 'pé',
        Szombat: 'szo',
        Vasárnap: 'va',
    }
    let hangok = [
        {
            location: 'C:\\Jan\\ki.mp3',
            dates: ['8:35', '7:40'],
            days: ['hétfő', 'kedd'],
        },
        {
            location: 'C:\\Jan\\be.mp3',
            dates: ['8:30', '7:60'],
            days: ['szombat', 'kedd'],
        },
    ]

    let index = 1
    function creating() {
        // conf.addcsengő()
        popUp?.classList.remove('hidden')
        popUp?.classList.add('flex')
        bg.classList.add('opacity-40')
    }
    function done() {
        console.log('index', index)
        popUp?.classList.add('hidden')
        popUp?.classList.remove('flex')
        bg.classList.remove('opacity-40')
        for (let i = 0; i < timeBtns.length; i++) {
            const element = timeBtns[i]
            element.remove()
        }
    }

    function plusTime() {
        index++
        console.log('még jó')
        let newTime = document.createElement('input')
        newTime.type = 'time'
        newTime.classList.add(
            'my-2',
            'text-white',
            'text-center',
            'bg-blue-700',
            'rounded-2xl',
            'text-2xl',
            'size-0',
            'transition-all'
        )
        newTime.classList.add('size-100')
        newTime.classList.remove('size-0')
        newTime.name = `time_${index}`
        newTime.id = `time_${index}`
        timeBtns.push(newTime)
        timeDiv.insertBefore(newTime, timeBtn)
    }
    let test = document.getElementById('time_1')
    console.log(test, 'test')
</script>

<div>
    <div bind:this={bg}>
        <button
            id="plus"
            class="rounded-full bg-blue-700 hover:bg-blue-800 w-24 h-24 fixed text-center text-white bottom-2 left-2"
            on:click={() => creating()}
        >
            +
        </button>
        <div>
            {#each hangok as hang}
                <div
                    class="grid grid-cols-3 bg-blue-900 rounded-xl w-11/12 m-auto my-5 p-3"
                >
                    <span
                        class="text-3xl text-gray-900 text font-bold text-center rounded-xl bg-gray-300 mx-3"
                        >{hang.location}</span
                    >
                    <span
                        class="text-3xl text-gray-900 text font-bold text-center rounded-xl bg-gray-200 mx-3"
                        >{hang.dates}</span
                    >
                    <span
                        class="text-3xl text-gray-900 text font-bold text-center rounded-xl bg-gray-300 mx-3"
                        >{hang.days}</span
                    >
                </div>
            {/each}
        </div>
    </div>

    <div
        class=" hidden items-center justify-center h-screen w-screen m-auto z-10 fixed top-0"
        bind:this={popUp}
    >
        <div
            class="z-10 bg-slate-700 w-5/6 h-auto relative rounded-2xl min-h-[420px]"
        >
            <div class="grid grid-cols-2 grid-rows-1 content-start my-2 mx-2">
                <div class="bg-blue-950 top-2 px-3 rounded-xl py-2 w-96">
                    <div
                        class="text-center content-center grid"
                        bind:this={timeDiv}
                    >
                        <span
                            class="bg-blue-700 text-white text-2xl rounded-2xl my-2"
                        >
                            Idő
                        </span>
                        <input
                            type="time"
                            name="time_1"
                            Id="time_1"
                            class=" my-2 text-white text-center bg-blue-700 rounded-2xl text-2xl"
                        />
                        <button
                            class=" py-3 px-5 rounded-xl bg-blue-700 text-white text-center hover:bg-blue-800 my-2"
                            on:click={() => plusTime()}
                            bind:this={timeBtn}>+</button
                        >
                    </div>
                </div>
                <div
                    class="bg-blue-950 absolute top-2 right-40 w-96 px-3 py-2 rounded-xl"
                >
                    <div
                        class="text-center content-center grid"
                        bind:this={dayDiv}
                    >
                        <span
                            class="bg-blue-700 text-white text-2xl rounded-2xl my-2"
                        >
                            Nap(ok)
                        </span>
                        {#each Object.keys(napok) as nap}
                            <div
                                class="flex gap-2 bg-blue-700 rounded-xl my-2 group"
                            >
                                <input
                                    type="checkbox"
                                    name={napok[nap]}
                                    class=" translate-x-36 check group-active:chk peer cursor-pointer appearance-none relative w-6 h-6 border-2 border-slate-300 checked:bg-slate-700 checked:border-white rounded-lg mt-1 shrink-0"
                                />
                                <label
                                    for="H"
                                    class="text-2xl text-white translate-x-36"
                                    >{nap}
                                </label>
                                <svg
                                    class=" translate-x-36 absolute w-6 h-6 pointer-events-none hidden peer-checked:block stroke-white mt-1 outline-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="3"
                                    stroke-Linecap="round"
                                    stroke-Linejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12"
                                    ></polyline>
                                </svg>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>

            <button
                class="absolute py-3 px-5 bottom-5 right-5 rounded-xl bg-blue-700 text-white text-center hover:bg-blue-800"
                on:click={() => done()}>Kész</button
            >
        </div>
    </div>
</div>
