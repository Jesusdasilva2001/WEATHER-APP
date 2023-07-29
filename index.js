const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const err404 =  document.querySelector('.not-found');

search.addEventListener('click', () =>{

    const APIKey = 'e44bf75e439f124f3bb632a07cb80d65';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(Response => Response.json()).then(json => {

        if (json.cod === '404') {
           container.style.height = '404px';
           weatherBox.style.display = 'none';
           weatherDetails.style.display = 'none';
           err404.style.display = 'block';
           err404.classList.add('fadeIn');
           return;
        }


        err404.style.display = 'none';
        err404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'iamges/clear.png';
                break;

            case 'Rain':
                image.src = 'image/rain.png';
                break; 

            case 'Snow':
                image.src = 'image/snow.png';
                break;  
                
            case 'Clouds':
                image.src = 'image/cloud.png';
                break; 

            case 'Haze':
                image.src = 'image/mist.png';
                break; 

            default:
                image.src = '';

        }

        temperature.innerHTML = `${parserInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parserInt(json.wind.speed)}km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    });

});
