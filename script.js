

let long;
let lat;
let temperatureDegree = document.querySelector(".temperature-degree");
let timeZone = document.querySelector(".location-description");
let temperatureDescription = document.querySelector(".temperature-description");
let locationIcon = document.querySelector(".location-icon");
let locationCity = document.querySelector(".location-city");
let cityName = document.querySelector("#cityName");
let flag = 0;
let url = '';
// location.reload();
// document.querySelector(".degree-section").preventDefault();

window.addEventListener("load", theEntireThing());
cityName.addEventListener("keydown", function (e) {

    if (e.key == "Enter" && cityName.value !== "") {
        const city = cityName.value;
        url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=ae7cf339c74241a383a60c399967c659&include=minutely`;
        cityName.value = "";
        flag = 1;
        theEntireThing();


    }




})
document.querySelector(".degree-section").addEventListener("click", function () {
    let prevDegree = document.querySelector(".temperature span").textContent;
    let value = Number(document.querySelector(".temperature-degree").textContent)

    console.log("old temp" + value);
    console.log("old degree" + prevDegree);
    if (prevDegree.includes("°C")) {

        prevDegree = "°F";
        value = ((9 / 5) * value) + 32;


    }
    else {
        prevDegree = "°C";
        value = (5 / 9) * (value - 32);


    }
    console.log("new temp" + value);
    console.log("new degree" + prevDegree);
    document.querySelector(".temperature span").textContent = prevDegree;
    document.querySelector(".temperature-degree").textContent = value.toFixed(1);

})






function theEntireThing() {
    {

        // tempConverter();



        function getIcon(iconDescription, iconCode) {
            iconDescription = iconDescription.toUpperCase();
            let target;
            if (iconDescription.includes("CLEAR") && iconCode.includes("d")) {
                target = "CLEAR_DAY";
            }
            else if (iconDescription.includes("CLEAR") && iconCode.includes("n")) {
                target = "CLEAR_NIGHT";
            }
            else if (iconDescription.includes("CLOUDS") && (iconDescription.includes("FEW") || iconDescription.includes("SCATTERED") || iconDescription.includes("BROKEN")) && iconCode.includes("d")) {
                target = "PARTLY_CLOUDY_DAY";
            }
            else if (iconDescription.includes("CLOUDS") && (iconDescription.includes("FEW") || iconDescription.includes("SCATTERED") || iconDescription.includes("BROKEN")) && iconCode.includes("n")) {
                target = "PARTLY_CLOUDY_NIGHT";
            }
            else if (iconDescription.includes("CLOUDS") && iconDescription.includes("OVERCAST")) {
                target = "CLOUDY";
            }
            else if (iconDescription.includes("THUNDERSTORM") || iconDescription.includes("RAIN") || iconDescription.includes("DRIZZLE") && (!(iconDescription.includes("SNOW")))) {
                target = "RAIN";
            }
            else if (iconDescription.includes("SLEET")) {
                target = "SLEET";
            }
            else if (iconDescription.includes("SNOW") || iconDescription.includes("FLURRIES")) {
                target = "SNOW";
            }
            else if (iconDescription.includes("MIST") || iconDescription.includes("SMOKE") || iconDescription.includes("HAZE") || iconDescription.includes("FOG")) {
                target = "FOG";
            }
            else if (iconDescription.includes("SAND") || iconDescription.includes("DUST")) {
                target = "WIND";
            }
            return target;

        }

        function setIcons(code, DOMid) {
            const skycons = new Skycons({ color: "black" });
            skycons.play();
            return skycons.set(DOMid, Skycons[code]);
        }


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                // console.log(position);

                // const apiKey="44ad01b17435186ecc995edafe151d01";
                // const apiProxy=`https://cors-anywhere.herokuapp.com/`;
                // const api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ce5e0fd9fda94ee8f6fdb65238aa1290
                // `;
                if (flag === 0) {

                    url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=ae7cf339c74241a383a60c399967c659&include=minutely`;

                }
                // cityName.addEventListener("keydown", function (e) {

                //     if (e.key == "Enter" && cityName.value !== "") {
                //         url = `https://api.weatherbit.io/v2.0/current?city=${cityName.value}&key=ae7cf339c74241a383a60c399967c659&include=minutely`
                //         console.log(url);


                //     }
                // })


                fetch(url)
                    .then(response => {
                        return response.json();
                    })
                    .then(Data => {
                        console.log(Data);
                        const { temp, timezone, weather, city_name } = Data.data[0];
                        console.log(weather)
                        temperatureDegree.textContent = temp;
                        timeZone.textContent = timezone;
                        locationCity.textContent = city_name;
                        temperatureDescription.textContent = weather["description"];
                        // locationIcon.textContent=weather["icon"];
                        let skyconIconCode = getIcon(weather["description"], weather["icon"]);
                        // console.log(skyconIconCode);
                        console.log(setIcons(skyconIconCode, document.getElementById("icon1")));
                        tempConverter();
                        console.log(temp);


                    }).catch(() => {

                        document.body.style.backgroundImage = "404.jpg";

                    })
            })

        }
        else {
            document.body.style.backgroundImage = "404.jpg";
        }
    }

}
// location.reload();