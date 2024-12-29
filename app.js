var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    nombre = document.getElementById("nombre"),
    edad = document.getElementById("edad"),
    ciudad = document.getElementById("ciudad"),
    Codigopostal = document.getElementById("codigopostal"),
    telefono = document.getElementById("telefono"),
    Iniciolabores = document.getElementById("iniciolabores"),
    submitBtn = document.querySelector(".agregar"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'agregar',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    imgInput.src = "./image/perfil trabajador Icon.webp"
    form.reset()
})


file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("Este es muy grande!")
    }
}


function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeenombre}</td>
            <td>${element.employeeedad}</td>
            <td>${element.employeeciudad}</td>
            <td>${element.employeecodigopostal}</td>
            <td>${element.employeetelefono}</td>
            <td>${element.iniciolabores}</td>


            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeenombre}', '${element.employeeedad}', '${element.employeeciudad}', '${element.employeetelefono}', '${element.employeecodigopostal}', '${element.iniciolabores}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeenombre}', '${element.employeeedad}', '${element.employeeciudad}', '${element.employeetelefono}', '${element.employeecodigopostal}', '${element.iniciolabores}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(pic, nombre, edad, ciudad, telefono, codigopostal, iniciolabores){
    document.querySelector('.showImg').src = pic,
    document.querySelector('#shownombre').value = nombre,
    document.querySelector("#showedad").value = edad,
    document.querySelector("#showciudad").value = ciudad,
    document.querySelector("#showCodigopostal").value = codigopostal,
    document.querySelector("#showtelefono").value = telefono,
    document.querySelector("#showiniciolabores").value = iniciolabores
}


function editInfo(index, pic, edad, ciudad, telefono, codigopostal, iniciolabores){
    isEdit = true
    editId = index
    imgInput.src = pic
    nombre.value = nombre
    edad.value = edad
    ciudad.value =ciudad
    codigopostal.value = codigopostal,
    telefono.value = telefono,
    iniciolabores.value = iniciolabores

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Estas sweguro que deseas borrar?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('agregar', (e)=> {
    e.preventDefault()

    const information = {
        picture: imgInput.src == undefined ? "./image/perfil trabajador Icon.webp" : imgInput.src,
        employeenombre: nombre.value,
        employeeedad: edad.value,
        employeeciudad: ciudad.value,
        employeecodigopostal: Codigopostal.value,
        employeetelefono: telefono.value,
        iniciolabores: iniciolabores.value
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset()

    imgInput.src = "./image/perfil trabajador Icon.webp"  

    // modal.style.display = "none"
    // document.querySelector(".modal-backdrop").remove()
})