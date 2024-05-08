const express = require('express')
const favicon = require('serve-favicon')

const app = express()
const port = 3000

app
    .use((req, res, next) => {
        console.log(`URL: ${req.url}, METHOD: ${req.method} `)
        next()
    })
    .use(favicon(__dirname + '/public/favicon.ico'))

const helper = (status, data) => {
    return {
        status: status,
        data: data
    }
}

const seasons = [
    {
        season_id: 1,
        user_id: 1,
        music_id: 1,
        mood_id: 1,
        person_id: 1,
        title: 'Spring 2021',
        color: '#ff0000',
        description: 'Spring 2021 description',
        date_start: '2021-03-21',
        date_end: '2021-06-21',
        updated_at: '2021-03-21',
        created_at: '2021-03-21',
    },
    {
        season_id: 2,
        user_id: 1,
        music_id: 2,
        mood_id: 2,
        person_id: 2,
        title: 'Summer 2021',
        color: '#00ff00',
        description: 'Summer 2021 description',
        date_start: '2021-06-21',
        date_end: '2021-09-21',
        updated_at: '2021-06-21',
        created_at: '2021-06-21',
    },
    {
        season_id: 3,
        user_id: 1,
        music_id: 3,
        mood_id: 3,
        person_id: 3,
        title: 'Autumn 2021',
        color: '#0000ff',
        description: 'Autumn 2021 description',
        date_start: '2021-09-21',
        date_end: '2021-12-21',
        updated_at: '2021-09-21',
        created_at: '2021-09-21',
    },
    {
        season_id: 4,
        user_id: 1,
        music_id: 4,
        mood_id: 4,
        person_id: 4,
        title: 'Winter 2021',
        color: '#ff00ff',
        description: 'Winter 2021 description',
        date_start: '2021-12-21',
        date_end: '2022-03-21',
        updated_at: '2021-12-21',
        created_at: '2021-12-21',
    },
]

app.get('/api/seasons', (req, res) => {
    let status = seasons ? "success" : "error"
    res.json(helper(status, seasons))
})

app.get('/api/seasons/:seasonId', (req, res) => {

    const seasonId = parseInt(req.params.seasonId)
    const season = seasons.find(t => t.id === seasonId)

    let status = seasons && seasons ? "success" : "error"
    res.json(helper(status, season))
})

app.post('/api/seasons', (req, res) => {
    const id = seasons.length + 1
    const createdDate = new Date()
    const season = req.body
    season.id = id
    season.createdDate = createdDate
    seasons.push(season)
    let status = seasons ? "success" : "error"
    res.json(helper(status, season))
})

app.listen(port, () => console.log(`main.js listening on http://localhost:${port}/`))