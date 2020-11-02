var Weekday=['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];

async function getWeather()
{
    return await (await fetch('https://api.openweathermap.org/data/2.5/onecall?'+ 'lat=37.566631&lon=126.978225' +'&exclude=minutely&units=metric&lang=kr&appid=e4402e4d703a276e5ed68d482b138995')).json();
}

window.addEventListener('load', async function()
{

    var weatherResponse = await getWeather();
    console.log(weatherResponse);
    var HourArray= new Array();
    // var RealData = new Array();
    // var Hour_now;
    for(var i = 0 ; i< weatherResponse.hourly.length; i++)
    {
        console.log(weatherResponse.hourly[i].weather[0].main);
        HourArray[i] = weatherResponse.hourly[i].dt;
        // RealData[i] = weatherResponse;
        var date = new Date(HourArray[i]*1000);

        var re_year = date.getFullYear();//year
        var re_month = date.getMonth()+1;//month

        var re_day = date.getDate();//day
        var re_hours  = date.getHours();//hour
        var re_min = date.getMinutes()//minutes
        var re_seconde = date.getSeconds();//seconde

        if(i==0)
        {
            Hour_now = re_hours;
        }

        HourArray[i] = re_hours;
        // console.log(HourArray[i]);
        // console.log(weatherResponse.hourly[i].temp)
    }
    //
    var t = document.getElementsByClassName("item_temperature");
    var timeArray = document.getElementsByClassName("item_time");
    var windArray =document.getElementsByClassName("wind_speed");
    var count=3;
    var emotionImg = document.getElementsByClassName("symbol_emotion");

    for(var i = 0 ; i< 7 ; i++)
    {
        if(i!=0)
        {
            // timeArray[i].innerHTML = HourArray[count] + ":00";
        }
        timeArray[i].innerHTML = Weekday[i];

        var temp= parseInt(weatherResponse.hourly[i].feels_like);

        if(temp<10)
        {
            emotionImg[i].style.background="url(\"../assets/images/normal.png\") no-repeat 50% 50%/100% 100%";
        }
        else if(temp<11)
        {
            emotionImg[i].style.background="url(\"../assets/images/normal.png\") no-repeat 50% 50%/100% 100%";
        }
        else
        {
            emotionImg[i].style.background="url(\"../assets/images/normal.png\") no-repeat 50% 50%/75% 75%";
        }

        // weatherImg[i].setAttribute('src',imgName[weatherResponse.hourly[count].weather[0].main]);
        count+=3;
    }

    for(var i=0 ; i< 7; i++)
    {
        // t[i].innerHTML = parseInt(Math.round(weatherResponse.daily[i].temp.day));
        t[i].innerHTML = weatherResponse.hourly[i].feels_like;

        var temp= parseInt(weatherResponse.hourly[i].feels_like);

        if(temp<10)
        {
            windArray[i].innerHTML = "나쁨";
            // emotionImg[i].setAttribute('src','../assets/images/normal.png')
        }
        else if(temp<11)
        {
            windArray[i].innerHTML = "보통";
            // emotionImg[i].setAttribute('src','../assets/images/normal.png')
        }
        else
        {
            windArray[i].innerHTML = "좋음";
            // emotionImg[i].setAttribute('src','../assets/images/smile.png')
        }

        // weatherImg[i+5].setAttribute('src',imgName[weatherResponse.daily[i].weather[0].main]);
    }

    if(weatherResponse.hourly[0].feels_like<10)
    {
        document.getElementById("bar").setAttribute('value',weatherResponse.hourly[0].feels_like*5.5);
        document.getElementsByClassName("sentence")[0].children[0].innerHTML="나쁨";
        document.getElementsByClassName("sentence")[0].children[1].innerHTML="되도록이면 외출을 삼가세요!";
    }
    else if(weatherResponse.hourly[0].feels_like<11)
    {
        document.getElementsByClassName("sentence")[0].children[0].innerHTML="보통";
        document.getElementsByClassName("sentence")[0].children[1].innerHTML="지금은 외출하셔도 좋습니다";
    }
    else if(weatherResponse.hourly[0].feels_like>11)
    {
        document.getElementsByClassName("sentence")[0].children[0].innerHTML="좋음";
        document.getElementsByClassName("sentence")[0].children[1].innerHTML="외출하기에 최적의 날씨입니다";
    }

});