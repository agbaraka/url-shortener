const LinkService = require('../services/link.service')

module.exports = async (req, res, next) => {

    let code = req.params['code'];

    try{
        let link = await LinkService.fetchByCode(code)

        if (!link.id){
            return next()
        }
        link.used_count++
        link.last_used = new Date()
        link = await LinkService.save(link)
        res.redirect(301, link.original_url)
    }catch(e){
        next()
    }
    
}