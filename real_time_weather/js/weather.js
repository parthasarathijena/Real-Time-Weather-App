
var data;
let city_name;
function search_city(){
    city_name = document.getElementById('city').value;
    if(city_name==='')
    city_name='paradip';
    // console.log(city_name);
    let api_url =  "https://api.openweathermap.org/data/2.5/weather?q="+city_name+"&units=imperial&appid=cff8589e7f206ef1e4f1b4f8633ed564";
    async function getapi(url) 
{
    const response = await fetch(url);
    if(response.status === 404){
        alert("wrong city!")
        return;
    }
    
    data = await response.json();

    var years = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Nov','Dec'];
    var days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    var utcdates = data['dt'];
    var date = new Date(utcdates*1000);
    let all = '';
    var hours = date.getHours(utcdates);
    var minutes = date.getMinutes(utcdates);
    if(minutes<10)
    minutes = '0'+minutes;
    if(hours>=12)
        all = all+hours-12+':'+date.getMinutes(utcdates)+' PM, ';
    else
        all = all+hours+':'+date.getMinutes(utcdates)+' AM, ';
    all = all+days[date.getDay(utcdates)-1]+', ';
    all = all+years[date.getMonth(utcdates)]+' ';
    all = all+date.getDate(utcdates)+', ';
    all = all+date.getFullYear(utcdates);
    document.getElementById('input1').innerHTML = all;
    document.getElementById('image1').src = "http://openweathermap.org/img/wn/"+data['weather'][0]['icon']+"@2x.png";
    let sups = "°F";
    document.getElementById("temp").innerHTML=''+Math.round(data['main']['temp'])+sups.sup();
    document.getElementById("weather_main").innerHTML=data['weather'][0]['main'];
    document.getElementById("humid").innerHTML=''+data['main']['humidity']+'%';
    document.getElementById("wind_speed").innerHTML=''+data['wind']['speed']+'km/j';
}
initial_setup(0);
getapi(api_url);
}
var myChart = new Chart(ctx, {});
var ctx;
function initial_setup(initial_no){
    
var tempdata;
var futuredata;
async function getapi_temp(url) 
{
    var four_block = new Array(4);
    const response = await fetch(url);
    tempdata = await response.json();
    futuredata = new Array(tempdata['list'].length);
    for(var i =0;i<tempdata['list'].length;i++){
        futuredata[i] = new Array(5);
        var s = "";
        for(var  j =0;j<tempdata['list'][i]['dt_txt'].length;j++){
            if(tempdata['list'][i]['dt_txt'][j]===' '){
                futuredata[i][0] = s;
                s = "";
            }
            else
                s+=tempdata['list'][i]['dt_txt'][j];
        }
        futuredata[i][1] = s;
        futuredata[i][2] = tempdata['list'][i]['main']['temp'];
        futuredata[i][3] = tempdata['list'][i]['main']['humidity'];
        futuredata[i][4] = tempdata['list'][i]['weather'][0]['icon'];
        // console.log("temp "+futuredata[i][0]+" "+futuredata[i][2]);
    }
    var years = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Nov','Dec'];
    var label_y= new  Array();
    var label_x = new Array();
    let count  = 1,prev=futuredata[0][0],humid_per=futuredata[0][3],per_cnt =1;
    for(var i =1;i<futuredata.length;i++){
        if(count<=4){
                if(futuredata[i][0]==prev && count<=4){
                humid_per+=futuredata[i][3];
                per_cnt++;
            }
            else{
                var month_num = ''+prev[5]+prev[6];
                let date_num = ''+prev[8]+prev[9];
                month_num = years[(parseInt(month_num))-1];
                // console.log(month_num);
                document.getElementById('dt'+count).innerHTML = ''+month_num+" "+date_num;
                document.getElementById('img'+count).src = "http://openweathermap.org/img/wn/"+futuredata[i-per_cnt][4]+"@2x.png";
                document.getElementById('per'+count).innerHTML = Math.round(humid_per/per_cnt)+'%';
                prev = futuredata[i][0];
                per_cnt=1;
                count++;
                humid_per=futuredata[i][3];
        }
    }
        if(futuredata[initial_no][0]==futuredata[i][0]){
            label_y.push(futuredata[i][1]);
            label_x.push(futuredata[i][2]);
        }
    }
    console.log(label_x);
    myChart.destroy();
    ctx = document.getElementById('canvas').getContext('2d');
myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: label_y,
        datasets: [{
            label: 'Temperature',
            data: label_x,
            backgroundColor: '#00ffff' ,
            borderColor: '#6495ed',
            // color:'#000000',
            // backgroundColor: fillPattern,
            borderWidth: 2.5,
            fill : 'start'
        }    
    ]
    },
    options: {
        plugins: {
            filler: {
                propagate: true
            }
        },
        elements:{
            line:{
                tension:0.4
            }
        },
        scales: {
            y: {
                // display: false,
                beginAtZero: false
            }
        }
    }
});
}
var url =  "https://api.openweathermap.org/data/2.5/forecast?q="+city_name+"&units=imperial&appid=cff8589e7f206ef1e4f1b4f8633ed564";
getapi_temp(url);
}
search_city('cuttack');










