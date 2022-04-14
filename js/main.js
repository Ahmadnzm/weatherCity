let months = ["Janury", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let days = ["Sunday", "Monday", "Tuesday", "Wedneday", "Thursday", "Friday", "Saturday", ]

let cityName = document.querySelector("#cityName");
let cityValue = document.querySelector("#cityValue");
let tmpDegree = document.querySelector("#report_temp");
let tmpSituation = document.querySelector("#report_situation");
let mainContainer = document.querySelector("#main_container");
let dateToday = document.querySelector("#date");
let zoneDate = document.querySelector("#zoneDate");
let warm = document.querySelector(".warm");
let showIcon = document.querySelectorAll(".icon");

cityName.focus();

window.setTimeout(() => {
    warm.style.display = "none"
}, 5000)


let apiData = {
    url: "https://api.openweathermap.org/data/2.5/weather?q=",
    key: "1d5d41331c61c344542aab61d905d313"
}

cityName.addEventListener('keypress', (e) => {
    if (e.charCode === 13) {
        function dataReceive() {
            fetch(`${apiData.url}${cityName.value}&appid=${apiData.key}`).then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        let situationClim = data.weather[0].main
                        let finalyTemp = data.main.temp - 273;
                        tmpDegree.innerHTML = `${Math.floor(finalyTemp)} °C / ${situationClim}`;
                        cityValue.innerText = `${data.name} / ${data.sys.country}`;
                    })
                } else {
                    cityValue.insertAdjacentHTML("afterbegin", `<p id="wrong_message" class="text-center">Please Enter City Name Alright</p>`);
                }
            })
        }
        dataReceive();
        cityName.value = ""
        cityValue.innerHTML = ""
    }
})

function newDate() {
    let newDate = new Date();
    let day = days[newDate.getDay()];
    let month = months[newDate.getMonth()];
    let year = newDate.getFullYear();
    let date = newDate.getDate();

    dateToday.innerHTML = `${day} ${date} ${month} ${year}`
}
newDate();