const express = require('express')
const app = express()

app.set('view engine','hbs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{res.render('index')})

app.post('/',  (req, res)=>{
    
    console.log(req.body.city_name);
        
        const request = require('request');

        let apiKey = 'e7d881e54b8415e8a4b60831e8eb0b96'
        let city = req.body.city_name
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

        request(url, function (err, response, body) {
        if(err){
            console.log('error:', error);
        } else {
            
        let weather = JSON.parse(body)
        
        if(weather.main == undefined)
          {
               res.render('index', {weather: null});
          } 
          else 
          {
            let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
            res.render('index', {weather: weatherText});
          }
       
        }
        })


            
  })

app.listen('3000',()=>{console.log('http://localhost:3000')})
