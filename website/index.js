const {promisify} = require('util')
const {writeFile} = require('fs')
const sass = require('node-sass')
const write = promisify(writeFile)
const render = promisify(sass.render)
const pug = require('pug')

const writeHtml = async (name, language, html) => {
    await write(`dist/${language}/${name}.html`, html)
    console.log(`Page ${name} generated in ${language}`)
}
const writeCss = async _ => {
    const file = 'src/styles.scss'
    const style = await render({file})
    await write('dist/styles/main.css', style.css)
    console.log('Style generated')
}

const languages = ['en', 'fr']

const compiler = name => {
    const compiledFunction = pug.compileFile(`src/${name}.pug`)
    return async language => {
        try {
            const i18n = require(`./i18n/${language}.json`)
            await writeHtml(name, language, compiledFunction({languages, i18n}))
        } catch (err) {
            console.error(err)
        }
    }
}

const main = async _ => {
    const compileIndex = compiler('index')
    try {
        await writeCss()
        await languages.forEach(compileIndex)
    } catch (err) {
        console.error(err)
    }
}

main()
