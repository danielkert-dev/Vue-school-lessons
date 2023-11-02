<script setup>
// Fetch weather data
import { ref, onMounted, computed, watch } from 'vue'
import weatherCodes from '../assets/weatherCodes';
import locationsList from '../assets/locations';
// import js files
/* https://api.open-meteo.com/v1/forecast?
                              latitude=60.0973&
                              longitude=19.9348&
                              current=temperature_2m&
                              daily=weathercode,
                              temperature_2m_max,
                              temperature_2m_min,
                              precipitation_sum,
                              windspeed_10m_max,
                              winddirection_10m_dominant&
                              windspeed_unit=ms&timezone=auto
                              
*/
// wetherer data variables
const weatherData = ref({
  daily: {
    time: [],
    temperature_2m_max: [],
    temperature_2m_min: [],
    precipitation_sum: [],
    windspeed_10m_max: [],
    winddirection_10m_dominant: [],
  },
});

// Variables that i need
const latitude = ref('60.0973'); // Init if something goes wrong
const longitude = ref('19.9348');
const city = ref('');
const map = ref(null);
const forecast_day = ref(7);
const location = ref('');

const originalLatitude = ref('');
const originalLongitude = ref('');

const weatherAPILink = ref(`https://api.open-meteo.com/v1/forecast?latitude=${latitude.value}&longitude=${longitude.value}&current=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&windspeed_unit=ms&timezone=auto&forecast_days=${forecast_day.value}`);

// Find the position
navigator.geolocation.getCurrentPosition((position) => {
      latitude.value = position.coords.latitude;
      longitude.value = position.coords.longitude;
      originalLatitude.value = position.coords.latitude;
      originalLongitude.value = position.coords.longitude;
      weatherAPILink.value = `https://api.open-meteo.com/v1/forecast?latitude=${latitude.value}&longitude=${longitude.value}&current=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&windspeed_unit=ms&timezone=auto&forecast_days=${forecast_day.value}`;
    })

// Function to fetch weather data based on forecast_day
const fetchWeatherData = async (days, latitude, longitude) => {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&windspeed_unit=ms&timezone=auto&forecast_days=${days}`);
  const data = await response.json();
  weatherData.value = data;
  console.log(data);
};

// When changing locations 
const fetchNewLocation = async (days, location) => {
  fetchWeatherData(days, location.lat, location.lng);
  L.marker([location.lat, location.lng]).addTo(map.value);
}



// Convert from date to week day
const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekdays[date.getDay()];
};

// Reverse geocoding with google
const reverseGeocode = async () => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude.value},${longitude.value}&key=AIzaSyD0oGdI_80F3jm4CWMxwAMbCLvbJArMMsc`);
  const data = await response.json();
  if (data.results.length > 0) {
    city.value = data.results[0].formatted_address;
  } else {
    city.value = 'Unknown';
  }
};


// When mounted
onMounted(async () => {
    const response = await fetch(weatherAPILink.value);
    const data = await response.json();
    weatherData.value = data;
    // find the position with google
    const match = weatherAPILink.value.match(/latitude=([-.\d]+)&longitude=([-.\d]+)/);
  if (match) {
    latitude.value = match[1];
    longitude.value = match[2];
    reverseGeocode();
  }

// Initialize the map inside the onMounted hook
map.value = L.map('map').setView([latitude.value, longitude.value], 10); // Set initial coordinates and zoom level

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map.value);

// Create a marker at the user's coordinates and add it to the map
L.marker([latitude.value, longitude.value]).addTo(map.value);


});
// Get the names of the weather codes
const weatherCodeNames = computed(() => {
  const names = {};
  for (const code in weatherCodes) {
    names[code] = weatherCodes[code];
  }
  return names;
});
// Watch for changes for new forcast period
watch(forecast_day, (newForecastDay) => {
  if (location.value != '') {
    fetchNewLocation(newForecastDay, location.value);
  } else {
  console.log(newForecastDay);
  fetchWeatherData(forecast_day.value, latitude.value, longitude.value);
  }
});

// Watch for changes for new location
watch(location, (newLocation) => {
  if (newLocation === '') {
    window.location.reload();
  }
  console.log(newLocation);
  fetchNewLocation(forecast_day.value, newLocation);
  map.value.setView([newLocation.lat, newLocation.lng], 10); // Set the view to the selected location
})

</script>
<template>
  <main class="container-fluid">
    <div class="border rounded mt-5 mx-5 bg-light">
      <h1 class="text-center my-3"> Weather App </h1>
      <p class="text-center text-muted w-50 mx-auto">This is a weather app showing the weather in your location or other locations. Your location :  {{ city }} ({{ latitude }} - {{ longitude }})<br></p>
    </div>

    <div class="border rounded bg-light mt-5 mx-5">

      <div id="map" style="height: 400px;"></div>
      <select v-model="forecast_day" class="form-select w-50 m-3 mx-auto" aria-label="Default select example">
          <option value="1">1 Day</option>
          <option value="3">3 Days</option>
          <option selected value="7">7 Days</option>
          <option value="14">14 Days</option>
          <option value="16">16 Days</option>
        </select>

        <select v-model="location" class="form-select w-50 m-3 mx-auto" aria-label="Default select example">
          <option selected value="">Your Location</option>
          <option v-for="(loc, index) in locationsList" :key="index" :value="loc">{{ loc.name }}</option>
        </select>
      <div class="row d-flex justify-content-between p-3">
        <!-- Loop through the weather data -->
        <div v-for="(day, index) in weatherData.daily.time" :key="index" class="col-lg-4 my-2">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">{{ getDayOfWeek(day)}} - {{ day }}</h5>
            </div>
            <div class="card-body">
              <p class="card-text">Weather: {{ weatherCodeNames[weatherData.daily.weathercode[index]] }}</p>
              <p class="card-text">Max Temp: {{ weatherData.daily.temperature_2m_max[index] }}°C - Min Temp: {{ weatherData.daily.temperature_2m_min[index] }}°C</p>
              <p class="card-text">Precipitation: {{ weatherData.daily.precipitation_sum[index] }}mm</p>
              <p class="card-text">Max Wind Speed: {{ weatherData.daily.windspeed_10m_max[index] }}m/s</p>
              <p class="card-text">Dominant Wind Direction: {{ weatherData.daily.winddirection_10m_dominant[index] }}°</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

