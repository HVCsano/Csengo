import { dialog, fs } from '@tauri-apps/api'
import { appConfigDir, downloadDir, join } from '@tauri-apps/api/path'

export async function check() {
    const confDir = await appConfigDir()
    if (!(await fs.exists(confDir))) fs.createDir(confDir)
    if (!(await fs.exists(await join(confDir, '/sounds'))))
        fs.createDir(await join(confDir, '/sounds'))
}

export async function addcsengő() {
    const confDir = await appConfigDir()
    const dial = await dialog.open({
        title: 'Csengő hozzáadása',
        defaultPath: await downloadDir(),
        filters: [{ name: 'Hangfájlok', extensions: ['mp3', 'wav', 'ogg'] }],
    })
    return dial
}

export async function getHangok() {
    const confDir = await appConfigDir()
    if (!(await fs.exists(await join(confDir, '/hangok.json')))) return []
    try {
        return JSON.parse(
            await fs.readTextFile(await join(confDir, '/hangok.json'))
        )
    } catch {
        return []
    }
}
