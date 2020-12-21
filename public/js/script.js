// get the input
let address = document.getElementById("location");
let btn = document.getElementById("getWeather");
let weatherDetails = document.getElementById("weatherDetails");
btn.addEventListener("click", fetchWeather);

// reg ex for accepting only string
var letters = /^[A-Za-z]+$/;

function fetchWeather(e) {
  weatherDetails.innerHTML = "";
  if (!address.value) {
    e.preventDefault();
    address.focus();
    return alert("please enter a location");
  }
  if (address.value.match(letters)) {
    weatherDetails.innerHTML =
      "<img src='../img/spinner.gif' height='150px' width='150px' alt='loading' />";
    console.log(address.value);
    fetch(`/weather?address=${address.value}`).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          weatherDetails.innerHTML = `
            <ul class="col m6 offset-m3  s12 collection center">
            <li class="collection-item"><span class="red-text">OOPS! Something went wrong, ${data.error}</span></li>
            </ul>`;
          console.log("something went wrong");
          console.log(data.error);
        } else {
          weatherDetails.innerHTML = `
            <ul class="content col m6 offset-m3  s12 collection center">
            <li class="collection-item">Location: <span class="green-text">${data.location}</span></li>
            <li class="collection-item">Country: <span class="green-text">${data.forecast.country}</span></li>
            <li class="collection-item">Region: <span class="green-text">${data.forecast.region}</span></li>
            <li class="collection-item">Localtime: <span class="green-text">${data.forecast.localtime}</span></li>
            <li class="collection-item">Observation Time: <span class="green-text">${data.forecast.obsTime}</span></li>
            <li class="collection-item">Pressure: <span class="green-text">${data.forecast.pressure} Millibar</span></li>
            <li class="collection-item">Humidity: <span class="green-text">${data.forecast.humidity}</span></li>
            <li class="collection-item">Cloudcover: <span class="green-text">${data.forecast.cloudcover}</span></li>
            <li class="collection-item">Temperature: <span class="green-text">${data.forecast.temp} Fahrenheit</span></li>
            <li class="collection-item">Is Day: <span class="green-text">${data.forecast.isDay}</span></li>
            <li class="collection-item">Description: <span class="green-text">${data.forecast.desc}</span></li>
            </ul>`;
          console.log(data);
        }
      });
    });
  } else {
    alert("no spaces, numbers, and special charecters allowed");
  }

  address.value = "";
}

// for (var i = 0; i < array.length; i++) {
//   // Create the list item:
//   var item = document.createElement('li');

//   // Set its contents:
//   item.appendChild(document.createTextNode(array[i]));

//   // Add it to the list:
//   list.appendChild(item);
// }
