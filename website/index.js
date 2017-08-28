const {promisify} = require('util')
const {writeFile} = require('fs')
const sass = require('node-sass')
const write = promisify(writeFile)
const render = promisify(sass.render)
const pug = require('pug')

const {languages, pages} = require('./config/default.json')

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
    await writeCss()
    await Promise.all(pages.map(async p => {
        const compileIndex = compiler(p)
        try {
            await Promise.all(languages.map(compileIndex))
        } catch (err) {
            console.error(err)
        }
    }))
}

main()
