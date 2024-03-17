<script lang="ts">
    import { onMount } from 'svelte'
    import * as conf from './lib/config'
    import type { Hangok, daysInterface } from './lib/types'
    import { dayz } from './lib/vars'
    let days: daysInterface[] = dayz.slice(0, dayz.length)

    let popUp: HTMLDivElement
    let bg: HTMLDivElement
    let timeDiv: HTMLDivElement
    let dayDiv: HTMLDivElement
    let timeBtn: HTMLButtonElement
    let doneMode = -1
    let showing = false

    function cancel() {
        popUp?.classList.add('hidden')
        bg.classList.remove('opacity-40')
        showing = false
        doneMode = -1
        timeBtnsJson = timeBtnsJson
        days = days
        hangok = hangok
    }
    function reset() {
        days = dayz.slice(0, dayz.length)

        console.log(dayz)
        console.log(days)

        timeBtnsJson = [
            {
                name: `time_1`,
                id: `time_1`,
                delId: `minus_time_1`,
                value: '',
            },
        ]
        index = 1
        doneMode = -1
    }

    let napok = {
        Hétfő: 'hé',
        Kedd: 'ke',
        Szerda: 'sze',
        Csütörtök: 'csü',
        Péntek: 'pé',
        Szombat: 'szo',
        Vasárnap: 'va',
    }

    let timeBtnsJson = [
        {
            name: `time_1`,
            id: `time_1`,
            delId: `minus_time_1`,
            value: '',
        },
    ]
    let index = 1
    let hangok: Hangok[] = []
    async function load() {
        await conf.check()
        hangok = await conf.getHangok()
    }
    onMount(() => {
        load()
    })

    async function creating() {
        const path = await conf.addcsengő()
        if (!path) return
        pathText = path as string
        showing = true
        popUp?.classList.remove('hidden')
        bg.classList.add('opacity-40')
        reset()
        timeBtnsJson = timeBtnsJson
        days = dayz

        hangok = hangok
    }

    async function done() {
        showing = false

        popUp?.classList.add('hidden')
        bg.classList.remove('opacity-40')
        let doneDays = []
        let doneTimes = []
        for (let i = 0; i < days.length; i++) {
            const element = days[i]
            if (element.check) doneDays.push(element.day)
        }
        for (let i = 0; i < timeBtnsJson.length; i++) {
            const element = timeBtnsJson[i]
            doneTimes.push(element.value)
        }

        doneTimes.sort((a, b) => {
            let aTime = new Date(`1970-01-01T${a}:00Z`)
            let bTime = new Date(`1970-01-01T${b}:00Z`)
            return (aTime as any) - (bTime as any)
        })
        let counter = 0
        for (let i = 0; i < doneTimes.length; i++) {
            const element = doneTimes[i]
            if (element == '') {
                counter++
            }
        }
        if (counter == doneTimes.length && doneDays.length == 0) {
            reset()
            return
        }
        if (doneDays.length == 0) {
            doneDays = ['Nem adtad meg']
        }
        if (counter == doneTimes.length) {
            doneTimes = ['Nem adtad meg']
        }
        if (doneMode != -1) {
            hangok[doneMode].dates = doneTimes
            hangok[doneMode].days = doneDays
        } else {
            hangok.push({
                location: pathText,
                dates: doneTimes,
                days: doneDays,
                mode: true,
            })
            hangok = hangok
        }
        reset()
    }
    let pathText = ''
    function checkDaysIfContanius(days: string[]) {
        interface outputInter {
            days: string[]
            succes: boolean
        }
        let output: outputInter = { days: days, succes: false }
        if (days.length == 1) {
            return output
        }
        let mode = false
        if (days[0].length > 3) mode = true
        if (mode) {
            let TwoWeekDays = []
            for (let index = 0; index < Object.keys(napok).length; index++) {
                const element = Object.keys(napok)[index]
                TwoWeekDays.push(element)
            }
            for (let index = 0; index < Object.keys(napok).length; index++) {
                const element = Object.keys(napok)[index]
                TwoWeekDays.push(element)
            }
            let included = true
            for (let i = 0; i < days.length; i++) {
                const day = days[i]
                let zeroPint = 0
                if (TwoWeekDays.includes(days[0]))
                    zeroPint = TwoWeekDays.indexOf(days[0])

                if (i !== TwoWeekDays.indexOf(day) - zeroPint) included = false
            }
            if (included) {
                output.days = [`${days[0]}-${days[days.length - 1]}`]
                output.succes = true
            } else {
                output.succes = false
                output.days = days
            }
        } else {
            let TwoWeekDaysId = []
            for (let index = 0; index < Object.keys(napok).length; index++) {
                const element = Object.keys(napok)[index]
                TwoWeekDaysId.push(element)
            }
            for (let index = 0; index < Object.keys(napok).length; index++) {
                const element = Object.keys(napok)[index]
                TwoWeekDaysId.push(element)
            }
            let included = true
            for (let i = 0; i < days.length; i++) {
                const day = days[i]
                let zeroPint = 0
                if (TwoWeekDaysId.includes(days[0]))
                    zeroPint = TwoWeekDaysId.indexOf(days[0])
                if (i !== TwoWeekDaysId.indexOf(day)) included = false
            }
            if (included) {
                output.days = [
                    `${napok[days[0] as keyof typeof napok]}-${napok[days[days.length - 1] as keyof typeof napok]}`,
                ]
                output.succes = true
            } else {
                output.succes = false
                output.days = days
            }
        }
        return output
    }
    function plusTime() {
        index++

        let newTime = {
            name: `time_${index}`,
            id: `time_${index}`,
            delId: `minus_time_${index}`,
            value: '',
        }
        timeBtnsJson.push(newTime)
        timeBtnsJson = timeBtnsJson
    }
    function minusTime(id: string) {
        let wanted = timeBtnsJson.find((element) => {
            return element.id === id
        })
        if (wanted) {
            timeBtnsJson.splice(timeBtnsJson.indexOf(wanted), 1)
        }

        timeBtnsJson = timeBtnsJson
    }
    function modeChanged(index: number) {
        const btn = document.getElementById(`${index}_mode`)
        if (hangok[index].mode) {
            btn?.classList.add('bg-red-600')
            btn?.classList.remove('bg-green-600')
            hangok[index].mode = false
        } else {
            hangok[index].mode = true
            btn?.classList.remove('bg-red-600')
            btn?.classList.add('bg-green-600')
        }
    }
    function sortingWeekDays(a: string, b: string) {
        if (Object.keys(napok).indexOf(a) < Object.keys(napok).indexOf(b)) {
            return -1
        } else if (
            Object.keys(napok).indexOf(a) > Object.keys(napok).indexOf(b)
        ) {
            return 1
        }
        return 0
    }
    for (let i = 0; i < hangok.length; i++) {
        hangok[i].days.sort(sortingWeekDays)
    }
    for (let i = 0; i < hangok.length; i++) {
        hangok[i].dates.sort((a, b) => {
            let aTime = new Date(`1970-01-01T${a}:00Z`)
            let bTime = new Date(`1970-01-01T${b}:00Z`)
            return (aTime as any) - (bTime as any)
        })
    }
    function edit(index: number) {
        popUp?.classList.remove('hidden')
        bg.classList.add('opacity-40')
        showing = true

        let current = hangok[index]
        for (let i = 0; i < days.length; i++) {
            if (current.days.includes(days[i].day)) {
                days[i].check = true
            } else {
                days[i].check = false
            }
        }
        timeBtnsJson = []
        for (let i = 0; i < current.dates.length; i++) {
            const element = current.dates[i]
            timeBtnsJson.push({
                name: `time_${i}`,
                id: `time_${i}`,
                delId: `minus_time_${i}`,
                value: element,
            })
        }

        doneMode = index
    }
    function delChime(index: number) {
        hangok.splice(index, 1)
        hangok = hangok
    }
</script>

<div class="">
    <div bind:this={bg}>
        <button
            id="plus"
            class=" bg-blue-700 hover:bg-blue-800 w-24 h-24 rounded-full fixed text-center text-3xl text-white bottom-2 left-2"
            on:click={() => creating()}
        >
            +
        </button>
        <div>
            <div
                class="grid grid-cols-9 bg-blue-900 rounded-xl w-11/12 m-auto my-5 p-3"
            >
                <span
                    class="text-3xl text-gray-100 text col-span-2 font-bold text-center rounded-xl bg-blue-800 mx-3 outline outline-white"
                    >Hang</span
                >
                <span
                    class="text-3xl text-gray-100 text col-span-2 font-bold text-center rounded-xl bg-blue-800 mx-3 outline outline-white"
                    >Idő</span
                >
                <span
                    class="text-3xl text-gray-100 text col-span-2 font-bold text-center rounded-xl bg-blue-800 mx-3 outline outline-white"
                    >Napok</span
                >
                <span
                    class="text-3xl text-gray-100 text col-span-3 font-bold text-center rounded-xl bg-blue-800 mx-3 outline outline-white"
                    >Szerkesztés</span
                >
            </div>
            {#each hangok as hang}
                <div
                    class="grid grid-cols-9 bg-blue-900 rounded-xl w-11/12 m-auto my-5 p-3"
                >
                    <span
                        class="text-3xl text-gray-900 text col-span-2 font-bold text-center rounded-xl bg-blue-500 mx-3 outline outline-black"
                        >{hang.location}</span
                    >
                    <span
                        class="text-3xl text-gray-900 text font-bold col-span-2 text-center rounded-xl bg-blue-500 mx-3 outline outline-black"
                        >{#each hang.dates as idő}
                            {idő}
                        {/each}</span
                    >
                    <span
                        class="text-3xl text-gray-900 text font-bold col-span-2 text-center rounded-xl bg-blue-500 mx-3 outline outline-black"
                    >
                        {#if checkDaysIfContanius(hang.days).succes}
                            {checkDaysIfContanius(hang.days).days}
                        {/if}
                        {#if !checkDaysIfContanius(hang.days).succes}
                            {#each hang.days as nap}
                                {`${nap} `}
                            {/each}
                        {/if}
                    </span>
                    <div
                        class="  items-center col-span-3 text-center grid grid-cols-6 gap-1"
                    >
                        <button
                            class="col-span-2 p-1 text-3xl text-gray-900 text font-bold text-center rounded-xl bg-red-600 mx-2 outline outline-black hover:bg-red-900"
                            id={`${hangok.indexOf(hang)}_del`}
                            on:click={() => delChime(hangok.indexOf(hang))}
                            >Törlés</button
                        >
                        <button
                            class="col-span-3 p-1 text-3xl text-gray-900 text font-bold text-center rounded-xl bg-blue-500 outline outline-black hover:bg-blue-800"
                            id={`${hangok.indexOf(hang)}_edit`}
                            on:click={() => edit(hangok.indexOf(hang))}
                            >Szerkeszt.</button
                        >
                        <button
                            class="outline bg-green-600 outline-white rounded-xl text-3xl text-transparent mx-1"
                            id={`${hangok.indexOf(hang)}_mode`}
                            on:click={() => modeChanged(hangok.indexOf(hang))}
                            >a
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div
        class="absolute z-10 top-20 left-20 right-20 bottom-20 grid grid-cols-2 grid-rows-12 bg-slate-700 rounded-2xl"
        bind:this={popUp}
    >
        <h2
            class="bg-blue-600 outline content-center translate-x-0 outline-white col-span-2 text-white font-bold text-center rounded-t-2xl row-span-1 h-8"
            contenteditable="false"
            bind:innerText={pathText}
        >
            pathText
        </h2>
        <div
            class="row-span-10 grid grid-cols-2 col-span-3 content-center gap-4 snap-center h-full self-center justify-center align-middle items-center"
        >
            <div
                class="text-center content-center overflow-auto grid bg-blue-950 max-h-[60vh] ml-2 px-3 py-2 rounded-xl"
                bind:this={timeDiv}
            >
                <span class="bg-blue-700 text-white text-2xl rounded-2xl my-2">
                    Idő
                </span>
                {#each timeBtnsJson as newTimeBtnJson}
                    <div class="grid grid-cols-4 gap-3">
                        <input
                            bind:value={newTimeBtnJson.value}
                            type="time"
                            name={newTimeBtnJson.name}
                            id={newTimeBtnJson.id}
                            class=" my-2 text-white text-center bg-blue-700 rounded-2xl text-2xl col-span-3"
                        />

                        <button
                            class=" py-2 px-3 rounded-xl bg-red-700 text-white text-center hover:bg-red-800 my-2"
                            on:click={() => minusTime(newTimeBtnJson.id)}
                            id={newTimeBtnJson.delId}>-</button
                        >
                    </div>
                {/each}
                <button
                    class=" py-3 px-5 rounded-xl bg-blue-700 text-white text-center hover:bg-blue-800 my-2"
                    on:click={() => plusTime()}
                    bind:this={timeBtn}>+</button
                >
            </div>

            <div
                class="text-center content-center grid bg-blue-950 px-3 py-2 rounded-xl h-[58vh] mr-2 overflow-auto"
                bind:this={dayDiv}
            >
                <span class="bg-blue-700 text-white text-2xl rounded-2xl my-2">
                    Napok
                </span>
                {#each days as day}
                    <div
                        class="flex gap-2 bg-blue-700 rounded-xl my-2 items-center"
                    >
                        <input
                            type="checkbox"
                            bind:checked={day.check}
                            name={day.name}
                            id={day.name}
                            class=" translate-x-36 check group-active:chk peer cursor-pointer appearance-none relative w-6 h-6 border-2 border-slate-300 checked:bg-slate-700 checked:border-white rounded-lg mt-1 shrink-0"
                        />
                        <label
                            for="H"
                            class="text-2xl text-white translate-x-36"
                            >{day.day}
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
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                {/each}
            </div>
        </div>

        <div
            class="w-full row-span-1 grid grid-cols-2 gap-2 col-span-2 -translate-y-2"
        >
            <button
                class="py-3 px-5 rounded-xl ml-2 font-bold text-2xl bg-red-700 text-white text-center hover:bg-red-800 transition-all duration-20"
                on:click={() => cancel()}>Mégse</button
            >
            <button
                class="py-3 px-5 rounded-xl mr-2 font-bold text-2xl bg-green-700 text-white text-center hover:bg-green-800 transition-all duration-200"
                on:click={() => done()}>Kész</button
            >
        </div>
    </div>
</div>
