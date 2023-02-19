function msg() {
    alert("记得天天好心情！");
}

async function IPweather(){
	//通过高德获取当前地址
	let ip = await fetch(`https://restapi.amap.com/v3/ip?key=${amapkey}`);
	let ipjson =await ip.json();
	document.getElementById("IP").innerHTML = ipjson.city;
	console.log(ipjson);
	//通过高德获取的地址在和风天气城市信息API获取当前城市LocationID
	let location = await fetch(`https://geoapi.qweather.com/v2/city/lookup?number=1&location=${ipjson.city}&key=${hefeng}`)
	let locationjson = await location.json();
	console.log(locationjson);
	//解析后的LocationID传给实时天气API
	let weather = await fetch(`https://devapi.qweather.com/v7/weather/now?location=${locationjson.location[0].id}&key=${hefeng}`);
	let weatherjson = await weather.json();
	document.getElementById("weather-temperature").innerHTML = weatherjson.now.temp + "℃";
	document.getElementById("weather-icon").setAttribute("src","icon/weather_icons/"+weatherjson.now.icon+".svg");	
}

const amapkey = 'c7785131961199ba63ae2a31493d755c';
const hefeng = '545989e12d5c4147a6d67cf6a5f97be6';

IPweather();