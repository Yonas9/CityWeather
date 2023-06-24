const form = document.querySelector('form');
const detail = document.querySelector('.details');
const card = document.querySelector('.card');
const icon = document.querySelector('.icon img');
const time = document.querySelector('img.time');

const forcast = new Forcast();



const updateUI = (data)=>{
    //console.log(data)
  const {cityDets,weather} = data;

  const html =`
    <h5 class='my-3'>${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class = "display-4 my-4">
    <span>${weather.Temperature.Metric.Value}<span>
    <span>&deg;C<span>
    </div>
  `
  detail.innerHTML =html;

  if(card.classList.contains('d-none')){
    card.classList.remove('d-none')
  }
  const iconSrc = `../weatherApp/images/icons/${weather.WeatherIcon}.svg`
  icon.setAttribute('src',iconSrc)

  let timeSrc = weather.IsDayTime ? '../weatherApp/images/icons/day.png' : '../weatherApp/images/icons/night.png';
  time.setAttribute('src',timeSrc)
}


form.addEventListener('submit',e=>{
    e.preventDefault();
    const city = form.city.value.trim();
    form.reset();


    forcast.updateCity(city)
    .then(data => updateUI(data))
    .catch(error => console.log(error))

  localStorage.setItem('city',city)

})


if(localStorage.getItem('city')){
    forcast.updateCity(localStorage.getItem('city'))
    .then(data =>updateUI(data))
    .catch(error =>console.log(error))
}