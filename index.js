const wrapper = document.querySelector(".wrapper"),
form = wrapper.querySelector("form"),
fileInput = form.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = wrapper.querySelector(".close-button"),
copyBtn = wrapper.querySelector(".copy-button");

function fetchRequest(formData, file){
    infoText.innerText = "Scanning QR Code....";
    // use qr server api to read qr codes
    // sending post request to qr server using fetch api
    // by passing formData as body and getting response with it

    fetch("https://api.qrserver.com/v1/read-qr-code/", {
        method: 'post', body: formData
    }).then(response => response.json()).then((res) => {
        res = res[0].symbol[0].data;
        infoText.innerText = res ? "Upload QR Code to Scan": "Couldn't Scan QR Code";
        if(!res) return;
        wrapper.querySelector("textarea").innerText = res;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active"); 
    }).catch(() => {
        infoText.innerText = "Couldn't Scan QR Code";
    });
};

fileInput.addEventListener("change", e => {
    let file = e.target.files[0]; // getting user selected file
    if(!file) return;
    let formData = new FormData(); // creating a new formdata object
    formData.append("file", file); // adding selected file to formdata
    fetchRequest(formData, file);
})

closeBtn.addEventListener('click',() => {
    wrapper.classList.remove("active");
});

copyBtn.addEventListener('click',() => {
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

form.addEventListener('click', () => fileInput.click());