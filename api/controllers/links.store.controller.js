const validURL = require('valid-url')
const LinkService = require('../services/link.service')


module.exports = async (req, res) => {

    let { url } = req.body

    if (!url || url == ''){
        return res.status(422).json({ 'url': 'URL is required' })
    }

    if (!validURL.isUri(url)){
        url = `http://${url}`
        if (!validURL.isUri(url)){
            return res.status(422).json({ 'url': 'Please enter valid URL' }) 
        }
    }

    try{

        let link = await LinkService.fetchByURL(url)

        link.original_url = url
        link.last_requested = new Date()
        link.requested_count++

        link = await LinkService.save(link)

        return res.json({data: {...link, shortened_url: LinkService.generateShortenedURL(req, link.code)}})
    }catch(e){
        res.status(500).json(e)
    }
}



