const mainWrapper = document.querySelector("#main-wrapper");
const form = document.querySelector("#main-form");
const contentWrapper = document.querySelector("#main-content");

// ---------- Date -------------
const d = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


// -------- API Details ----------
const url = "https://api.openweathermap.org/data/2.5/weather";
const api_key = "cad0cee603fe85eaad15d312b104fbfc";


// ----------- Adding event listener to the form -----------
form.addEventListener("submit", function(e){
	e.preventDefault();
	let city = e.target.search.value;
	// empty the input
	e.target.search.value = "";
	let reqURL = `${url}?q=${city}&appid=${api_key}&units=metric`;
	// fetch the data
	fetch(reqURL)
		.then(res=>res.json())
		.then(data=>displayWeather(data))
		.catch(err=>console.error(err));
});

// ----------- displayWeather -----------
function displayWeather(data){
	// console.log(data);

	if(data.cod !== "404"){
		// empty the contentWrapper first
		contentWrapper.innerHTML = "";
		let content = `<h1 class="h2 font-weight-bold">${data.name}, ${data.sys.country}</h1>
										<p><span class="badge badge-dark">${days[d.getDay()]} | ${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}</span></p>
										<div class="bg-translucent px-2 py-4 mb-3 rounded-xlg shadow-sm">
											<p class="m-0"><span class="badge badge-dark">${data.weather[0].description}</span></p>
											<h2 class="text-dark display-3 font-weight-bold m-0">${data.main.temp}<sup>o</sup>C</h2>
										</div>`;
		contentWrapper.innerHTML = content;

		// Also change the background
		if(data.main.temp > 10){
			mainWrapper.setAttribute("class", "hot-bg");
		} else {
			mainWrapper.setAttribute("class", "cold-bg");
		}
	} else {
		// empty the contentWrapper first
		contentWrapper.innerHTML = "";
		let content = `<p class="m-0 text-danger font-weight-bold ff-monospace h5"><i class="fa fa-exclamation-triangle"></i> Oops! City not found. Try another... </p>`;
		contentWrapper.innerHTML = content;

		// set the background to default
		mainWrapper.setAttribute("class", "");
	}

}




