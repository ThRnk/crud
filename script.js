$(document).ready(function(){
    
    reload();

	// Ativa Tooltip
	$('[data-toggle="tooltip"]').tooltip();

    //$("#taskModal").modal('show');
    
    var selectedEmployee;

    var selectedEmployeesIds = [];

	// Seleciona e Deseleciona Checkboxes o clicar em selecionar todas
	$("#selectAll").click(function(){

        var checkbox = $('input[type="checkbox"]');

		if(this.checked){

			checkbox.each(function(){

				this.checked = true;              

			});

		} else{

			checkbox.each(function(){

                this.checked = false;       
                
                selectedEmployeesIds = [];

			});

		} 

	});

	$(document).on('click', '[type="checkbox"]', function(e) {

        if(!this.checked){

			$("#selectAll").prop("checked", false);

		}

        $('#countChecked').empty().append('(' + $("[type='checkbox']:checked").not("#selectAll").length + ')');

    });

    // Recarrega todos os registros.
    function reload() {

        $('#dataTable').empty();

        selectedEmployeesIds = [];
        
        $.ajax({
            url: "http://rest-api-employees.jmborges.site/api/v1/employees",
            type: "GET",
            
            success: function(result){
    
                $.each(result.data, function(index, value) {
    
                    $('#dataTable').append(
                    '<tr>'+
                        '<td>'+
                            '<span class="custom-checkbox">'+
                                '<input type="checkbox" id="' + value.id + '" name="options[]" value="' + value.id + '">'+
                                '<label for="' + value.id + '"></label>'+
                            '</span>'+
                        '</td>'+

                        '<td style="width: 40px">'+
    
                            '<span class="custom-profile-image">'+
    
                            '<img src="'+((value.profile_imagem != null && value.profile_imagem.substring(0, 4) == 'http') ? value.profile_imagem : 'https://www.fiscalti.com.br/wp-content/uploads/2020/05/default-user-image-365x365.png') +'">'+
    
                            '</span>'+
    
                        '</td>'+
    
                        '<td data-nome="'+value.id+'">'+value.employee_name+'</td>'+
                        '<td>'+value.employee_age+'</td>'+
                        '<td> R$ '+ (value.employee_salary ? value.employee_salary.toFixed(2) : (0).toFixed(2)) + '</td>'+
    
                        
                        '<td>'+
                            '<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Editar">&#xE150;</i></a>'+
                            '<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Excluir">&#xE872;</i></a>'+
                        '</td>'+
                    '</tr>')
    
                });
    
           }
        
        });

    }

    // Trata a requisição ao clicar em "Adicionar" dentro do "Adicionar Novo Empregado"
    $(document).on('click', '#addEmployee', function(e) {

        e.preventDefault;

        var newEmployee = {

            "name": $("#addName").val(),
            "salary": $("#addSalary").val(),
            "age": $("#addAge").val(),
            "profile_image": $("#addProfileImage").val(),
            
        };

        var data1 = JSON.stringify(newEmployee);

        $.ajax({
            url: "http://rest-api-employees.jmborges.site/api/v1/create",
            type: "POST",
            data: data1,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            
            success: function(result){

                $('#addEmployeeModal').modal('hide');

                reload();

                $('#alreadyAddedEmployeeModal .modal-body').empty().append('<p>Os registros de '+ newEmployee['name'] + ' foram salvos com sucesso!</p>')

                $("#alreadyAddedEmployeeModal").modal('show');
                                                           
            }
        
        });

    });

    // Trata a requisição ao clicar no "Ícone de Lápis"
    $(document).on('click', '.edit', function(e) {

        e.preventDefault;

        $.ajax({
            url: "http://rest-api-employees.jmborges.site/api/v1/employee/" + $(this).closest('tr').find('td[data-nome]').data('nome'),
            type: "GET",
            
            success: function(result){

                selectedEmployee = result.data;

                $('#editEmployeeModal .modal-title').empty().append('<p>Editar '+ selectedEmployee.employee_name + '!</p>');

                $("#editName").val(result.data.employee_name);
                $("#editSalary").val(result.data.employee_salary);
                $("#editAge").val(result.data.employee_age);
                $("#editProfileImage").val(result.data.profile_image);

                
                                         
            }
        
        });

    });

    // Trata a requisição ao clicar no botão "Salvar" dentro do "Ícone de Lápis"
    $(document).on('click', '#editEmployee', function(e) {

        var newEmployee = {
            "name": $("#editName").val(),
            "salary": $("#editSalary").val(),
            "age": $("#editAge").val(),
            "profile_image": $("#editProfileImage").val(),
        };

        var data1 = JSON.stringify(newEmployee);

        $.ajax({
            url: "http://rest-api-employees.jmborges.site/api/v1/update/" + selectedEmployee.id,
            type: "PUT",
            data: data1,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            
            success: function(result){

                $('#editEmployeeModal').modal('hide');

                reload();

                $('#alreadyEditedEmployeeModal .modal-body').empty().append('<p>Os registros de '+ selectedEmployee.employee_name + ' foram atualizados com sucesso!</p>')

                $("#alreadyEditedEmployeeModal").modal('show');

            }
        
        });

    });

    // Trata a requisição ao clicar no "Ícone de Lixeira"
    $(document).on('click', '.delete', function(e) {

        e.preventDefault;

        $.ajax({
            url: "http://rest-api-employees.jmborges.site/api/v1/employee/" + $(this).closest('tr').find('td[data-nome]').data('nome'),
            type: "GET",
            
            success: function(result){

                $('#deleteEmployeeModal .modal-body').empty().append('<p>Você tem certeza que deseja excluir o registros de '+ result.data.employee_name + '?</p>' +
                                                                                '<p class="text-warning"><small>Essa ação não pode ser desfeita.</small></p>')

                selectedEmployee = result.data;
                                                           
            }
        
        });

    });

    // Trata a requisição ao clicar no botao "Excluir" dentro do "Ícone de Lixeira"
    $(document).on('click', '#deleteEmployee', function(e) {

        $.ajax({
            url: "http://rest-api-employees.jmborges.site/api/v1/delete/" + selectedEmployee.id,
            type: "DELETE",
            
            success: function(result){

                $('#deleteEmployeeModal').modal('hide');

                reload();

                $('#alreadyDeletedEmployeeModal .modal-body').empty().append('<p>Os registros de '+ selectedEmployee.employee_name + ' foram excluídos com sucesso!</p>')

                $("#alreadyDeletedEmployeeModal").modal('show');

            }
        
        });

    });

    // Trata a requisição ao clicar no botao "Excluir Selecionados"
    $(document).on('click', '#deleteSeveralEmployees', function(e) {

        selectedEmployeesIds = [];

        $("[type='checkbox']:checked").not("#selectAll").each(function(value){

            selectedEmployeesIds.push($(this).attr('id'));

        });

        console.log(selectedEmployeesIds);

        $('#deleteSeveralEmployeesModal .modal-body').empty().append('<p>Você tem certeza que deseja excluir estes ' + selectedEmployeesIds.length + ' registro(s) selecionado(s)?</p>' +
                                                                     '<p class="text-warning"><small>Essa ação não pode ser desfeita.</small></p>')

    });

    // Trata a requisição ao clicar no botao "Excluir" dentro do "Excluir Selecionados"
    $(document).on('click', '#deleteSeveralEmployeesConfirm', function(e) {

        $.each(selectedEmployeesIds, function( index, value ) {

            $.ajax({
                url: "http://rest-api-employees.jmborges.site/api/v1/delete/" + value,
                type: "DELETE",

                success: function(result){

                    console.log("Apagado");

                }
            });

        });

        
        $('#deleteSeveralEmployeesModal').modal('hide');

        setTimeout(reload, 2000);

        $('#alreadyDeletedSeveralEmployeesModal .modal-body').empty().append('<p>Os  '+ selectedEmployeesIds.length + ' registros selecionados foram excluídos com sucesso!</p>')

        $("#alreadyDeletedSeveralEmployeesModal").modal('show');


    });

});
    