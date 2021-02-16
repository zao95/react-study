const fs = require('fs').promises
const path = require('path')
const glob = require('glob')
const sass = require('sass')

const sourceDir = "src"
const distDir = "dist"

const htmlRender = async () => {
    const files = await glob.sync(`./${sourceDir}/**/*.html`)
    for (let file of files) {
        const savePath = file.replace(sourceDir, distDir)
        const data = await fs.readFile(file, 'utf8')
        const pathDir = path.dirname(file).replace(sourceDir, distDir)
        try { await fs.access(pathDir) } catch (e) {
            await fs.mkdir(pathDir.replace(sourceDir, distDir), { recursive: true })
        }
        try { await fs.access(savePath) } catch (e) {
            await fs.writeFile(savePath.replace(sourceDir, distDir), data)
            console.log(`${file} has been copied to ${savePath}`)
        }
    }
}

const styleRender = async () => {
    const files = await glob.sync(`./${sourceDir}/**/*.sass`)
    for (let file of files) {
        const pathDir = path.dirname(file).replace(sourceDir, distDir)
        const savePath = file.replace(sourceDir, distDir).slice(0, -4).concat("css")
        const data = await sass.renderSync({file: file}).css.toString('utf8')
        try { await fs.access(pathDir) } catch (e) {
            await fs.mkdir(pathDir.replace(sourceDir, distDir), { recursive: true })
        }
        try { await fs.access(savePath) } catch (e) {
            await fs.writeFile(savePath.replace(sourceDir, distDir), data)
            console.log(`${file} has been copied to ${savePath}`)
        }
    }
}

const scriptRender = async () => {
    const files = await glob.sync(`./${sourceDir}/**/*.js`)
    for (let file of files) {
        const savePath = file.replace(sourceDir, distDir)
        const data = await fs.readFile(file, 'utf8')
        const pathDir = path.dirname(file).replace(sourceDir, distDir)
        try { await fs.access(pathDir) } catch (e) {
            await fs.mkdir(pathDir.replace(sourceDir, distDir), { recursive: true })
        }
        try { await fs.access(savePath) } catch (e) {
            await fs.writeFile(savePath.replace(sourceDir, distDir), data)
            console.log(`${file} has been copied to ${savePath}`)
        }
    }
}

const renderer = () => {
    htmlRender()
    styleRender()
    scriptRender()
}

try {
    renderer()
} catch (e) {
    console.log(e)
}