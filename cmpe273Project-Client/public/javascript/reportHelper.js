var flag;
$(document).ready(function(){
	$("#start").datepicker();
	$("#end").datepicker();
	var i=0, j=0;

	var sel = $('#clientId');
	sel.change(function(){ 
		$("#buildingId").html("<option>Select</option>");
		var input = sel.val();
		var url= "http://localhost:3000/";
		$.ajax({
			url : url + "getbuildingId",
			type : 'GET',
			data :{
				"input" : input
			},
			dataType: 'json',
			success : function(data) {
				if (data == "Error") {
					alert("Something went wrong!");
				} else {


					for(i=0;i<data.length;i++)
					{
						$("#buildingId").append("<option value='"+data[i].building_id+"'>"+data[i].building_name+"</option>");
					}	 
				}
			},		
			error : function(jqXHR, textStatus, errorThrown) {
				alert('error hai' + textStatus + "" + errorThrown);
			}
		})	
	});  

	$("#searchButton").click(function() {
		var start = $("#start").val();
		var end = $("#end").val();
		var search = $('#search').val();
		var inputParam=$("#buildingId").val();
		var clientParam=$("#clientId").val();
		if ((start === "" & end != "")|| (start != ""& end === "")) {
			alert("Please select both start and end dates.");
		} else {
			$("#reportTable").html("");
			var url= "http://localhost:3000/";
			$.ajax({
				url : url + "getfilteredReport",
				type : 'GET',
				data :{
					"clientId": clientParam,
					"input" : inputParam,
					"start"	:	start,
					"end"	:	end,
					"search":	search
				},
				dataType: 'json',
				success : function(data) {
					if (data == "Error") {
						alert("Something went wrong!");
					} else {
						var id = [data[0].guard_id_fk];
						var cId= [data[0].client_id_fk];
						var bId= [data[0].building_id_fk];

						var bName = [data[0].building_name];
						var cName = [data[0].client_name];
						for(i=1;i<data.length;i++)
						{ 
							flag=0;
							for(j=0;j<id.length;j++)
							{	
								if(data[i].guard_id_fk === id[j])
								{
									flag=1;
									break;
								}

							}
							if(flag==0)
							{
								id.push(data[i].guard_id_fk);
								cId.push(data[i].client_id_fk);
								bId.push(data[i].building_id_fk);

								bName.push(data[i].building_name);
								cName.push(data[i].client_name);
							}
						}

						if(bId.length == 0)
						{
							$("#reportTable").append("<h3 style=\"width: 70%; margin: 10px;\"><small style=\"color: black;\">No Reports Found..</small></h3>")
						}
						for(j=0;j<bId.length;j++)
						{
							$("#reportTable").append(
									"<button class='form-control add' onclick='showReport("+j+")' id="+j+"> Client :"+cName[j]+", Building :"+bName[j]+" </button><br>"
							);
							$("#reportTable").append(
									" <div class="+j+"t  style='display:none;'><table class='table table-condensed'><tr> <td> Building Name<br>"+bName[j]+"</td><td>Date<br>"+start+"--"+end+"</td><td>Guard ID<br>"+id[j]+"</td></tr></table></div>"
							);
							$("#reportTable").append(
									"<div class="+j+"t  style='display:none;'><table class='table table-condensed'><tr><td>Patrols</td></tr></table></div>");
							for(i=0;i<data.length;i++)
							{
								if(data[i].guard_id_fk == id[j])
								{
									$("#reportTable").append(
											"<div class="+j+"t  style='display:none;'><table class='table table-condensed'><tr><td>Date: "+data[i].date+"<br><b>Alert: "+data[i].alert+"</b><br>Severity: "+data[i].severity+"<br>Status: "+data[i].status+"</td></tr></table></div>"
									);
								}
							}
							$("#reportTable").append("<br><br>");

						}

					}
				},		
				error : function(jqXHR, textStatus, errorThrown) {
					alert('error hai' + textStatus + "" + errorThrown);
				}
			})

		}
	});
});
function showReport(id)
{
	var showId = "."+id+"t";
	$(showId).toggle();

}