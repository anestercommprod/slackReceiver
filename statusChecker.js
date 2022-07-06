let lastMsg = "NONE";
var userXoxc = localStorage.getItem("xoxcTokenKey");

loadXoxcFromFile();

 

setInterval(() => {
  checkLatestMessage();
}, 6000);

setTimeout(function()
{ 
  loadXoxcFromFile();

  checkLatestMessage();
  changeIcon_Green();

  changeIcon_styles();

  setTimeout(function()
  { 
    checkLatestMessage();
    changeIcon_Green();
    
    changeIcon_styles();
  }, 100);
}, 1);





//Main func
async function checkLatestMessage()
{
  loadXoxcFromFile();
  userXoxc = localStorage.getItem("xoxcTokenKey");

  var settings = 
  {
      "url": "https://slack.com/api/conversations.history?channel=C01U4DJ20BZ&limit=1",
      "method": "GET",
      "timeout": 0,      
      "headers": 
      {
      "Authorization": "Bearer " + localStorage.getItem("xoxcTokenKey")      
      },
  };
      
      $.ajax(settings).done(function (response) 
      {
        console.log("Message: " + response.messages[0].text + "\nCurrent status: " + localStorage.getItem("curCRM2_Status"));
        
        lastMsg = response.messages[0].text;
        console.log(response);
        //console.log(response.messages[0].text);
        console.log(lastMsg);
      });


      
    if(lastMsg.includes("GO"))
    {
      localStorage.setItem("curCRM2_Status", "1");
    }

    if(lastMsg.includes("STOP"))
    {
      localStorage.setItem("curCRM2_Status", "0");
    }

    console.log("Current CRM2 int Status: " + localStorage.getItem("curCRM2_Status"));
    changeIcon_Green();
}


function changeIcon_Green()
{

    if(localStorage.getItem("curCRM2_Status") == "1")
    {
        console.log("GO BABE GO");
    
        chrome.browserAction.setIcon({path: "icon_green.png"}); 
        
    }

    if(localStorage.getItem("curCRM2_Status") == "0")
    {

        console.log("STOP BABE STOP");
    
        chrome.browserAction.setIcon({path: "icon_red.png"}); 
    }

    console.log("HI BABY < CHECKING");
}


function changeIcon_styles()
{
  if(localStorage.getItem("curCRM2_Status") == "1")
  {
      
    document.getElementById("statusForm").style.backgroundColor = "#4cff4c";
    document.getElementById("statusForm").style.boxShadow = "0 0 48px rgba(0,255,0, 0.5)";  

    document.getElementById("statusFormText").innerHTML = "GO";
      
  }

  else
  {

    document.getElementById("statusForm").style.backgroundColor = "#ff4c4c";
    document.getElementById("statusForm").style.boxShadow = "0 0 48px rgba(255,0,0, 0.5)"; 

    document.getElementById("statusFormText").innerHTML = "STOP";
  }
}




document.getElementById("statusForm").onclick = function ()
{
    console.log("current Xoxc is: " + userXoxc);    

    checkLatestMessage();
    changeIcon_styles();
    

    alert("Проверено. Пожалуйста, не используй эту кнопку больше 3х раз в минуту. Она создаёт большую нагрузку на Slack.")
}








  //Set user xoxc properly
  function loadXoxcFromFile()
  {
            fetch('!token.txt').then(response => response.text()).then(text => localStorage.setItem("xoxcTokenKey", text));

            userXoxc = localStorage.getItem("xoxcTokenKey");
  }

