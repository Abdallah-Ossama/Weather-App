//create a new date instance dynamically with JS
let dataInfo = new Date();
let nowDate = (dataInfo.getMonth()+1)+'.'+ dataInfo.getDate()+'.'+ dataInfo.getFullYear();
//My API key
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=acdb22f4cf0c64510bbb4f9b08765569&units=imperial";
const myServer = "http://127.0.0.1:5000";

// Global Variables 
const generate = document.getElementById("generate");
//main code 

const onClickFun = () => {
  getDate().then(newDetails());
}


const getDate = async () =>{
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  if(zip == ""){
    window.alert("you should write zip code")
  }

  try{
    const res = await fetch(baseURL+zip+apiKey);
    data = await res.json();

      myDate = {
      temp:data.main.temp,
      city:data.name,
      feelings:feelings,
      date:nowDate
    }
    postData(`${myServer}/addDate`,myDate);
    return data;
  }
  catch(error){
    console.log("error",error);
  }
}

generate.addEventListener("click",onClickFun);

const postData = async(url="",data={}) => {
  const res = await fetch(url,{
    method:"POST",
    credentials:"same-origin",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(data),
  });
  try{
    const Myinfo = await res.json();
    console.log("your date temperature is ",Myinfo);
    return Myinfo;
  }
  catch(error){
    console.log("error",error);
  }
}

const newDetails = async () =>{
  const res = await fetch(myServer+"/allDate");
  try{
      const allDate = await res.json();
      const TEMP = Math.round((allDate.temp-32)/1.8);

      document.getElementById('city').innerHTML = "city: " + allDate.city;
      document.getElementById('temp').innerHTML = "temp: " + TEMP + " deg";
      document.getElementById('feel').innerHTML = "feelings: " + allDate.feelings;
      document.getElementById('date').innerHTML = "date: " + allDate.date;
    }
  catch(error){
    console.log("error",error);
  }
}
