import { fs } from '@tauri-apps/api'
import { appConfigDir } from '@tauri-apps/api/path'

async function check() {
    console.log(await appConfigDir())
    console.log(await fs.exists(await appConfigDir()))
}

check()
