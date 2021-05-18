let place=document.getElementById("location");
let tempIcon =document.getElementById("temp_icon");
let tempValue=document.getElementById("temp-value");
let climate =document.getElementById("climate");



window.addEventListener('load', () => {
    
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy ="https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9c3cb50c1d0992f66ebee7b697bd1a41`;


            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                  const{name} =data;
                  const{feels_like} =data.main;
                  const{id,main} =data.weather[0];
                
                  place.textContent=name;
                  climate.textContent=main;
                  tempValue.textContent= Math.round(feels_like-273);
                  if(id<250){
                      tempIcon.src='./storm.png';
                  }
                  else if(id<350){
                    tempIcon.src='./drizzle.png';
                  }
                  else if(id<550){
                    tempIcon.src='./rain.png';
                }
                else if(id<650){
                    tempIcon.src='./snow.png';
                }
                else if(id<800){
                    tempIcon.src='./atmosphere.png';
                }
                else if(id===800){
                    tempIcon.src='./clear.png';
                }
                else if(id>800){
                    tempIcon.src='./clouds.png'
                }
                
                    console.log(data);
                });

        });

    }
});