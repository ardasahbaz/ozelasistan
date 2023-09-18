
"use strict";
        


let gorevListesi = [];


 //locale kaydetmesi için bu işlemi yapıp içeriğini bütün işlemlerin altına eklemek//
if (localStorage.getItem("gorevListesi") !== null) {
    gorevListesi = JSON.parse(localStorage.getItem("gorevListesi"));
}



//background color değiştirme mantığı tıklamayla//

function green(){
    document.getElementById("ColorBody").style.backgroundColor="green"
}
// Basitçe Id'si ColorBody olan elementi seçtim ve stil(style) backgroundColor özelliği ile seçili olan elemente yeşil(green) rengini verdim
function blue(){
    document.getElementById("ColorBody").style.backgroundColor="rgb(127, 127, 228)"
}

function white(){
    document.getElementById("ColorBody").style.backgroundColor="white"
}

function pink(){
    document.getElementById("ColorBody").style.backgroundColor="pink"
}

function black(){
    document.getElementById("ColorBody").style.backgroundColor="black"
}






const btnClear = document.querySelector("#btnClear");

displayTasks();   // DURSUN DİYE SONLARA //





// HTML TARAFI NEYİN SONUNA EKLENECEĞİNİ NE BİÇİMDE EKLENECEĞİ ALICAĞI İD AD LAR //

function displayTasks() {
    let ul = document.getElementById("task-list");
    ul.innerHTML = "";


    //boşsa boş olduğunu belirten not değilse normal akışına devam all delete işlemi sonrası için //
     if(gorevListesi.length==0){
        ul.innerHTML  =  "<p class='p-3 m-0'>Not listeniz boş.</p>"
     } else {


    for(let gorev of gorevListesi) {

        let win = gorev.durum == "win" ? "checked": "";  // kontrol win lose tarafı //


        let li = `
            <li class="task list-group-item">
                <div class="form-check">
                    <input type="checkbox" onclick="updateStatus(this)" id="${gorev.id}" class="form-check-input" ${win}>
                    <label for="${gorev.id}" class="form-check-label ${win}">${gorev.gorevAdi}</label>
                </div>
            <div class="dropdown">
            <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-ellipsis"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a onclick="deleteTask(${gorev.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash-can"></i> Sil</a></li>
            </ul>
        </div>
        `;
        
        ul.insertAdjacentHTML("beforeend", li);           

    }
 }
}











// EKLEME İŞLEMİ PUSH //


document.querySelector("#btnAddNewTask").addEventListener("click", newTask);
document.querySelector("#btnAddNewTask").addEventListener("keypress", function(){
    if (event.key == "Enter") {
        document.getElementById("btnAddNewTask").click();
    }
});

function newTask(event) {
    
    let taskInput = document.querySelector("#txtTaskName");

    if(taskInput.value == "") {
        alert("görev girmelisiniz");
    }
     else {
        gorevListesi.push({"id": gorevListesi.length + 1, "gorevAdi": taskInput.value});
        taskInput.value = "";
        displayTasks();
        showAlert('Görev Ekleme İşlemi Uyguladınız.', 'success');
    }

    event.preventDefault();
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
}      







// SİLME İŞLEMİ DELETE // 


function deleteTask(id) {

    let deletedId;
    
    for(let index in gorevListesi) {
        if(gorevListesi[index].id == id) {
            deletedId = index;
            showAlert('Görevi Silme İşlemi Uyguladınız.', 'danger');
        }
    }
    
    gorevListesi.splice(deletedId, 1);
    displayTasks();
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
}







// all silme işlemi confirmle yanlış tıklamayı engelleme amacı //


btnClear.addEventListener("click", function(){

    let a = confirm("Emin Misiniz?");

    if(a){
        gorevListesi.splice(0 , gorevListesi.length);
    } 
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
   displayTasks();

} )






//kontrolleri sağlayıp win lose durumunu bulup css de verilen renk üstü çizilme işleminin parçası//
  
function updateStatus(selectedTask) {
    
    let label = selectedTask.nextElementSibling;
    let durum;

    if(selectedTask.checked) {
        label.classList.add("checked");
        durum = "win";
    }  else {
        label.classList.remove("checked");
        durum = "lose";
    }

    for (let gorev of gorevListesi) {
        if(gorev.id == selectedTask.id) {
            gorev.durum = durum;
        }
    }

    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
}





function showAlert(message, className){
        
    var alert = `

    <div class="alert alert-${className}">
    ${message}
    </div>
    
    `
    let cardspecial = document.querySelector(".cardspecial");

    cardspecial.insertAdjacentHTML("beforebegin",alert);

    setTimeout(function(){

        document.querySelector(".alert").remove();

    },3000)


}
    
    




   
    



















