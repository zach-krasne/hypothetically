/**
 * Table: questions
 * 
 * Who is more likely
 */

const { randomArrayItem } = require('poop-sock')

let client = undefined

const TABLE_NAME = 'questions'

async function create(supabase) {
    client = supabase
    const { error } = await client.from(TABLE_NAME).select()
    if (error) {
        throw new Error(error)
    }
}

async function add(question, user) {
    if (typeof question !== 'string') return
    let item = {
        question,
        submitted_by: user
    }
    const { error } = await client
        .from(TABLE_NAME)
        .insert(item)
    if (error) {
        return error
    }
}

async function getRandom() {
    const { error, data } = await client.from(TABLE_NAME).select()
    if (error || !Array.isArray(data) || data.length < 1) {
        console.error(error || '[bad data]')
        return
    }
    return randomArrayItem(data)
}

module.exports = {
    create,
    queries: {
        add,
        getRandom
    }
}
