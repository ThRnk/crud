$(document).ready(function(){
	
	// Ativa Tooltip
	$('[data-toggle="tooltip"]').tooltip();

	//$("#taskModal").modal('show');
	
	var checkbox = $('table tbody input[type="checkbox"]');

	// Seleciona e Deseleciona Checkboxes
	$("#selectAll").click(function(){

		if(this.checked){

			checkbox.each(function(){

				this.checked = true;              

			});

		} else{

			checkbox.each(function(){

				this.checked = false;          

			});

		} 

	});

	checkbox.click(function(){

		if(!this.checked){

			$("#selectAll").prop("checked", false);

		}

    });
    
    
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        
        if (this.readyState == 4) {
            
            if (this.status == 200) {

                var objetoRetornado = JSON.parse(this.responseText);

                for (var i = 0; i < objetoRetornado.data.length; i++) {
                    
                    var employee = objetoRetornado.data[i];
                    
                    console.log(employee.employee_name)
                
                    $('.table').append('<tr>'+
                                            // '<td>'+
                                            //     '<span class="custom-checkbox">'+
                                            //         '<input type="checkbox" id="checkbox1" name="options[]" value="1">'+
                                            //         '<label for="checkbox1"></label>'+
                                            //     '</span>'+
                                            // '</td>'+

                                            '<td style="width: 40px">'+

                                                '<span class="custom-profile-image">'+
                    
                                                '<img src="'+(employee.profile_imagem != null ? employee.profile_imagem : 'https://www.fiscalti.com.br/wp-content/uploads/2020/05/default-user-image-365x365.png') +'">'+

                                                '</span>'+
                    
                                            '</td>'+

                                            '<td data-nome="'+employee.id+'">'+employee.employee_name+'</td>'+
                                            '<td>'+employee.employee_age+'</td>'+
                                            '<td>'+employee.employee_salary+'</td>'+

                                            
                                            '<td>'+
                                                '<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Editar">&#xE150;</i></a>'+
                                                '<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Excluir">&#xE872;</i></a>'+
                                            '</td>'+
                                        '</tr>')

                }


            } else {

            }

        }

    };


        
    $(function(){
        $(document).on('click', '.delete', function(e) {
            e.preventDefault;
            window.id = $(this).closest('tr').find('td[data-nome]').data('nome');


            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                
                if (this.readyState == 4) {
                    
                    if (this.status == 200) {
        
                        var objetoRetornado = JSON.parse(this.responseText);
                        
                        $('#deleteEmployeeModal .modal-body').append('<p>Você tem certeza que deseja excluir o registros de '+objetoRetornado.data.employee_name+'?</p>'+
                                                                     '<p class="text-warning"><small>Essa ação não pode ser desfeita.</small></p>')


                    
                    }
                }
            }
            xhttp.open ("GET", "https://us-central1-rest-api-employees.cloudfunctions.net/api/v1/employee/"+window.id, true);
            
            xhttp.setRequestHeader('Content-type', 'application/json');
        
            xhttp.send();


            
 
        });
    });


    $( function(){
        $(document).on('click', '#excluirbtn', function(e) {
            e.preventDefault;
            console.log(window.id);
            


            var xhttp = new XMLHttpRequest();


            xhttp.open ("DELETE", "https://us-central1-rest-api-employees.cloudfunctions.net/api/v1/delete/"+window.id, true);        
            xhttp.send();
            window.location.reload();
            
            
 
        });
    });
    


    xhttp.open ("GET", "https://us-central1-rest-api-employees.cloudfunctions.net/api/v1/employees", true);

    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.send();



    })
    