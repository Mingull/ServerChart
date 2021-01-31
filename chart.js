makeChart();
async function makeChart() {
    const data = await getAPIData();
    const serverChart = document.getElementById("serverChart").getContext('2d');

    Chart.defaults.global.defaultFontFamily = 'Poppins';
    Chart.defaults.global.defaultFontSize = 12;
    Chart.defaults.global.defaultFontColor = '#777';

    const massPopChart = new Chart(serverChart, {
        type: 'line',
        data: {
            labels: [],//data.requestedAts,
            datasets: [{
                label: 'Online Players',
                data: data.onlinePlayers,
                backgroundColor: 'rgba(255,99,132,0.6)',
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth: 3,
                hoverBorderColor: '#777',
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 1,
                        suggestedMin: 170,
                        suggestedMax: 175
                    }
                }],
                xAxes: [{
                    type: 'realtime'
                }]
            },
            title: {
                display: true,
                text: "Online Players on FastGens"
            },
            animation: {
                duration: 1000,
                easing: 'linear',
                onProgress: function (anim) {
                }
            }
        }
    });

    setTimeout(makeChart, 3000);
}

async function getAPIData() {
    const onlinePlayers = [];
    const requestedAts = [];

    const response = await fetch("https://api.mingull.tk/serverdata?ip=fastgens.minehut.gg");
    const data = await response.json();

    for (var elem in data["data"]) {
        onlinePlayers.push(data["data"][elem].onlinePlayers);
        requestedAts.push(data["data"][elem].requestedAt);
    }
    return { onlinePlayers, requestedAts }
}