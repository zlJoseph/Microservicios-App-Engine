(function () {
    'use strict'

    if(!$('#containerKpi').hasClass('d-none')){
        $('#containerKpi').toggleClass('d-none');
    }

    $.ajax({
        type: "GET",
        url: 'https://microservicios-348814.ue.r.appspot.com/usuarios/kpideclientes',
        beforeSend: function () {
            if($('#loadingKpi').hasClass('d-none')){
                $('#loadingKpi').toggleClass('d-none');
            }
            if(!$('#containerKpi').hasClass('d-none')){
                $('#containerKpi').toggleClass('d-none');
            }
        },
        success: function (data) {
            var {promedio,desviacion}=data
            var div=document.getElementById('containerKpi');
            var pPromedio = document.createElement("p");
            pPromedio.className="mb-0 ms-2";
            pPromedio.innerHTML="Promedio edad: "+round(parseFloat(promedio));
            var ds = document.createElement("p");
            ds.className="mb-0 ms-2";
            ds.innerHTML = "Desviación estandar: "+round(parseFloat(desviacion));
            div.appendChild(pPromedio);
            div.appendChild(ds);
        },
        error: function (error) {
            alert('Error al obtener Kpi: '+error);
        },
        complete: function () {
            if(!$('#loadingKpi').hasClass('d-none')){
                $('#loadingKpi').toggleClass('d-none');
            }
            if($('#containerKpi').hasClass('d-none')){
                $('#containerKpi').toggleClass('d-none');
            }
        }
    });

    $.ajax({
        type: "GET",
        url: 'https://microservicios-348814.ue.r.appspot.com/usuarios/listclientes',
        beforeSend: function () {
            if($('#loadingTableUsers').hasClass('d-none')){
                $('#loadingTableUsers').toggleClass('d-none');
            }
        },
        success: function (data) {
            $.each(data, function(i, item) {
                agregarUsuarion(i,item);
            })
        },
        error: function (error) {
            alert('Error al listar usuarios: '+error);
        },
        complete: function () {
            if(!$('#loadingTableUsers').hasClass('d-none')){
                $('#loadingTableUsers').toggleClass('d-none');
            }
        }
    });

    var forms = document.querySelectorAll('.needs-validation')
    if($('#form-buttons-registrar').hasClass('d-none')){
        $('#form-buttons-registrar').toggleClass('d-none');
    }
    $('#form-spinner-registrar').toggleClass('d-none');

    Array.prototype.slice.call(forms)
    .forEach(function (form) {
        form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }else{
            event.preventDefault();
            var nombre=document.getElementById('validationNombre').value;
            var apellido=document.getElementById('validationApellido').value;
            var edad=document.getElementById('validationEdad').value;
            var fecha=document.getElementById('date').value;
            var data={
                nombre:nombre,
                apellido:apellido,
                edad:edad,
                fecha:fecha
            }
            $.ajax({
                type: "POST",
                url: 'https://microservicios-348814.ue.r.appspot.com/usuarios/creacliente',
                data: data,
                beforeSend: function(){
                    $('#form-buttons-registrar').toggleClass('d-none');
                    $('#form-spinner-registrar').toggleClass('d-none');
                },
                success: function(response){
                    document.getElementById('validationNombre').value='';
                    document.getElementById('validationApellido').value='';
                    document.getElementById('validationEdad').value='';
                    document.getElementById('date').value='';
                    var cliente={nombre: response.nombre,
                                apellido: response.apellido,
                                edad: response.edad,
                                fecha: response.fecha}
                    agregarUsuarion(response.contador,cliente);
                },
                error: function(error){
                    alert('Error al registrar'+error);
                },
                complete: function(){
                    $('#form-buttons-registrar').toggleClass('d-none');
                    $('#form-spinner-registrar').toggleClass('d-none');
                    form.classList.remove('was-validated')
                }
            })
        }
        form.classList.add('was-validated')
        }, false)
    })
})()

function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
}

function agregarUsuarion(i,item){
    var table=document.getElementById('tableUsers');
    var tr = document.createElement("tr");
    var motivo = document.createElement("th");
    motivo.innerHTML = i+1;
    var nombre = document.createElement("td");
    nombre.innerHTML = item.nombre;
    var apellido = document.createElement("td");
    apellido.innerHTML = item.apellido;
    var edad = document.createElement("td");
    edad.innerHTML = item.edad;
    var fecha = document.createElement("td");
    fecha.innerHTML = item.fecha;
    var fechaDate=new Date(item.fecha);
    fechaDate.setFullYear(fechaDate.getFullYear()+79)
    var fechaPM = document.createElement("td");
    fechaPM.innerHTML = fechaDate.toLocaleDateString();
    table.appendChild(tr);
    tr.appendChild(motivo);
    tr.appendChild(nombre);
    tr.appendChild(apellido);
    tr.appendChild(edad);
    tr.appendChild(fecha);
    tr.appendChild(fechaPM);
}