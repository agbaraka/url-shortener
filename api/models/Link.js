module.exports = function Link(link = {}){

    this.id = link?.id
    this.original_url = link?.original_url
    this.code = link?.code
    this.requested_count = link?.requested_count || 0
    this.used_count = link?.used_count || 0
    this.last_requested = link?.last_requested
    this.last_used = link?.last_used

    return this
}