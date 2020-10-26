
const fileStart = `
const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();

client.once('ready', () => {
    console.log('Bot is ready to go!)
})

`
const randStringMaker = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

function nonMessageEventsBuidler(events) {
    let nonMessageEvents = ``

    events.forEach(event => {
        nonMessageEvents += `client.on('${event.type}') {\n    ${event.action}\n}`
    })

    return nonMessageEvents
}

function commandObjectsBuilder(objList) {
    let commandObjects = ``

    objList.forEach(cmd => {
        const varName = cmd.name + randStringMaker()
        if (cmd.trigger.includesOrStarts && cmd.trigger.includesOrStarts === 'starts') {
            commandObjects += `\n${varName} = {name: ${cmd.name}, description: ${cmd.description}, async execute(message, args) {${basicResponseBuilder(cmd.response.send)}}}\nclient.commands.set(varName.name, varName)`
        } else if(cmd.trigger.includesOrStarts && cmd.trigger.includesOrStarts === 'includes') {

        } else {

        }
    })
}

function basicResponseBuilder(response) {
    return `message.channel.send('${response}')`
}




function switchCaseWithPrefixBuilder(prefix, commands) {
    let ifStatement = `    if (!message.content.startsWith('${prefix}')) {\n`

    let args = `        const args = message.content.slice(prefix.length).split(/ +/);\n`

    let cmd = `        const command = args.shift();\n`

    let switchStatement = `        swtitch(command) { \n`

    commands.forEach(command => {
        switchStatement += (
            `            case '${command.name}':\n                client.commands.get('${command.name}').execute(message, args);\n                break;\n`)
    })

    const defaulter = (
        `            default:\n                message.channel.send('Invalid command')\n                break;}\n    } else {\n`)

    let switchWithDefault = switchStatement + defaulter
    let fullBlock = ifStatement + args + cmd + switchWithDefault


    return fullBlock
}

function substringMatcher(commands) {
    let substringCheck = `        const checkContains = (message, term) => message.content.contains(term)\n`

    let ifStatement = `        if (checkContain(message, client.commands.first().name)) {\n            client.commands.get(client.commands.first().name)\n`

    let elifStatements = ``
    commands.forEach(command => {
        elifStatements += (
            `        } else if (checkContains(message, '${command.name}')):\n            client.commands.get('${command.name}').execute(message);\n`)
    })

    let checks = ifStatement + elifStatements + '        }'

    let fullBlock = substringCheck += checks
    return fullBlock
}

function messageEventAssembler(prefix, prefixedCommands, unprefixedCommands) {
    let messageEventStart = `client.on('message', message => {\n    if (message.author.bot) return;\n`

    let messageEventEnd = `\n})`

    let switches = switchCaseWithPrefixBuilder(prefix, prefixedCommands) + substringMatcher(unprefixedCommands)

    return messageEventStart + switches + messageEventEnd
}

console.log( fileStart + messageEventAssembler('!', [{ name: 'Hello' }, { name: 'Goodbye' }], [{ name: 'olleH'}, { name: 'eybdooG' }]))