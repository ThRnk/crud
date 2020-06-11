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

});