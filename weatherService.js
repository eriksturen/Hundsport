class WeatherDataObject {
    constructor(city, temp_max, temp_min, sunset, precip) {
        this.city = city
        this.temp_max = temp_max;
        this.temp_min = temp_min;
        this.sunset = sunset;
        this.precip = precip;
    }
}

class Question {
    // vi bygger en constructor:
    constructor(statement, correctAnswer) {
        this.statement = statement;
        this.correctAnswer = correctAnswer;
    }
}

// Api script should save lat/lon to a couple of cities in a list 
const cities = {
    Göteborg: {
        "lat": 57.71,
        "lon": 11.97
    },
    Stenungsund: {
        "lat": 58.07,
        "lon": 11.82
    },
    Karlstad: {
        "lat": 59.38,
        "lon": 13.50
    },
    Skara: {
        "lat": 58.39,
        "lon": 13.44
    },
    Kiruna: {
        "lat": 67.86,
        "lon": 20.23,
    }
}

const weatherApiResponse = [];

const weatherData = [];

// Getting weather data is wrapped in a function to be able to async/await
async function GetWeatherData() {
    // List is then passed to a loop, building an url and fetching data from open-meteo
    for (const [city, value] of Object.entries(cities)) {
        // BASE-URL (gothenburg in example):
        // https://api.open-meteo.com/v1/forecast?latitude=57.71&longitude=11.97&daily=temperature_2m_max,temperature_2m_min,sunset,precipitation_sum&windspeed_unit=ms&timezone=Europe%2FBerlin

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${value.lat}&longitude=${value.lon}&daily=temperature_2m_max,temperature_2m_min,sunset,precipitation_sum&windspeed_unit=ms&timezone=Europe%2FBerlin`
        const response = await (await fetch(url));
        const responseJSON = await response.json();
        weatherApiResponse.push(responseJSON);
    };

    for (let i = 0; i < weatherApiResponse.length; i++) {
        const weatherObject = new WeatherDataObject(
            city = Object.entries(cities)[i][0],
            temp_max = weatherApiResponse[i].daily.temperature_2m_max[0],
            temp_min = weatherApiResponse[i].daily.temperature_2m_min[0],
            sunset = new Date(weatherApiResponse[i].daily.sunset[0]),
            precip = weatherApiResponse[i].daily.precipitation_sum[0],
        );

        weatherData.push(weatherObject)
    };


    //Create an ul list object with a li is then built from each relevant object and passed to the front page initializing more or less like the product list
    const weatherTable = document.querySelector("#weather-api-table")
    for (const entry of weatherData) {
        const tr = document.createElement("tr");
        const tdClub = document.createElement("td");
        const tdMaxTemp = document.createElement("td");
        const tdMinTemp = document.createElement("td");
        // const tdSunset = document.createElement("td");
        const tdPrecip = document.createElement("td");

        tdClub.innerText = entry.city;
        tdMaxTemp.innerText = `${entry.temp_max} °C`;
        tdMinTemp.innerText = `${entry.temp_min} °C`;
        // tdSunset.innerText = entry.sunset.toLocaleTimeString("swe");
        tdPrecip.innerText = entry.precip;

        tr.append(tdClub, tdMaxTemp, tdMinTemp, tdPrecip);
        weatherTable.appendChild(tr);
    }

}

GetWeatherData();
