var data;
var x;

$(document ).ready(function() {
	chrome.tabs.getSelected(function(n) {
		data = chrome.extension.getBackgroundPage().headerInfo[n.id];
		//var text = '[["0",{"id":"0","description":"password tags must have autocomplete on","entity":"div","condition_attrib":"id","condition_val":"viewDiv","attribute":"class","value":"yui","rule":"1", "search_text":""}],["2",{"id":"2","description":"Do not use innnerHtml in JS","entity":"script","condition_attrib":"","condition_val":"","attribute":"","value":"eval()","rule":"1", "search_text":"eval("}],["3",{"id":"3","description":"Request Header","entity":"HEADER","condition_attrib":"Proxy-Authenticate","condition_val":"NTLM","attribute":"X-Cache-Hits","value":"0","rule":"", "search_text":"X-Cache-Hits:0"}]]';
		//var obj = JSON.parse(text);
		//processDOM(obj);
	});		
});

function processDOM(myArr){
	var entity = "";
	var condition_attrib = "";
	var condition_val = "";
	var attribute = "";
	var value = "";
	var rule = "";
	var search_text = "";
	console.log(data);
	var search_arr = [];
	var req = data.request[0].requestHeaders;
	var res = data.response[0].responseHeaders;

	for (var i = 0; i < myArr.length; i++){
		var obj = myArr[i][1];
		var found = false;
		console.log(myArr[i]);
		entity = myArr[i].entity;
		description = myArr[i].description;
		condition_attrib = myArr[i].condition_attrib;
		condition_val = myArr[i].condition_val;
		attribute = myArr[i].attribute;
		value = myArr[i].value;
		rule = myArr[i].rule;
		search_text = myArr[i].search_text;
				
		if(entity == "HEADER"){
			for(var i=0; i < res.length; i++){
				if(res[i].name == condition_attrib && res[i].value == condition_val){
					if(search_arr.length == 0){
							search_arr.push([condition_val,1]);
					} else {
						for(var i =0; i < search_arr.length; i++){
							if(search_arr[i][0] == condition_val){
								found = true;
								search_arr[i][1] = search_arr[i][1]+1;
							}
						}
						if(!found){
							search_arr.push([condition_val,1]);
						}
					}
				}
			}
			console.log(search_arr);
		}else if(search_text == "" && condition_attrib != ""){		
			
			$(entity).each(function(index){  
				var input = $(this);
				
				if(input.attr(condition_attrib) == condition_val){
					if((input.attr(attribute) == "undefined" || input.attr(attribute) != value) && rule == 1){
			
						if(search_arr.length == 0){
							search_arr.push([condition_val,1]);
						} else {
							for(var i =0; i < search_arr.length; i++){
								if(search_arr[i][0] == condition_val){
									found = true;
									search_arr[i][1] = search_arr[i][1]+1;
								}
							}
							if(!found){
								search_arr.push([condition_val,1]);
							}
						}
					}
				}
			});
		} else if(search_text != ""){
			$(entity+":contains('"+search_text+"')").each(function(index){
				var input = $(this);
				if(search_arr.length == 0){
					search_arr.push(condition_val,1);
				} else {
					for(var i =0; i < search_arr.length; i++){
						if(search_arr[i][0] == search_text){
							found = true;
							search_arr[i][1] = search_arr[i][1]+1;
						}
					}
					if(!found){
						search_arr.push([search_text,1]);
					}
				}			
			});
		}
	}
}