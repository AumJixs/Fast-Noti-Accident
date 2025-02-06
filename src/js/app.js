// Fetch Token
const setting = document.getElementById('setting');
// const alert_token = document.getElementById('token-alert');

setting.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = "https://line.me/R/ti/p/@223vjkcm?oat_content=qr";
    link.target = "_blank";
    link.click();
});

// Initialize map
var map = L.map('map').setView([13.736717, 100.523186], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Geolocation
if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
} else {
    navigator.geolocation.getCurrentPosition(getPosition, handleGeolocationError);
}

var marker, circle;

function getPosition(position) {
    console.log(position);

    var lat = 10.727342;
    var long = 99.374299;
    
    // var lat = position.coords.latitude;
    // var lng = position.coords.longitude;
    var acc = position.coords.accuracy;

    if (marker || circle) {
        map.removeLayer(marker);
        map.removeLayer(circle);
    }

    marker = L.marker([lat, long]);
    circle = L.circle([lat, long], { radius: acc });

    var featureGroup = L.featureGroup([marker, circle]).addTo(map)
        .bindPopup('This is your location');
    map.fitBounds(featureGroup.getBounds());
}

function handleGeolocationError(error) {
    console.error('Error getting geolocation:', error.message);
}

// Custom Markers
const customMarker = L.divIcon({
    className: 'custom-marker',
    iconSize: [25, 25],
});

const locationList = [
    [10.49665686732214, 99.18516576290132],
    [10.496340340662089, 99.18454885482788],
    [10.495654206144177, 99.18267130851747],
    // [10.496340340662089, 99.18454885482788],
    [10.497701754894452, 99.18317556381226]
];

const markerList = [];

locationList.forEach((coords) => {
    const marker = L.marker([coords[0], coords[1]], { icon: customMarker }).addTo(map);
    markerList.push(marker);
});

const accidentDetails = [
    { location: 'สี่แยกโรงพยาบาล', accident: 'รถพลิกคว่ำ', fire: 'เกิดไฟไหม้🔥', time: '23/01/2024 14:01:35', src: './resources/assets/video/fire-accident.mp4', explain: 'มีรถที่กำลังลุกไหม้และรถที่กำลังอยู่บนพื้น' },
    { location: 'สามแยกโรงเรียน', accident: 'ไม่เกิดอุบัติเหตุ', fire: 'ไม่เกิดไฟไหม้🍀', time: '23/01/2024 15:30:10',src: './resources/assets/video/iP-Camera.mp4', explain: 'ตัวอย่างภาพวิดีโอจากกล้องวงจรปิด' },
    { location: 'แยกตลาด', accident: 'มอเตอร์ไซค์ล้ม', fire: 'ไม่เกิดไฟไหม้🍀', time: '23/01/2024 14:15:20', src: './resources/assets/video/motorcycle.mp4', explain: 'มีคนนั่งอยู่บนถนนและมีรถมอเตอร์ไซต์พลิกคว่ำอยู่' },
    { location: 'ตัวอย่าง', accident: 'รถชนมอเตอร์ไซค์', fire: 'ไม่เกิดไฟไหม้🍀', }
];

markerList.forEach((marker, index) => {
    marker.on('click', () => displayShow(index));
});

// Elements
const videoInput = document.getElementById('upload-file');
const video = document.getElementById('video');

const getTimestamp = () => {
    const now = new Date();

    const addLeadingZero = (num) => (num < 10 ? `0${num}` : num);

    const day = addLeadingZero(now.getDate());
    const month = addLeadingZero(now.getMonth() + 1);
    const year = now.getFullYear();
    const hours = addLeadingZero(now.getHours());
    const minutes = addLeadingZero(now.getMinutes());
    const seconds = addLeadingZero(now.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function displayShow(index) {
    if (index == 3) {
        document.getElementById('overlay').classList.remove('hidden');
        document.getElementById('popup').classList.remove('hidden');
        document.getElementById('upload-file').classList.remove('hidden');
        document.getElementById('video').classList.add('hidden');

        videoInput.addEventListener('change', async (e) => {
            document.getElementById('status').classList.remove('hidden');

            await sleep(5000);

            if (e.target.files && e.target.files[0]) {
                // Check if the file name is 'india.mp4'
                if (e.target.files[0].name === 'india.mp4') {
                    // สร้าง URL สำหรับไฟล์ที่เลือก
                    var media = URL.createObjectURL(e.target.files[0]);

                    // ตั้งค่า src ของ video element เป็น URL ของไฟล์ที่เลือก
                    video.src = media;
                    document.getElementById('status').classList.add('hidden');

                    // โหลดวิดีโอ
                    video.load();

                    video.classList.remove('hidden');
                    video.play();

                    document.getElementById('cctv-location').innerHTML = accidentDetails[3]['location'];
                    document.getElementById('accident-detail').innerHTML = accidentDetails[3]['accident'];
                    document.getElementById('fire-detail').innerHTML = accidentDetails[3]['fire'];
                    document.getElementById('time-detail').innerHTML = getTimestamp();
                    document.getElementById('description-detail').innerHTML = 'มีรถคันหนึ่งจอดอยู่ข้างถนนและมีควันพวยพุ่งออกมา';
                    console.log('Successfully loaded video');
                } else {
                    console.log("Isn't a Testing File");
                }
            }
        })
    } else {
        // Handle other indices
        if (index == 1) {
            document.getElementById('overlay').classList.remove('hidden');
            document.getElementById('popup').classList.remove('hidden');
            document.getElementById('video').classList.remove('hidden');
            document.getElementById('upload-file').classList.add('hidden');
            document.getElementById('cctv-location').innerHTML = accidentDetails[index]['location'];
            document.getElementById('accident-detail').innerHTML = accidentDetails[index]['accident'];
            document.getElementById('fire-detail').innerHTML = accidentDetails[index]['fire'];
            document.getElementById('time-detail').innerHTML = accidentDetails[index]['time'];
            document.getElementById('description-detail').innerHTML = accidentDetails[index]['explain'];
            document.getElementById('video').src = accidentDetails[index]['src'];
        } else {
            document.getElementById('overlay').classList.remove('hidden');
            document.getElementById('popup').classList.remove('hidden');
            document.getElementById('video').classList.remove('hidden');
            document.getElementById('upload-file').classList.add('hidden');
            document.getElementById('cctv-location').innerHTML = accidentDetails[index]['location'];
            document.getElementById('accident-detail').innerHTML = accidentDetails[index]['accident'];
            document.getElementById('fire-detail').innerHTML = accidentDetails[index]['fire'];
            document.getElementById('time-detail').innerHTML = accidentDetails[index]['time'];
            document.getElementById('description-detail').innerHTML = accidentDetails[index]['explain'];
            document.getElementById('video').src = accidentDetails[index]['src'];
        }
    }

    document.getElementById('close-popup').addEventListener('click', () => {
        document.getElementById('overlay').classList.add('hidden');
        document.getElementById('popup').classList.add('hidden');
    });
}

// Routing Machine Variables
const geocoder = L.Control.Geocoder.nominatim();
let routingControl = null;

// Add Route Finding Functionality
document.getElementById('route-btn').addEventListener('click', () => {
    const endIndex = parseInt(document.getElementById('end-location').value, 10);

    if (isNaN(endIndex) || endIndex < 0 || endIndex >= locationList.length) {
        console.error("Invalid end location index.");
        return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const lat = 10.7236604;
        const lng = 99.3770694;

        console.log('Current Location:', lat, lng);
        console.log('Destination:', locationList[endIndex][0], locationList[endIndex][1]);

        // ลบ routingControl เดิมก่อนสร้างใหม่
        if (routingControl) {
            map.removeControl(routingControl);
            routingControl = null;
        }

        // สร้างเส้นทางจากตำแหน่งปัจจุบันไปยัง locationList[endIndex]
        routingControl = L.Routing.control({
            waypoints: [
                L.latLng(lat, lng), // จุดเริ่มต้น
                L.latLng(locationList[endIndex][0], locationList[endIndex][1]) // จุดหมายปลายทาง
            ],
            routeWhileDragging: true,
            geocoder: geocoder,
            router: L.Routing.osrmv1({
                serviceUrl: 'https://router.project-osrm.org/route/v1'
            }),
            lineOptions: {
                styles: [{ color: 'blue', opacity: 0.7, weight: 5 }]
            },
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: true
        }).addTo(map);

        // Fit map to route bounds
        map.fitBounds([
            [lat, lng],
            [locationList[endIndex][0], locationList[endIndex][1]]
        ]);
    }, (error) => {
        console.error('Error getting current location:', error.message);
    });
});
