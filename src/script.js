document.getElementById('menu-toggle').addEventListener('click', function () {
    let menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
});

const apiKey = 'Your_apiKey';
const url = 'https://api.openweathermap.org/data/2.5/air_pollution?lat={LAT}&lon={LON}&appid=' + apiKey;

var map = L.map('map').setView([13.75, 100.49], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

async function getProvinces() {
    try {
        const response = await fetch('thailand_provinces.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching provinces:', error);
        return [];
    }
}

async function getPm25(province) {
    const apiUrl = url.replace('{LAT}', province.lat).replace('{LON}', province.lon);
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.list && data.list[0] && data.list[0].components) {
            const pm25 = data.list[0].components.pm2_5;
            return { name: province.name, pm25: pm25 };
        } else {
            console.log(`No data available for province: ${province.name}`);
            return { name: province.name, pm25: 'No data' };
        }
    } catch (error) {
        console.log(`Error fetching PM2.5 data for province: ${province.name}`, error);
        return { name: province.name, pm25: 'Error' };
    }
}

function getColorByPm25(pm25) {
    if (pm25 < 0 || isNaN(pm25)) return 'gray'; 
    if (pm25 <= 15.0) return 'skyblue';
    if (pm25 <= 25.0) return 'green';  
    if (pm25 <= 37.5) return 'yellow'; 
    if (pm25 <= 75.0) return 'orange'; 
    return 'red'; 
}

async function displayProvincesWithPm25() {
    const provinces = await getProvinces();
    const pm25Promises = provinces.map(province => getPm25(province));
    const pm25DataArray = await Promise.all(pm25Promises);

    pm25DataArray.forEach(pm25Data => {
        const province = provinces.find(p => p.name === pm25Data.name);
        const pm25 = pm25Data.pm25;

        let popupContent = `<b>${pm25Data.name}</b><br>PM2.5: ${pm25 === 'No data' || pm25 === 'Error' ? pm25 : pm25.toFixed(1)}`;
        const color = getColorByPm25(pm25 === 'No data' || pm25 === 'Error' ? 0 : pm25); 

        if (province) {
            const circle = L.circleMarker([province.lat, province.lon], {
                color: color,
                fillColor: color,
                fillOpacity: 1,
                radius: 12,
            }).addTo(map);

          
            L.marker([province.lat, province.lon], {
                icon: L.divIcon({
                    className: 'pm25-icon',
                    html: `<div style="color: black; font-weight: bold; font-size: 10px; text-align: center; line-height: 20px;">${pm25 === 'No data' || pm25 === 'Error' ? 'No data' : pm25.toFixed(0)}</div>`,
                    iconSize: [24, 24],
                    iconAnchor: [12, 12]
                })
            }).addTo(map);

            circle.bindPopup(popupContent);
        }
    });
}

displayProvincesWithPm25();

