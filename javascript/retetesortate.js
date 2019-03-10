window.onload=function f (){
	var inputs=document.createElement("div");
	inputs.style.float="left";
	inputs.style.width="100%";
	var grd=document.getElementById("grid");
	
	var searched=setTimeout(function(){alert("If you do not want to filter by keywords or category go to the recipes page"); }, 10000);
	
	
	var categorii=["All categories", "Breakfast", "Lunch", "Dinner", "Desert"];
	var cat=0;     //categorii[cat] va fi categoria selectata
	var input;     //locul in care s-a scris
	var filter=0;  //ce s-a introdus in cautare
	var an=0;
	
	//input text
	var f=document.createElement("div");
	f.style.width="20%";
	f.style.margin="3% 0% 2% 10%";
	f.style.border="1px solid #ddd";
	f.style.float="left";
	var cauta=document.createElement("input");
	cauta.id="srch";
	cauta.type="text";
	cauta.placeholder="Search for keywords...";
	cauta.style.fontSize="22px";
	cauta.style.width="100%";
	cauta.style.border="0px";
	cauta.style.float="left";
	cauta.addEventListener("keyup", function functia(e){
														input=e.currentTarget;
														filter=input.value.toUpperCase();
														functia2();
														});
	function functia2()
	{	
		move();
		setTimeout(function f(){
		var articole=document.getElementsByClassName("card");
		var categor=document.getElementsByClassName("categorie");
		var date=document.getElementsByTagName("time");
		for (var i=0; i<articole.length; i++)                              //pentru cazul in care sterg si ajung sa am filter gol
		{
			if (cat==0 || (categorii[cat]==categor[i].innerHTML))
			{
				if ((an==0) || (!((date[i].innerHTML[0]!=an[0]) || (date[i].innerHTML[1]!=an[1]) || (date[i].innerHTML[2]!=an[2]) || (date[i].innerHTML[3]!=an[3]))))
					articole[i].style.display="";
				else
					articole[i].style.display="none";
			}
			else
			{
				articole[i].style.display="none";
			}
			var importante=articole[i].getElementsByClassName("important");
			for (var j=0; j<importante.length; j++)
				importante[j].style.backgroundColor="inherit";     //unhighlight
		}
		if (filter.length>=1 || cat!=0 || an!=0)     //s-a schimbat categoria sau s-a cautat ceva
			clearTimeout(searched);
		if (filter.length>=1)
		{
			for (var i=0; i<articole.length; i++)
			{ 
				if (cat==0 || (categorii[cat]==categor[i].innerHTML))
				{
					var importante=articole[i].getElementsByClassName("important");
					for (var j=0; j<importante.length; j++)
					{
						if(importante[j].innerHTML.toUpperCase().indexOf(filter)>-1)
						{
							if ((an==0) || (!((date[i].innerHTML[0]!=an[0]) || (date[i].innerHTML[1]!=an[1]) || (date[i].innerHTML[2]!=an[2]) || (date[i].innerHTML[3]!=an[3]))))
							{	
								articole[i].style.display="";
								importante[j].style.backgroundColor="yellow";
								break;
							}
							else
								articole[i].style.display="none";
						}
						else
						{
							articole[i].style.display="none";
						}
					}
				}
				else
					articole[i].style.display="none";
			}
		}
	}, 1000);
	}
	f.appendChild(cauta);
	inputs.appendChild(f);
	
	
	//span "in"
	var sp=document.createElement("span");
	var t=document.createTextNode("in");
	sp.appendChild(t);
	sp.style.fontSize="16px";
	sp.style.float="left";
	sp.style.margin="3.5% 1% 2% 1%";
	inputs.appendChild(sp);
	
	
	//input select
	var sel=document.createElement("select");
	sel.style.margin="3.5% 1% 2% 0%";
	sel.style.float="left";
	sel.style.fontSize="16px";
	for (var i=0; i<5; i++)
	{
		var op=document.createElement("option");
		if (i==0)
			op.value=op.innerHTML="All categories";
		else 
			if (i==1)
				op.value=op.innerHTML="Breakfast";
			else 
				if (i==2)
					op.value=op.innerHTML="Lunch";
				else
					if (i==3)
						op.value=op.innerHTML="Dinner";
					else
						op.value=op.innerHTML="Desert";	
		sel.appendChild(op);
	}
	sel.onchange=function aflacategorie(){
		var selval=document.getElementsByTagName("select")[0].value;
		for (var val=0; val<5; val++)
			if(selval==categorii[val])
				cat=val;   //schimb categoria
		functia2();        //apelez functia de filtrare
	}
	inputs.appendChild(sel);
	
	
	//span "sorted"
	sp=document.createElement("span");
	t=document.createTextNode("sorted");
	sp.appendChild(t);
	sp.style.fontSize="16px";
	sp.style.float="left";
	sp.style.margin="3.5% 1% 2% 0%";
	inputs.appendChild(sp);
	
	
	//input radio
	var formular=document.createElement("div");
	formular.style.float="left";
	formular.style.margin="2.65% 1% 2% 0%";
	formular.style.fontSize="16px";
	formular.style.width="7%";
	
	var btn1=document.createElement("input");
	btn1.type="radio";
	btn1.name="radioval";
	btn1.value="Ascending";
	btn1.style.margin="1%";
	btn1.addEventListener("change", myFunction);
	var label1=document.createElement("label");
	label1.for=btn1.value;
	label1.innerHTML="Ascending";
	label1.style.fontSize="16px";
	label1.style.marginLeft="7%";
	formular.appendChild(label1);
	formular.appendChild(btn1);
	
	var btn2=document.createElement("input");
	btn2.type="radio";
	btn2.name="radioval";
	btn2.setAttribute("value", "Descending");
	btn2.style.marginLeft="1%";
	btn2.addEventListener("change", myFunction);
	var label2=document.createElement("label");
	label2.for=btn2.value;
	label2.innerHTML="Descending";
	label2.style.fontSize="16px";
	formular.appendChild(label2);
	formular.appendChild(btn2);
	
	inputs.appendChild(formular);
	
	function myFunction(e){    //functia de sortare
		move();
		setTimeout(function f(){
		if (e.target.value=="Ascending")
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
		}}, 1000);	
	}
	
	
	//span "display size"
	sp=document.createElement("span");
	t=document.createTextNode("display size");
	sp.appendChild(t);
	sp.style.float="left";
	sp.style.margin="3.5% 1% 2% 0%";
	sp.style.fontSize="16px";
	inputs.appendChild(sp);
	
	
	//input range
	var inputrange=document.createElement("input");
	inputrange.type="range";
	inputrange.min="40";
	inputrange.max="90";
	inputrange.value="90";
	inputrange.style.fontSize="16px";
	inputrange.style.width="10%";
	inputrange.style.float="left";
	inputrange.style.margin="3.5% 1% 2% 0%";
	inputrange.onchange=function changewidth(e){
												var cards=document.getElementsByClassName("card");
												var x=e.currentTarget.value;
												for (var i=0; i<cards.length; i++)
													cards[i].style.width=x+"%";
												}
	inputs.appendChild(inputrange);
	
	
	//input checkbox
	formular=document.createElement("div");
	formular.style.float="left";
	formular.style.margin="3.5% 10% 2% 0%";
	formular.style.fontSize="16px";
	formular.style.width="7%";
	
	btn1=document.createElement("input");
	btn1.type="checkbox";
	btn1.name="check";
	btn1.value="2018";
	btn1.style.margin="1%";
	btn1.addEventListener("change", function functie_a(e){
															if(!an)
																an=e.currentTarget.value;
															else
																an=0;
															functia2();
														});
	label1=document.createElement("label");
	label1.for=btn1.value;
	label1.innerHTML="2018 only";
	label1.style.fontSize="16px";
	label1.style.marginLeft="7%";
	formular.appendChild(label1);
	formular.appendChild(btn1);
	inputs.appendChild(formular);
	grd.parentNode.insertBefore(inputs, grd);
	
	
	//loading bar
	var progress=document.createElement("div");
	var bar=document.createElement("div");
	progress.style.width="100%";
	progress.style.height="30px";
	progress.style.backgroundColor="#ddd";
	progress.style.position="absolute";
	progress.style.top="26rem";
	
	bar.style.width="10%";
	bar.style.height="30px";
	bar.style.backgroundColor="#BFD8D2";
	bar.style.textAlign="center";
	bar.innerHTML="10%";
	var width = 10;
	function move() 
	{  
		clearTimeout(searched);
		width = 10;
		var incarca = setInterval(function cresc() {
														if (width >= 100) 
														  clearInterval(incarca);
														else 
															{
															  width++; 
															  bar.style.width = width+"%"; 
															  bar.innerHTML=width+"%"; 
															}
													}, 10);
	}
	progress.appendChild(bar);
	grd.parentNode.insertBefore(progress, grd);
	
	
	//teach
	var paragraf=document.createElement("p");
	paragraf.style.display="block";
	paragraf.style.marginRight="3%";
	paragraf.style.backgroundColor="#BFD8D2";
	paragraf.style.border="1px solid grey";
	paragraf.style.fontSize="22px";
	paragraf.style.marginTop="7%";
	paragraf.style.float="right";
	paragraf.style.width="20%";
	paragraf.innerHTML="Welcome to the search page! Please eneter a keyword, select a category or filter the way you like! Also, beware that shift+d on the keyboard triggers the descending sorting whilst clicking on the right half of a recipe takes you directly to the next one! 🍩";
	grd.parentNode.appendChild(paragraf);
	
	//button remove
	var rmv=document.createElement("button");
	var remove=0;
	rmv.innerHTML="Remove more than 1 year old recipes";
	rmv.onclick=function (){
								if (remove==0)
								{
									alert("BEWARE! You will have to refresh the page to get them back! If that is what you want, please click me again!");
									remove=1;
								}
								else
								{	
									move();
									setTimeout(function(){
															var articole=document.querySelectorAll(".card");
															var date=document.querySelectorAll("time");
															for (var i=0; i<articole.length; i++)                              
																if (date[i].innerHTML[0]!="2" || (date[i].innerHTML[1]!="0") || (date[i].innerHTML[2]!="1") || (date[i].innerHTML[3]!="8"))
																	articole[i].parentNode.removeChild(articole[i]);
														}, 1000);
								}
							}
	rmv.style.display="block";
	rmv.style.width="18%";
	rmv.style.marginRight="5%";
	rmv.style.marginTop="3%";
	rmv.style.backgroundColor="#BFD8D2";
	rmv.style.fontSize="20px";
	rmv.style.float="right";
	grd.parentNode.appendChild(rmv);
	
	//textarea
	var dvtext=document.createElement("div");
	dvtext.style.display="block";
	dvtext.style.marginRight="3%";
	dvtext.style.fontSize="22px";
	dvtext.style.marginTop="3%";
	dvtext.style.float="right";
	dvtext.style.width="20%";
	var nodtxt=document.createTextNode("If you want to send me a recipe, please write it here:");
	var txtarea=document.createElement("textarea");
	txtarea.style.fontSize="20px";
	txtarea.style.marginTop="2%";
	txtarea.id="my_textarea";
	var submitbtn=document.createElement("button");
	submitbtn.innerHTML="Submit!";
	submitbtn.style.display="block";
	submitbtn.onclick=function f(){
									clearTimeout(searched);
									var x = document.getElementById("my_textarea").value;
									localStorage.setItem("mesaj", x);
									move();
									setTimeout(function ff(){
																alert("Thanks for submitting your recipe!");
															}, 1000);
								}
	dvtext.appendChild(nodtxt);
	dvtext.appendChild(txtarea);
	dvtext.appendChild(submitbtn);
	grd.parentNode.appendChild(dvtext);
	
	
	//shift+d ->descending
	window.onkeydown=function (event){
										if (event.shiftKey && event.keyCode==68)
										{
											var el=document.querySelectorAll("[value=Descending]")[0];
											el.checked=1;
											myFunction(event);
										}
									}
									
									
	//click dreapta urmat reteta click stanga previous reteta
	var carduri=document.querySelectorAll(".card");
	for (var i=0; i<carduri.length; i++)
		carduri[i].onclick=function (e){
											var latime=parseFloat(window.getComputedStyle(e.currentTarget).getPropertyValue("width"));
											latime=latime/2;
											var coordx=e.clientX-parseFloat(window.getComputedStyle(document.getElementById("grid")).getPropertyValue("margin-left"));
											if (coordx<latime)
											{
												if(e.currentTarget.previousElementSibling)
													window.scrollTo(0, e.currentTarget.previousElementSibling.offsetTop);
											}
											else
											{
												if(e.currentTarget.nextElementSibling)
													window.scrollTo(0, e.currentTarget.nextElementSibling.offsetTop);
											}												
										}
}
