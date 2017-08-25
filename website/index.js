const {promisify} = require('util')
const {readFile, writeFile} = require('fs')
const sass = require('node-sass')
const read = promisify(readFile)
const write = promisify(writeFile)
const render = promisify(sass.render)
const pug = require('pug')
const yaml = require('js-yaml')

const readYaml = async name => {
    const i18n = await read(`i18n/${name}.yaml`, 'utf8')
    return yaml.safeLoad(i18n)
}
const writeHtml = async (name, html) => {
    await write(`dist/${name}.html`, html)
    console.log(`Page ${name} generated`)
}
const writeCss = async _ => {
    const file = 'src/styles.scss'
    const style = await render({file})
    await write('dist/styles.css', style.css)
    console.log('Style generated')
}

const languages = ['en', 'fr', 'es']

const compiler = input => {
    const compiledFunction = pug.compileFile(`src/${input}.pug`)
    return async (language, output = language) => {
        try {
            const i18n = await readYaml(language)
            await writeHtml(output, compiledFunction({languages, i18n}))
        }
        catch (err) {
            console.error(err)
        }
    }
}

const main = async _ => {
    const compileIndex = compiler('index')
    try {
        await writeCss()
        await compileIndex(languages[0], 'index')
        await languages.forEach(l => compileIndex(l))
    } catch (err) {
        console.error(err)
    }
}

main()
