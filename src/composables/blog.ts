const blogConf = {
// api refer: https://docs.wagtail.org/en/stable/advanced_topics/api/v2/usage.html
    url: 'https://hdcjh.xyz',
    apiPages: '/api/v2/pages/',
}

export const blogList = async (offset: number, limit: number) => {
    let url = `${blogConf.url}${blogConf.apiPages}?limit=${limit}&offset=${offset}&type=blog.BlogPage`

//     get result
    let result = await fetch(url)

//     check response status
    if (result.status !== 200) {
        throw new Error(`fetch blog resp code ${result.status}, resp content=${result.body}`)
    }

//     parse result
    let data = await result.json()
    return data.items
}