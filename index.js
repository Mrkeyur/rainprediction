// HINTS:
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";






const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

app.use(express.static("public"));


const APIkey = "02478808e135de0dee5e021ed65af6e7"


app.get('/', async (req, res) => {
      

    res.render("index2.ejs");  
})  

app.use(bodyParser.urlencoded({ extended: true }));

     
app.post("/submit", async (req, res) => {

    const lat = req.body.id[0];
    const lon = req.body.id[1];
    

   
    function formatDateToString(date){

        // 01, 02, 03, ... 29, 30, 31
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        // 01, 02, 03, ... 10, 11, 12
        var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        // 1970, 1971, ... 2015, 2016, ...
        var yyyy = date.getFullYear();
     
        // create the format you want
        return (MM);
     }   
    const date = new Date();

let day = date.getDate();
let month = formatDateToString(date);
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let tommor = year+"-"+month+"-"+(day+1)+" 09:00:00";
let tomnoon = year+"-"+month+"-"+(day+1)+" 12:00:00";
let tomafnoon = year+"-"+month+"-"+(day+1)+" 15:00:00";
let tomeve = year+"-"+month+"-"+(day+1)+" 18:00:00";
// console.log(tommor); // "17-6-2022"

    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //       const lat = position.coords.latitude;
    //       const lon = position.coords.longitude;
    //       console.log(`Latitude: ${lat}, Longitude: ${lon}`);
    //     });
    //   } else {
    //     console.log("Geolocation is not supported by this browser.");
    //   }
    
    // const forecastlink = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=${APIkey}`

    const result =  await axios.get("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+APIkey);
    // let data = JSON.stringify(result.data.list.dt_txt)
    let status = [];
    for(var i = 0; i < result.data.list.length; i++){
        let verify = result.data.list[i].dt_txt;
        if(verify === tommor){
        let rainvef = result.data.list[i].weather[0].main;
        if(rainvef == "Rain")
        {
            console.log("Rain");
            status.push("It may rain tomorrow bring umbrella.");


        }
        
        else{
        console.log("No Rain");
        }
        }
        else{
        }
        if(verify === tomnoon)
        {
            let rainvef = result.data.list[i].weather[0].main;
            if(rainvef == "Rain")
            {
                console.log("Rain");
                status.push("It may rain tomorrow bring umbrella.");
            }
            
            else{
            console.log("No Rain");
            }
                    }
        else{
        }
        if(verify === tomafnoon)
        {
            let rainvef = result.data.list[i].weather[0].main;
            if(rainvef == "Rain")
            {
                console.log("Rain");
                status.push("It may rain tomorrow bring umbrella.");
            }
            
            else{
            console.log("No Rain");
            }
                    }   
        else{
        }
        if(verify === tomeve)
        {
            let rainvef = result.data.list[i].weather[0].main;
            if(rainvef == "Rain")
            {
                console.log("Rain");
                status.push("It may rain tomorrow bring umbrella.");
            }
            
            else{
            console.log("No Rain");
            }
                    }
        else{
        }
        // data = data.replace(/^"(.*)"$/, '$1')    
        // console.log(result.data.list[i].dt_txt);
    }
    console.log(status);
     
    
    res.render("index.ejs", { statustom: status[0]});

    // data = data.replace(/^"(.*)"$/, '$1');
    
    // result.data.list.forEach((dt_txt ) => {
    // let x = dt_txt ;
    // let y = x.replace(/^"(.*)"$/, '$1');
    // console.log(y)
        
    
// })
    
    // console.log(data);

    // res.render("index.ejs", { secret: result.data.secret, user: result.data.username});
  });



// app.get("/", async (req, res) => {
//     const result =  await axios.get(API_URL + "/random" );
//     console.log(result.data);

//     res.render("index.ejs", { secret: result.data.secret, user: result.data.username});
//   });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
