#!/usr/bin/env node
let shell = require('shelljs')
let colors = require('colors')
let fs = require('fs') 
let inquirer = require('inquirer')
let _ = require('lodash')
const path = require('path');
const os = require('os');
const displayedCommand = 'npm'
const packageJson = require(`${__dirname}/nextweb/package.json`);

let appName = process.argv[2]
const question = [{
    type: 'input',
    name: 'project_name',
    message: 'what is your project named?'
}]

function main() {   
    if (appName) {
        createNextApp(appName)
    } else {
        inquirer
        .prompt(question)
        .then(answers => {
            if (answers.project_name) {
                createNextApp(answers.project_name)
            } else {
                console.log('Please spacify name');
            }
        })
    }
}

function createNextApp(project_name) {
    const root = `${process.cwd()}/${project_name}`
    
    const PACKAGE_JSON = _.merge(packageJson, {
        name: project_name
    })
    console.log(`Creating a new NextWeb app in ${colors.green(root)}.`)
    console.log()
    shell.exec(`cp -r ${__dirname}/nextweb ${project_name}`)
    shell.exec(`cd ${project_name}`)
    shell.exec('npm install')
    console.log('Installing packages. This might take a couple of minutes.')
    console.log()
    fs.writeFile('xxx.json', JSON.stringify(PACKAGE_JSON, null, 2), () => null)            
    shell.exec(`mv ${process.cwd()}/xxx.json ${process.cwd()}/${project_name}/package.json`)

    console.log(`${colors.green('Success!')} Created ${project_name} at ${root}`)
    console.log('Inside that directory, you can run several commands:')
    console.log()
    console.log(colors.cyan(`  ${displayedCommand} run dev`))
    console.log('    Starts the development server.')
    console.log()
    console.log(colors.cyan(`  ${displayedCommand} run build`))
    console.log('    Builds the app for production.')
    console.log()
    console.log(colors.cyan(`  ${displayedCommand} start`))
    console.log('    Runs the built app in production mode.')
    console.log()
    console.log('We suggest that you begin by typing:')
    console.log()
    console.log(colors.cyan('  cd'), project_name)
    console.log(
      `  ${colors.cyan(`${displayedCommand} run dev`)}`
    )
    console.log()
}

main()