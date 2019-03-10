window.onload=function f (){
	
	var formular=document.createElement("form");
	var btn1=document.createElement("input");
	btn1.type="radio";
	btn1.name="val";
	btn1.value="Ascending";
	btn1.style.marginLeft="1%";
	btn1.addEventListener("click", myFunction);
	var label1=document.createElement("label");
	label1.for=btn1.value;
	label1.innerHTML="Ascending";
	label1.style.marginLeft="10%";
	formular.appendChild(label1);
	formular.appendChild(btn1);
	
	var btn2=document.createElement("input");
	btn2.type="radio";
	btn2.name="val";
	btn2.setAttribute("value", "Descending");
	btn2.style.marginLeft="1%";
	btn2.addEventListener("click", myFunction);
	
	var label2=document.createElement("label");
	label2.for=btn2.value;
	label2.innerHTML="Descending";
	label2.style.marginLeft="5%";
	formular.appendChild(label2);
	
	formular.appendChild(btn2);
	var grd=document.getElementById("grid");
	grd.parentNode.insertBefore(formular, grd);
	
	function myFunction(e){
		if (e.currentTarget.value=="Ascending")
		{	var times=document.getElementsByTagName("time");
			var cards=document.getElementsByClassName("card");
			for (var i=0; i<times.length; i++)
				for (var j=0; j<times.length; j++)
				{
					if (times[i].innerHTML>times[j].innerHTML)
					{
						var temp=document.createElement("article");
						cards[i].parentNode.insertBefore(temp, cards[i]);
						cards[j].parentNode.insertBefore(cards[i], cards[j]);
						temp.parentNode.insertBefore(cards[j], temp);
						temp.parentNode.removeChild(temp);
					}
				}
		}
		else
		{	var times=document.getElementsByTagName("time");
			var cards=document.getElementsByClassName("card");
			for (var i=0; i<times.length; i++)
				for (var j=0; j<times.length; j++)
				{
					if (times[i].innerHTML<times[j].innerHTML)
					{
						var temp=document.createElement("article");
						cards[i].parentNode.insertBefore(temp, cards[i]);
						cards[j].parentNode.insertBefore(cards[i], cards[j]);
						temp.parentNode.insertBefore(cards[j], temp);
						temp.parentNode.removeChild(temp);
					}
				}
		}	
	}
	
}
