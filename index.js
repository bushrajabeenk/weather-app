let container1 = document.getElementById("container");
let container2 = document.getElementById("nextcontainer");

async function getWeather() {
  try {
    //question-part-1
    let city = document.getElementById("city").value;
    let res = await fetch(
      // to get temperature in 39.8 not as 398, use units=metric
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&exclude=hourly,minutely,alerts,current&appid=2eb6af51caf1bccebdf06e76fd1f2bb8&units=metric`
    );
    let data = await res.json();
    console.log(data);
    appendData(data);

    // question-part-2
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=current,hourly,minutely&appid=2eb6af51caf1bccebdf06e76fd1f2bb8&units=metric`;
    let resp = await fetch(url);
    let data2 = await resp.json();
    console.log(data2);
    console.log(data2.daily[0].weather[0].icon);
    //console.log(data2.daily[0].temp.min);
    appendData2(data2);
  } catch (err) {
    console.log(err);
  }
}

function appendData(data) {
  // each single time we want new data to replace previously displayed data
  container1.innerHTML = null;

  let div1 = document.createElement("div");
  div1.setAttribute("id", "div1");

  let name = document.createElement("h3");
  name.setAttribute("id", "name1");
  name.innerText = `${data.name}`;

  let temp_max = document.createElement("h3");
  temp_max.innerText = `Max: ${data.main.temp_max}°C`;

  let temp_min = document.createElement("h3");
  temp_min.innerText = `Min: ${data.main.temp_min}°C`;

  let wind = document.createElement("h3");
  wind.innerText = ` Wind Speed: ${data.wind.speed}m/s`;

  let clouds = document.createElement("h3");
  clouds.innerText = `Clouds: ${data.clouds.all}`;

  let sunrise = document.createElement("h3");
  sunrise.innerText = `Sunrise: ${window
    .moment(data.sys.sunrise * 1000)
    .format("HH:mm a")}`;

  let sunset = document.createElement("h3");
  sunset.innerText = `Sunset: ${window
    .moment(data.sys.sunset * 1000)
    .format("HH:mm a")}`;

  div1.append(name, temp_max, temp_min, wind, clouds, sunrise, sunset);

  let div2 = document.createElement("div");

  let iframe = document.createElement("iframe");
  iframe.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBgQBVeDxN3gpwYaImC94iaL0nN7S81tjY&q=${data.name}`;
  iframe.height = `350px`;
  iframe.width = `500px`;
  iframe.style.borderRadius = `10px`;

  div2.append(iframe);

  container1.append(div1, div2);
}

function appendData2(data2) {
  container2.innerHTML = null;

  let day = data2.daily;
  var obj = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
    7: "Sun",
  };

  day.map(function (el, index) {
    let innerDiv = document.createElement("div");
    innerDiv.setAttribute("id", "innerDiv");

    let p1 = document.createElement("h1");
    p1.setAttribute("id", "name");
    p1.innerText = `${obj[index]}`;

    let imgee = document.createElement("img");
    imgee.src = `http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`;

    let p3 = document.createElement("h1");
    var maximum = el.temp.max.toFixed(0);
    p3.innerText = `${maximum}°C`;

    let p4 = document.createElement("h2");
    var minimum = el.temp.min.toFixed(0);
    p4.innerText = `${minimum}°C`;

    let p5 = document.createElement("p");
    p5.innerText = `${el.sunrise}`;

    let p6 = document.createElement("p");
    p6.innerText = `${el.sunset}`;

    innerDiv.append(p1, imgee, p3, p4);

    index++;

    container2.append(innerDiv);
  });
}
