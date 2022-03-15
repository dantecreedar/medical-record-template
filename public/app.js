//configuración personal de Firebase
firebase.initializeApp({
    apiKey: "AIzaSyChhbcML_cnt6ErBGMyk8Lcc8n2tHuk6D4",
    authDomain: "centro-medico-registro.firebaseapp.com",
    projectId: "centro-medico-registro",
    storageBucket: "centro-medico-registro.appspot.com",
    messagingSenderId: "284468113222",
    appId: "1:284468113222:web:45273466f6920551253f47"
});
  
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//Agregar documentos
function guardar(){
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('email').value;
    var informe = document.getElementById('informe').value;

    db.collection("registro").add({
        first: nombre,
        last: apellido,
        reg: informe
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('informe').value = '';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    //Anuncio
    swal({
        title: "Excelente!",
        text: "Tus Datos se Guardaron!",
        icon: "success",
        button: "Gracias!",
      });
}

//Leer documentos
var tabla = document.getElementById('tabla');
db.collection("registro").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        <td>${doc.data().reg}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().reg}')">Editar</button></td>
        </tr>
        `
    });
});

//borrar documentos
function eliminar(id){
    db.collection("registro").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

    //Alerta de borrado
    swal("Se borraron los Datos!", "Ingrese Datos Nuevos!");
    
}

//Actualizar documentos
function editar(id,nombre,apellido,informe){

    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('informe').value = informe;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Actualizar';

    boton.onclick = function(){
        var washingtonRef = db.collection("registro").doc(id);
        // Set the "capital" field of the city 'DC'

        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var informe = document.getElementById('informe').value;

        return washingtonRef.update({
            first: nombre,
            last: apellido,
            reg: informe
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Guardar';
            
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('informe').value = '';

            swal({
                title: "Actualizado!",
                text: "Se actualizaron los Datos!",
                icon: "success",
                button: "Gracias!",
              });

            
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            
        });

        

    }
}







