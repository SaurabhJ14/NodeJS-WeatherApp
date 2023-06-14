const submitBtn = document.getElementById('submitBtn');
const cityname = document.getElementById('cityname');
const outputCity = document.getElementById('outputCity');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

let now = new Date();

const CurrentDay = () => {
    var weekday = new Array(7);
    weekday[0] = "Sunday"
    weekday[1] = "Monday"
    weekday[2] = "Tuesday"
    weekday[3] = "Wednesday"
    weekday[4] = "Thursday"
    weekday[5] = "Friday"
    weekday[6] = "Saturday"

    var todayday = weekday[now.getDay()];
    console.log(todayday);
    let day = document.getElementById('day');
    day.innerText = todayday;
};

const CurrentDate = now.getDate();

const CurrentMonth = () => {
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]

    var getMonth = months[now.getMonth()]
    // console.log(getMonth);
    let month = document.getElementById('today_date')
    month.innerText = `${CurrentDate} ` + getMonth;
} 

CurrentMonth();
CurrentDay();
// console.log(CurrentDate)

const getInfo = async (event) => {
    //will not reload page after clicking search
    event.preventDefault();
    let cityVal = cityname.value;
    if (cityVal == "") {
        outputCity.innerText = `City can not be blank`;
        datahide.classList.add('data_hide');
    }
    else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=46562720d8422929c2e66713a0e56317`
            const response = await fetch(url);
            const data = await response.json();
            // console.log(data);
            const arrData = [data];

            outputCity.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;

            const tempMood = arrData[0].weather[0].main;
            
            // condition to check sunny or cloudy
            if (tempMood == 'Clear')
                temp_status.innerHTML = 
                "<i class='fa-solid fa-sun fa-beat' style='color: #f0e933;'></i>"
            else if (tempMood == 'Clouds')
                temp_status.innerHTML = 
                "<i class='fa-solid fa-cloud' style='color: #bbd5fc;'></i>"
            else if (tempMood == 'Rain')
                temp_status.innerHTML = 
                "<i class='fa-solid fa-cloud-rain' style='color: #99caf0;'></i>"
            else 
                temp_status.innerHTML = 
                "<i class='fa-solid fa-cloud-sun' style='color: #e9f0fb;'></i>"
                // "<i class='fa-duotone fa-cloud-sun-rain' style='--fa-primary-color: #aac1e9; --fa-secondary-color: #ded83b;'></i>"

                datahide.classList.remove('data_hide');
        }
        catch {
            outputCity.innerText = `Please Enter a valid City Name`;
            datahide.classList.add('data_hide');
        }
    }
}

submitBtn.addEventListener('click', getInfo);

