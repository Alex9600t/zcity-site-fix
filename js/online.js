const servers = [5605898, 5605900];

const getOnlineColor = ((num, max) => {
    const percent = (num / max) * 100;
    console.log(percent);
    if (percent < 33) {
        return('rgb(20, 220, 20)')
    } else if (percent < 66) {
        return('rgb(220, 220, 20)')
    } else if (percent < 88) {
        return('rgb(220, 110, 20)')
    } else {
        return('rgb(220, 20, 20)')
    }
})

const copyTextEvent = ((e, connect) => {
    navigator.clipboard.writeText(`connect ${connect}`);

    document.querySelector('.copiedText').classList.add('show');
    setTimeout(() => {
        document.querySelector('.copiedText').classList.remove('show');
    }, 2000);
})

const drawServer = ((id) => {
    window.fetch(`https://api.gamemonitoring.ru/servers/${servers[id]}`)
    .then((response) => response.json())
    .then((data) => document.querySelector(`.server${id}`).innerHTML = 
    `<br>
    <span style="font-size: 30px;">Server: ${data.response.name}</span> <br>
    <span style="font-size: 12px;">Online: <span style="color: ${getOnlineColor(data.response.numplayers, data.response.maxplayers)}">${data.response.numplayers}/${data.response.maxplayers}</span>.</span> <br>
    <span style="font-size: 12px;">Status: ${data.response.status ? '<span style="color: rgb(0, 253, 0);">Online</span>' : '<span style="color: rgb(253, 0, 0);">Offline</span>'}.</span> <br>
    <span class="connectBtn" style="font-size: 20px;" onClick="copyTextEvent(event, '${data.response.connect}')">connect ${data.response.connect}<span style="font-size: 10px; color: #606060;">(Click to copy)</span></span>
    <br>`);
})


for (let i = 0; i < servers.length; i++) {
    drawServer(i)
}

setInterval(() => {
    for (let i = 0; i < servers.length; i++) {
        drawServer(i)
    }
}, 30000)