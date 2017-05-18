
document.getElementById("btnModify").onclick = fun;

function fun(){
	
	var req = new XMLHttpRequest();
req.open('GET', document.location, false);
req.send(null);
var headers = req.getAllResponseHeaders().toLowerCase();
alert(headers);
}		
