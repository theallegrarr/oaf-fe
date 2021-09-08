// sample route api/customers/all
// methods; GET, POST, PUT, DELETE
// token from local storage
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjMxMDM3MzA0LCJleHAiOjE2NjI1OTQ5MDR9.DqZhBz-TG3DL5bARBDt5UkMH1258b_CA6BfRG-qO_mA"

export default function apiCall(method, route, data, cb){
    let token = localStorage.getItem("oaf_token")
    let jsonData = JSON.stringify(data)
    
    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjMxMDM3MzA0LCJleHAiOjE2NjI1OTQ5MDR9.DqZhBz-TG3DL5bARBDt5UkMH1258b_CA6BfRG-qO_mA"
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            cb(this.responseText)
        }
    });

    xhr.open(method, `http://localhost:6273/${route}`);
    xhr.setRequestHeader("Authorization", token);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = false

    method === "POST" ? xhr.send(jsonData) : xhr.send();
}