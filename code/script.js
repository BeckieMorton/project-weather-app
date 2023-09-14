//--------DOM selectors stored as short variables-------------//

const container = document.getElementById('sun_rise_sunset');

//---------------- Global Variables -------------------------//

//example URL: https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "9055fb4826563eac25a47e211073a627"; //Beckie's API key

const city = "Stockholm,Sweden";
const apiUrl = `${BASE_URL}?q=${city}&units=metric&APPID=${API_KEY}`;
const forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&exclude=hourly,daily,current&units=metric&APPID=9055fb4826563eac25a47e211073a627`

console.log(forecastAPI)

//------------------API fetch functions ----------------------//

// API fetch request for current weather for city
fetch(apiUrl)
    .then(response => response.json())
    .then((json) => {
        //console.log(json)
        updateHTML(json);
    })
    .catch((error) => console.error('Error:', error)) // Handle any errors that occurred during the API request


// API fetch request for city forecast to display for next 5 days
// try to remove the hourly forecast and just get daily: https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=daily&appid={API key}

fetch(forecastAPI)
    .then(response => response.json())
    .then((json) => {
        console.log(json)
        updateHTMLforecast(json);
    })
    .catch((error) => console.error('Error:', error)) // Handle any errors that occurred during the API request




// ----- updateHTML function - display current forecast, sunrise, sunset, icon for city ---------------   //

const updateHTML = (json) => {
    // Convert sunrise timestamp to a Date object
    const sunriseTimestamp = new Date(json.sys.sunrise * 1000); // Multiply by 1000 to convert from seconds to milliseconds
    const sunriseHours = sunriseTimestamp.getUTCHours().toString().padStart(2, '0'); // Get hours in 24-hour format
    const sunriseMinutes = sunriseTimestamp.getUTCMinutes().toString().padStart(2, '0'); // Get minutes
    const sunriseTime = `${sunriseHours}: ${sunriseMinutes}`; // Create time string

    // Convert sunset timestamp to a Date object
    const sunsetTimestamp = new Date(json.sys.sunset * 1000); // Multiply by 1000 to convert from seconds to milliseconds
    const sunsetHours = sunsetTimestamp.getUTCHours().toString().padStart(2, '0'); // Get hours in 24-hour format
    const sunsetMinutes = sunsetTimestamp.getUTCMinutes().toString().padStart(2, '0'); // Get minutes
    const sunsetTime = `${sunsetHours}:${sunsetMinutes} `; // Create time string

    container.innerHTML = `<p> ${json.weather[0].main} | ${json.main.temp.toFixed(1)}°C</p>
    <p>sunrise ${sunriseTime}</p>
    <p>sunset ${sunsetTime}</p>`;

    const weatherStatus = json.weather[0].main;
    const cityNameElement = document.getElementById("cityName");

    if (weatherStatus == "Clear") {
        cityNameElement.innerText = `Get your sunnies on.
        ${json.name} is looking rather great today.`;
    } else {
        cityNameElement.innerText = `${json.name} `;
    }
    //document.getElementById("cityTemp").innerText = (`City Temp: ${ json.main.temp.toFixed(1) } `)
    document.getElementById("weatherDescription").innerText = (`Description: ${json.weather[0].description} `)


    //display icon for either clouds, sunglasses or rain
    console.log(weatherStatus)
    if (weatherStatus === "Clouds") {
        document.getElementById("weatherIcon").innerHTML = (`<img src = "/design/design2/icons/noun_Cloud_1188486.svg" alt = "clouds icon" width = "100" height = "100" >`)
    } else if (weatherStatus === "Rain") {
        document.getElementById("weatherIcon").innerHTML = (`<img src = "/design/design2/icons/noun_Umbrella_2030530.svg" alt = "umbrella icon" width = "100" height = "100" >`)
    } else if (weatherStatus === "Clear") {
        document.getElementById("weatherIcon").innerHTML = (`<img src = "/design/design2/icons/noun_Sunglasses_2055147.svg" alt = "sunglasses icon" width = "100" height = "100" >`)
    }
}

// ------ updateHTMLforecast function - display forecast for next 5 days ---------------   //

const updateHTMLforecast = (json) => {
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(`filtered forecast object: ${filteredForecast}`)
    filteredForecast.map((item) => {
        forecast5Days.innerHTML +=
            `  <tr>
            <th>${item.dt_txt}</th>
            <th>${item.main.temp.toFixed(1)}</th>
        </tr>
    `
    })
}




//-------------------- All Event Listeners --------------------//
//if we make a button to scroll through to other cities????