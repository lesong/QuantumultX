/*
天气预报 = type=cron,cronexp=00 6-21/3 * * *,script-path=https://raw.githubusercontent.com/deplives/Surge/master/Script/Weather.js,script-update-interval=0
*/

function dateformater(dstr) {
    return dstr.split('T')[0] + " " + dstr.split('T')[1].split('+')[0];
}

function weather() {
    const basicurl = {
        url: "https://api.qweather.com/v7/weather/24h?key=6c267b4dac374418b542d0b504da01df&lang=zh&location=101260101",
        headers: {},
    };
    $httpClient.get(basicurl, function (error, response, data) {
        if (!error) {
            if (response.status == 200) {
                var obj = JSON.parse(data);
                var title = "贵阳未来三小时天气";
                var subtitle = "更新时间: " + dateformater(obj["updateTime"]);
                var hourly1 = dateformater(obj["hourly"][0]["fxTime"]) + "\t" + obj["hourly"][0]["text"] + " | " + obj["hourly"][0]["temp"] + " ℃" + " | " + obj["hourly"][0]["windDir"] + " " + obj["hourly"][0]["windScale"] + "级" + " | " + "降水量: " + obj["hourly"][0]["precip"] + "mm";
                var hourly2 = dateformater(obj["hourly"][1]["fxTime"]) + "\t" + obj["hourly"][1]["text"] + " | " + obj["hourly"][1]["temp"] + " ℃" + " | " + obj["hourly"][1]["windDir"] + " " + obj["hourly"][1]["windScale"] + "级" + " | " + "降水量: " + obj["hourly"][1]["precip"] + "mm";
                var hourly3 = dateformater(obj["hourly"][2]["fxTime"]) + "\t" + obj["hourly"][2]["text"] + " | " + obj["hourly"][2]["temp"] + " ℃" + " | " + obj["hourly"][2]["windDir"] + " " + obj["hourly"][2]["windScale"] + "级" + " | " + "降水量: " + obj["hourly"][2]["precip"] + "mm";
                var hourly = [hourly1, hourly2, hourly3].join("\n");
                let wmation = [title, subtitle, hourly];
                $notification.post(wmation[0], wmation[1], wmation[2]);
            } else {
                console.log("[天气预报] 请求失败");
                console.log("[天气预报] " + reason.error);
            }
        } else {
            console.log("[天气预报] 请求失败");
            console.log("[天气预报] " + reason.error);
        }
    })
}

weather();
$done({});
