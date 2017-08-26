const {promisify} = require('util')
const {writeFile} = require('fs')
const sass = require('node-sass')
const write = promisify(writeFile)
const render = promisify(sass.render)
const pug = require('pug')

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

const languages = ['en', 'fr']

const compiler = input => {
    const compiledFunction = pug.compileFile(`src/${input}.pug`)
    return async (language, output = language) => {
        try {
            const i18n = require(`./i18n/${language}.json`)
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
