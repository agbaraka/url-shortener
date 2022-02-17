
const LinkService = require('../services/link.service')

module.exports = async (req, res) => {
    let {code} = req.params
    try{
        let link = await LinkService.fetchByCode(code)
        res.json({...link, shortened_url: LinkService.generateShortenedURL(req, link.code)})
    }catch(e){
        res.status(404).json()
    }
}