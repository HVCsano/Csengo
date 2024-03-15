<script lang="ts">
    import * as conf from './lib/config'
    let popUp: HTMLDivElement
    let bg: HTMLDivElement
    let timeDiv: HTMLDivElement
    let dayDiv: HTMLDivElement
    let timeBtn: HTMLButtonElement
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
        console.log(newTime)
        timeDiv.insertBefore(newTime, timeBtn)
    }
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
    </div>

    <div
        class=" hidden opacity-80 items-center justify-center h-screen w-screen m-auto"
        bind:this={popUp}
    >
        <div
            class="z-10 bg-slate-700 w-5/6 h-auto relative rounded-2xl min-h-[420px]"
        >
            <div class="grid grid-cols-2 grid-rows-1 content-start">
                <div
                    class="bg-blue-950 absolute top-2 left-2 px-3 rounded-xl py-2 w-96"
                >
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
                        <div
                            class="bg-blue-700 rounded-xl content-center items-center text-center justify-center grid my-2"
                        >
                            <div class="flex gap-2">
                                <input
                                    type="checkbox"
                                    name="H"
                                    id="H"
                                    class="peer appearance-none relative w-6 h-6 border-2 border-slate-300 checked:bg-slate-700 checked:border-white rounded-lg mt-1 shrink-0"
                                />
                                <label for="H" class="text-2xl text-white"
                                    >Hétfő</label
                                >
                                <svg
                                    class="absolute w-6 h-6 pointer-events-none hidden peer-checked:block stroke-white mt-1 outline-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-Linecap="round"
                                    stroke-Linejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12"
                                    ></polyline>
                                </svg>
                            </div>
                        </div>
                        <div
                            class="bg-blue-700 rounded-xl content-center items-center text-center justify-center grid my-2"
                        >
                            <div class="flex gap-2">
                                <input
                                    type="checkbox"
                                    name="K"
                                    id="K"
                                    class="peer appearance-none relative w-6 h-6 border-2 border-slate-300 checked:bg-slate-700 checked:border-white rounded-lg mt-1 shrink-0"
                                />
                                <label for="K" class="text-2xl text-white"
                                    >Kedd</label
                                >
                                <svg
                                    class="absolute w-6 h-6 pointer-events-none hidden peer-checked:block stroke-white mt-1 outline-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-Linecap="round"
                                    stroke-Linejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12"
                                    ></polyline>
                                </svg>
                            </div>
                        </div>
                        <div
                            class="bg-blue-700 rounded-xl content-center items-center text-center justify-center grid my-2"
                        >
                            <div class="flex gap-2">
                                <input
                                    type="checkbox"
                                    name="SZE"
                                    id="SZE"
                                    class="peer appearance-none relative w-6 h-6 border-2 border-slate-300 checked:bg-slate-700 checked:border-white rounded-lg mt-1 shrink-0"
                                />
                                <label for="SZE" class="text-2xl text-white"
                                    >Szerda</label
                                >
                                <svg
                                    class="absolute w-6 h-6 pointer-events-none hidden peer-checked:block stroke-white mt-1 outline-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-Linecap="round"
                                    stroke-Linejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12"
                                    ></polyline>
                                </svg>
                            </div>
                        </div>
                        <div
                            class="bg-blue-700 rounded-xl content-center items-center text-center justify-center grid my-2"
                        >
                            <div class="flex gap-2">
                                <input
                                    type="checkbox"
                                    name="CS"
                                    id="CS"
                                    class="peer appearance-none relative w-6 h-6 border-2 border-slate-300 checked:bg-slate-700 checked:border-white rounded-lg mt-1 shrink-0"
                                />
                                <label for="CS" class="text-2xl text-white"
                                    >Csütörtök</label
                                >
                                <svg
                                    class="absolute w-6 h-6 pointer-events-none hidden peer-checked:block stroke-white mt-1 outline-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-Linecap="round"
                                    stroke-Linejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12"
                                    ></polyline>
                                </svg>
                            </div>
                        </div>
                        <div
                            class="bg-blue-700 rounded-xl content-center items-center text-center justify-center grid my-2"
                        >
                            <div class="flex gap-2">
                                <input
                                    type="checkbox"
                                    name="P"
                                    id="P"
                                    class="peer appearance-none relative w-6 h-6 border-2 border-slate-300 checked:bg-slate-700 checked:border-white rounded-lg mt-1 shrink-0"
                                />
                                <label for="P" class="text-2xl text-white"
                                    >Péntek</label
                                >
                                <svg
                                    class="absolute w-6 h-6 pointer-events-none hidden peer-checked:block stroke-white mt-1 outline-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-Linecap="round"
                                    stroke-Linejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12"
                                    ></polyline>
                                </svg>
                            </div>
                        </div>
                        <div
                            class="bg-blue-700 rounded-xl content-center items-center text-center justify-center grid my-2"
                        >
                            <div class="flex gap-2">
                                <input
                                    type="checkbox"
                                    name="SZO"
                                    id="SZO"
                                    class="peer appearance-none relative w-6 h-6 border-2 border-slate-300 checked:bg-slate-700 checked:border-white rounded-lg mt-1 shrink-0"
                                />
                                <label for="SZO" class="text-2xl text-white"
                                    >Szoyat</label
                                >
                                <svg
                                    class="absolute w-6 h-6 pointer-events-none hidden peer-checked:block stroke-white mt-1 outline-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-Linecap="round"
                                    stroke-Linejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12"
                                    ></polyline>
                                </svg>
                            </div>
                        </div>
                        <div
                            class="bg-blue-700 rounded-xl content-center items-center text-center justify-center grid my-2"
                        >
                            <div class="flex gap-2">
                                <input
                                    type="checkbox"
                                    name="V"
                                    id="V"
                                    class="peer appearance-none relative w-6 h-6 border-2 border-slate-300 checked:bg-slate-700 checked:border-white rounded-lg mt-1 shrink-0"
                                />
                                <label for="V" class="text-2xl text-white"
                                    >Vasárnap</label
                                >
                                <svg
                                    class="absolute w-6 h-6 pointer-events-none hidden peer-checked:block stroke-white mt-1 outline-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-Linecap="round"
                                    stroke-Linejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12"
                                    ></polyline>
                                </svg>
                            </div>
                        </div>
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
