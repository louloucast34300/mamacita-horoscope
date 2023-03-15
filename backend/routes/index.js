const router = require('express').Router();
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs/promises');
const path = require('path')

async function fetchData(url){
    try{
        const response = await fetch(url)
        const data = await response.text()
        targetData(data)
        joinData(newTitle, newArray)
        sendData(newArray)
    }catch(err){
        console.error(err)
    }
}

const newArray = [];
const newTitle = [];

async function sendData(newArray){
    try{
        await fs.writeFile(path.join(__dirname, "../../frontend/src/data.json"), JSON.stringify(newArray))
    }catch(err){
        console.error(err)
    }
}

function joinData(newTitle, newArray){
    for(i = 0; i < newArray.length; i++){
        newArray[i].title = newTitle[i]
    }
}

function targetData(html){
    const $ = cheerio.load(html)

    $(".zone-resultat.signes p", html).each(function(){
        const newestContent = {
            id:newArray.length + 1,
            content: $(this).text(),
            title:''
        }
        newArray.push(newestContent)
    })

    $(".zone-resultat.signes q", html).each(function(){
        const newestContent = {
            id:newArray.length + 1,
            content: $(this).text(),
            title:''
        }
        newArray.push(newestContent)
    })
    
    $(".zone-resultat.signes h2").each(function(){
        if(newTitle.length < 9)
            newTitle.push($(this).text())
    })
}

setInterval(() => {
    fetchData('https://www.elle.fr/Astro/Horoscope/Quotidien/Capricorne')
}, 1000 * 60 * 60)

router.get('/horoscope', (req, res) => {
  return null;
})

module.exports = router;
