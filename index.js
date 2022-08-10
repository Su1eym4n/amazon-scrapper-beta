import express from "express";
import request from "request-promise";

const app = express()
const PORT = process.env.PORT || 5001



const generateScrapperUrl = (apiKey) => `http://api.scraperapi.com/?api_key=${apiKey}&autoparse=true`

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hola')
})


//GET details
app.get('/products/:productId?api_key', async (req, res) => {
    const { productId } = req.params;
    const {api_key}=req.query
    const reqUrl = `${generateScrapperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`

    console.log(reqUrl)
    try {
        const response = await request(reqUrl)
        console.log('Response:' + response)
        res.json(JSON.parse(response))
        console.log('')
    } catch (e) {
        res.json(e)
    }
})


//GET product reviews
app.get('/products/:productId/reviews/', async (req, res) => {
    const { productId } = req.params;
    const {api_key}=req.query
    const reqUrl = `${generateScrapperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`
    console.log(reqUrl)
    try {
        const response = await request(reqUrl)
        res.json(JSON.parse(response))
    } catch (e) {
        res.json(e)
    }
})

//GET product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const {api_key}=req.query
    const reqUrl = `${generateScrapperUrl(api_key)}&url=https://www.amazon.com/dp/offer-listing/${productId}`
    console.log(reqUrl)
    try {
        const response = await request(reqUrl)
        res.json(JSON.parse(response))
    } catch (e) {
        res.json(e)
    }
})

//GET search query
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const reqUrl = `${generateScrapperUrl}&url=https://www.amazon.com/s?k=${searchQuery}`
    console.log(reqUrl)
    try {
        const response = await request(reqUrl)
        res.json(JSON.parse(response))
    } catch (e) {
        res.json(e)
    }
})
//http://api.scraperapi.com/?api_key=524144afaf26cd76ccb401f70337b98e&autoparse=true&url=https://www.amazon.com/dp/B08N5M7S6K
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))