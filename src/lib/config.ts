import { dialog, fs } from '@tauri-apps/api'
import { appConfigDir, resourceDir } from '@tauri-apps/api/path'

async function check() {
    const confDir = await appConfigDir()
    if (!(await fs.exists(confDir))) fs.createDir(confDir)
    console.log(confDir)
}

export function addcsengő() {
    dialog.open({
        title: 'Csengő hozzáadása',
    })
}

check()
