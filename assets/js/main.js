var sLocation="Busan";
var coord = {}
coord['SEOUL'] = 'lat=37.566631&lon=126.978225';
coord['BUSAN'] = 'lat=35.179703&lon=129.075028';
coord['GWANGJU'] = 'lat=37.428510&lon=127.254775';
coord['INCHEON'] = 'lat=37.455862&lon=126.705788';
coord['JEONJU'] = 'lat=35.823941&lon=127.384508';
coord['DAEJUN'] = 'lat=36.350379&lon=127.384508';
coord['IKSAN'] = 'lat=35.948046&lon=126.957514';
coord['ULSAN'] = 'lat=35.538524&lon=129.311592';

var imgName={}
imgName['Clear'] = '../assets/images/wi-day-sunny.svg'
imgName['Clouds'] = '../assets/images/wi-cloudy.svg'
imgName['Rain'] = '../assets/images/wi-day-rain-mix.svg'

var Weekday=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

//요청 초과하지 않기!!
var Key = 'e4402e4d703a276e5ed68d482b138995';

async function getWeather(sCityId)
{
    return await (await fetch('https://api.openweathermap.org/data/2.5/onecall?' +coord[sCityId] +'&exclude=minutely&units=metric&lang=kr&appid=' + Key)).json();
}

window.addEventListener('load', async function()
{
    city_click('SEOUL');
});

async function city_click(cityId)
{
    var weatherResponse = await getWeather(cityId);

    document.getElementsByClassName("city")[0].innerHTML = cityId;
    console.log(weatherResponse);
    var today = new Date(weatherResponse.hourly[0].dt*1000);

    document.getElementsByClassName("date")[0].innerHTML = Weekday[today.getDay()] + ' ' + parseInt(today.getMonth()+1) + '/' + today.getDate();
    var HourArray= new Array();
    var RealData = new Array();
    var Hour_now;
    for(var i = 0 ; i< weatherResponse.hourly.length; i++)
    {
        // console.log(weatherResponse.hourly[i].weather[0].main);
        console.log(weatherResponse.hourly[i].weather[0].description);
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
    }

    var t = document.getElementsByClassName("item_temperature");
    var timeArray = document.getElementsByClassName("item_time");
    var windArray =document.getElementsByClassName("wind_speed");
    var count=0;
    var weatherImg = document.getElementsByClassName("symbol_weather");

    for(var i = 0 ; i< 5 ; i++)
    {
        // console.log(weatherResponse.hourly[count].temp);
        t[i].innerHTML = parseInt(Math.round(weatherResponse.hourly[count].temp));
        windArray[i].innerHTML = weatherResponse.hourly[count].wind_speed + " m/s";
        if(i!=0)
        {
            timeArray[i].innerHTML = HourArray[count] + ":00";
        }

        weatherImg[i].setAttribute('src',imgName[weatherResponse.hourly[count].weather[0].main]);
        count+=3;
    }

    for(var i=0 ; i< 7; i++)
    {
        t[i+5].innerHTML = parseInt(Math.round(weatherResponse.daily[i].temp.day));
        weatherImg[i+5].setAttribute('src',imgName[weatherResponse.daily[i].weather[0].main]);
    }
}

window.onkeydown=function()
{
    console.log(event.keyCode);
    var code={};

    var temp = document.getElementsByClassName("item_temperature")[0].innerHTML;
    var Text = "현재 온도는 " + temp + "도 입니다.";
    if(event.keyCode==13)
    {
        speak(Text,{
            rate: 0.8,
            pitch: 1.2,
            lang: "ko-KR"}
        );
    }
}

function speak(text, opt_prop) {
    if (typeof SpeechSynthesisUtterance === "undefined" || typeof window.speechSynthesis === "undefined") {
        alert("이 브라우저는 음성 합성을 지원하지 않습니다.");
        return;
    }

    window.speechSynthesis.cancel(); // 현재 읽고있다면 초기화

    const prop = opt_prop || {};

    const speechMsg = new SpeechSynthesisUtterance();
    speechMsg.rate = prop.rate || 1; // 속도: 0.1 ~ 10
    speechMsg.pitch = prop.pitch || 1; // 음높이: 0 ~ 2
    speechMsg.lang = prop.lang || "ko-KR" ;
    speechMsg.text = text;

    // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
    window.speechSynthesis.speak(speechMsg);
}