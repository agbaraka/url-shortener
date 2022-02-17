const Link = require("../models/Link")
const supabase = require('./supabase')
const path = require('path')

module.exports.generateShortenedURL = (req, code) =>{
    return `${req.protocol}://${path.join(req.get('host'), code)}`
}


module.exports.save = async (link) => {
    let resp

    if (!link.id){
        link.code = this.generateCode()
        link.created_at = new Date()

        resp = await supabase
            .from('links')
            .insert(link)

    }else{
        resp = await supabase
            .from('links')
            .upsert(link)
    }


    if (resp.error){
        console.log(resp.error)
        throw Error(`Failed to save link: ${link.original_url}`)
    }

    return link
}

module.exports.fetchByCode = async (code) => {
    let resp = await supabase.from('links')
        .select()
        .eq('code', code)

    if (resp.error){
        throw Error('failed to fetch by code')
    }

    return new Link(resp.data[0])
}


module.exports.fetchByURL = async (original_url) => {
    let resp = await supabase.from('links')
        .select()
        .eq('original_url', original_url)
    
    if (resp.error){
        throw resp.error
    }

    return new Link(resp.data[0])

}




const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

module.exports.generateCode = (length = 5) => {
    let results = ''
    let charactersLength = characters.length

    for (let i = 0; i < length; i++){
        results += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }

    return results
}

