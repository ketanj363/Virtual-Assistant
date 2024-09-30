let btn = document.querySelector("#btn");
let content = document.querySelector("#content");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  const allvoice = speechSynthesis.getVoices()
  text_speak.voice=allvoice[36];
  text_speak.text=text;
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang= "en-IN"; //hi for hindi and en english 
  window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    let day = new Date()
    let hours = day.getHours()
    
    if(hours>=0 && hours<12){
        speak("Good Morning sir")
    } else if(hours>=12 && hours<16){
        speak("Good Afternoon sir")
    }else{
        speak("Good Evening sir")
    }
}
window.addEventListener('load' ,() =>{
    speak("Initialising Changuu...")
    wishMe();
})


let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new speechRecognition()

recognition.onresult = (e) =>{
   let currindex = e.resultIndex
   let transcript = e.results[currindex][0].transcript // here we are getting data from 0 th index and string data in transcript in console
   content.innerText=transcript
   takeCommand(transcript.toLowerCase());
}

//  event i=on btn 
btn.addEventListener('click', () => {
    recognition.start();
    btn.style.display ="none"
    voice.style.display ="block"
})


//  here we are taking commands as actions

function takeCommand(message){
    btn.style.display="flex"
    voice.style.display ="none"
    if (message.includes("hello") || (message.includes("hey"))) {
        speak("Hello sir, what can i help you? ")
    }
    else if (message.includes("how are you")) {
        speak("I'm fine, what about you?")
    }
    else if (message.includes("who are you")) {
        speak("I'm Changu your virtual assistant, created by Ketan Jain")
    }
    else if (message.includes("open youtube")) {
       speak("Opening youtube...")
       window.open("https://youtube.com" , "_blank")
    }
    else if (message.includes("open instagram")) {
        speak("Opening instagram...")
        window.open("https://instagram.com","_blank")
     }
     else if (message.includes("open facebook")) {
        speak("Opening facebook...")
        window.open("https://facebook.com","_blank")
     }
     else if (message.includes("open google")) {
        speak("Opening google...")
        window.open("https://google.com","_blank")
     }
     else if (message.includes("open calculator")) {
        speak("Opening calculator...")
        window.open("calculator://")
     }
     else if (message.includes("open whatsappr")) {
        speak("Opening whatsapp...")
        window.open("whatsapp://")
     }
     else if (message.includes("time")) {
        // text_speak.lang="en-GB"
        let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
     }
     else if (message.includes("date")) {
        // text_speak.lang="en-GB"
        let date = new Date().toLocaleString(undefined,{hour:"numeric",minute:"short"})
        speak(date)
     }
     else if (message.includes("day")) {
        // text_speak.lang.replace="en-GB"
        let day = new Date().toLocaleString(undefined,{day:"2-digit"})
        speak(day)
     }
     else{
        let finaltext = "this is what i found for you" + message.replace("changuu","")
        speak(finaltext)
        window.open(`https://www.google.com/search?q=${message}`)
     }
}
