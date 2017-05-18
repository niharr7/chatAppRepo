var  newJSONArray= [];
 $(document).ready(function(){
	 	
		var  JSONRules1= [];
		var container = $('#cblist');
   var id = 0;
		   $.getJSON('test.json', function(data) {
           
            for (var prop in data) {
 
              JSONRules1.push(data[prop]);
               
             }
        //console.log("1" + JSON.stringify(JSONRules1[0]));
		var  JSONRules=JSONRules1[0]; 
		 for(var i=0;i<JSONRules.length;i++){
		//console.log(JSONRules[i]);
			$('<input />', { type: 'checkbox', id:id, value: name }).appendTo(container);
			$('<label />', { 'for': 'cb'+id, text:JSONRules[i].description}).appendTo(container);
			$('<br >', { 'for': 'cb'+id, text:JSONRules[i].description}).appendTo(container);
			id++;
			   
       }
	   appendCheckBox();
        });
    
	    var  JSONRules=JSON.stringify(JSONRules1);  
    //console.log("2" + JSONRules)
      
     // addCheckbox(JSONRules);
	 
	 
 
	 function appendCheckBox(){
	 $('input[type="checkbox"]').change(function () {
		 
            var name = $(this).attr("id");
            var check = $(this).prop('checked');
            
			 if(name=="checkAll" && check ==true) { 
			  
			   newJSONArray=JSONRules1[0];
			   
			    }
				 if(name=="checkAll" && check ==false) { 
			    
			    newJSONArray=[];
			   
			    }
				 
			if(name!="checkAll" && check){
				alert("true"+name);
				alert("tnihar"+JSONRules1[0]);
			         newJSONArray.push([name,JSONRules1[0][name]]);
			         }
			if(!check && name!="checkAll"){
				alert("false"+name);
				  
				var index;
				for(var i = 0; i < newJSONArray.length; i++) {
					 
                    if(newJSONArray[i][0] ==name) {
						 
						  index=i;
					}
                     
                  }
                 newJSONArray.splice(index,1);
			         }
					 console.log(newJSONArray);
				 
        });
		
	 }
	
 });
 
 function addCheckbox(arrayJSON) {
 console.log(arrayJSON);
   var container = $('#cblist');
   var id = 0;
 for(var i=0;i<arrayJSON.length;i++){
    console.log(arrayJSON[i]);
   $('<input />', { type: 'checkbox', id:id, value: name }).appendTo(container);
   $('<label />', { 'for': 'cb'+id, text:arrayJSON[0][i].description}).appendTo(container);
   $('<br >', { 'for': 'cb'+id, text:arrayJSON[i].description}).appendTo(container);
   id++;	
   }
}

$("#checkAll").click(function () {
	 
     $('input:checkbox').not(this).prop('checked', this.checked);
 });

 $("#evaluate").click(function () {
	 
     alert('evaluate clicked');
     processDOM(newJSONArray);
 });