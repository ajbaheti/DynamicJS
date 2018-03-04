//on document load
function init(){
	
	var x = browserCheck();
	console.log(x);
	//check for firefox and its version
	if(x[0].toLowerCase() == "firefox" && parseInt(x[1]) < 40){
		window.open("https://www.mozilla.org/en-US/firefox/new/")
	}//check for IE and its version
	else if(x[0].toLowerCase() == "msie" && parseInt(x[1]) < 7){
		window.open("https://support.microsoft.com/en-us/help/17621/internet-explorer-downloads")
	}//check for chrome and its version
	else if(x[0].toLowerCase() == "chrome" && parseInt(x[1]) < 40){
		window.open("https://www.google.com/chrome/browser/desktop/index.html")
	}//check for safari and its version
	else if(x[0].toLowerCase() == "safari" && parseInt(x[1]) < 8){
		window.open("https://support.apple.com/downloads/safari")
	}

	//animation does not work in lower IE, so check and give appropriate message in heading
	if(x[0].toLowerCase() == "msie" && parseInt(x[1]) < 10){
		eleById("welcome").style.display = "none";
		eleById("welcome1").style.display = "block";
	}

	//create first dropdown
	createDropdown("choice1",0);
}

//get the browser name and its version
function browserCheck(){
    var ua= navigator.userAgent, tem,
	M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M;
}

//on change of any dropdown value
function onSelectAnyDropdown(selectedOption,fromDropdown){
	console.log("from dropdown = " + fromDropdown);
	var dropdownText = eleById('select'+fromDropdown).options[selectedOption].text;
	var dropdownValue = eleById('select'+fromDropdown).options[selectedOption].value.toLowerCase();
	console.log("dropdown value = "+dropdownValue);
	checkDropdown(dropdownValue,fromDropdown,dropdownText);
}

//check if dropdown exists or not and accordingly create or delete dropdowns
//also set localstorage, if not available set cookies
function checkDropdown(typeOfFood, fromDropdown, selectedText){
	//get list of all divs
	var divList = eleById('mainDiv').getElementsByTagName('div');
	if(fromDropdown == 1){
		if(divList.length > 1){
			while(divList.length > 1){
				//remove the last div always
				divList[divList.length-1].parentNode.removeChild(divList[divList.length-1]);
			}
		}
		if(window.localStorage){
			if(!localStorage.getItem('firsttext'))
				localStorage.setItem('firsttext',selectedText);
			else
				localStorage.setItem('firsttext',selectedText);
		}else{
			SetCookie('firsttext',selectedText);
		}
	}else if(fromDropdown == 2){
		if(divList.length > 2){
			while(divList.length > 2){
				//remove the last div always
				divList[divList.length-1].parentNode.removeChild(divList[divList.length-1]);
			}
		}
		if(window.localStorage){
			if(!localStorage.getItem('secondtext'))
				localStorage.setItem('secondtext',selectedText);
			else
				localStorage.setItem('secondtext',selectedText);
		}else{
			SetCookie('secondtext',selectedText);
		}
	}else if(fromDropdown == 3){
		if(divList.length > 3){
			while(divList.length > 3){
				//remove the last div always
				divList[divList.length-1].parentNode.removeChild(divList[divList.length-1]);
			}
		}
		if(window.localStorage){
			if(!localStorage.getItem('thirdtext'))
				localStorage.setItem('thirdtext',selectedText);
			else
				localStorage.setItem('thirdtext',selectedText);
		}else{
			SetCookie('thirdtext',selectedText);
		}
	}

	if(typeOfFood != "choose"){
		if(fromDropdown == 3)
			displayOrderMessage(selectedText.toLowerCase());
		else{
			createDropdown(typeOfFood,fromDropdown);
		}
	}
}

//function to create dropdown
function createDropdown(typeOfFood,fromDropdown){
	
	console.log("in create dropdown dropdown value = "+typeOfFood+"--- from dropdown = "+fromDropdown);
	//local variable to store an array
	var temp;
	fromDropdown += 1;
	var myBody = document.getElementsByTagName('body')[0].getElementsByTagName('div')[2];
	
	// create elements in memory, First create div
	var divEle = createEle('div');
	divEle.setAttribute('id','divmargin');
	//create label	
	var labelEle = createEle('label');
	labelEle.setAttribute('id','label');
	//create label text
	if(fromDropdown == 1)
		var labelText = createText('Choose your type of Cuisine');
	else if(fromDropdown == 2)
		var labelText = createText('Choose your type of Food');
	else
		var labelText = createText('Choose your specific Dish');
	
	labelEle.appendChild(labelText);
	//append label to div
	divEle.appendChild(labelEle);

	//create select element
	var selectList = createEle('select');
	selectList.setAttribute('id','select'+fromDropdown);
	
	if(document.attachEvent){
		selectList.attachEvent("onchange",function(){
			onSelectAnyDropdown(selectList.selectedIndex, fromDropdown);
		});
	} else {
		selectList.addEventListener("change", function() {
	  		onSelectAnyDropdown(selectList.selectedIndex, fromDropdown);
		});
	}

	temp = getRequiredChoiceArray(typeOfFood);
	console.log(temp);

	//add first element as choose
	var option = createEle('option');
	option.setAttribute('id','options');
	option.setAttribute('value',"choose");
	option.appendChild(createText("--- Choose ---"));
	//option.innerText = "--- Choose ---";
	selectList.appendChild(option);

	for(var i=0; i<temp.length; i++){
		//add elements to option
		option = createEle('option');
		option.setAttribute('id','options');
		console.log(temp[i]);
		option.setAttribute('value',typeOfFood+i);
		option.appendChild(createText(temp[i]));
		//option.innerText = temp[i];
		//append option element to select element
		selectList.appendChild(option);
	}
	//append select element to div
	divEle.appendChild(selectList);

	// display elements onto the document / browser
	myBody.appendChild(divEle);	
}

function getRequiredChoiceArray(typeOfFood){
	var temp, choice = typeOfFood.toLowerCase();
	console.log(choice);
	if(choice == "choice1"){
		temp = choices.choice1;
	} else if(choice == "choice10"){
		temp = choices.choice10;
	} else if(choice == "choice11"){
		temp = choices.choice11;
	} else if(choice == "choice12"){
		temp = choices.choice12;
	} else if(choice == "choice100"){
		temp = choices.choice100;
	} else if(choice == "choice101"){
		temp = choices.choice101;
	} else if(choice == "choice102"){
		temp = choices.choice102;
	} else if(choice == "choice110"){
		temp = choices.choice110;
	} else if(choice == "choice111"){
		temp = choices.choice111;
	} else if(choice == "choice112"){
		temp = choices.choice112;
	} else if(choice == "choice120"){
		temp = choices.choice120;
	} else if(choice == "choice121"){
		temp = choices.choice121;
	} else if(choice == "choice122"){
		temp = choices.choice122;
	}

	return temp;
}

function displayOrderMessage(imageName){
	var myBody = document.getElementsByTagName('body')[0].getElementsByTagName('div')[2];
	
	var divEle = createEle('div');
	divEle.setAttribute('id','message_div');

	var hrEle = createEle('hr');
	divEle.appendChild(hrEle);

	var labelEle = createEle('label');
	labelEle.setAttribute('id','msglabel');
	var labelText = createText('You ordered '); 

	var labelEle1 = createEle('label');
	labelEle1.setAttribute('style','font-size:x-large');
	labelEle1.setAttribute('style','color:deepskyblue');
	labelEle1.setAttribute('onmouseover','change(this)');
	labelEle1.setAttribute('onmouseout','original(this)');
	
	if(!window.localStorage)
		var labelText1 = createText(''+GetCookie("firsttext")+'-'+GetCookie("secondtext")+'-'+GetCookie("thirdtext"));
	else
		var labelText1 = createText(''+localStorage.getItem('firsttext')+'-'+localStorage.getItem('secondtext')+'-'+
									localStorage.getItem('thirdtext'));
	
	labelEle1.appendChild(labelText1);
	labelEle.appendChild(labelText);
	labelEle.appendChild(labelEle1);
	divEle.appendChild(labelEle);

	var brEle = createEle('br');
	divEle.appendChild(brEle);

	var imgEle = createEle('img');
	imgEle.setAttribute('id','image');
	var path = 'images/'+imageName+'.jpg';
	path = path.replace(/\s/g,'');
	console.log("Path = "+path);
	imgEle.setAttribute('src',path);
	imgEle.setAttribute('onmouseover','zoomInEffect(this)');
	imgEle.setAttribute('onmouseout','zoomOutEffect(this)');

	divEle.appendChild(imgEle);
	myBody.appendChild(divEle);

	createForm();
}

function zoomInEffect(x){
	x.style.width = "80%";
	x.style.height = "80%";
}

function zoomOutEffect(x){
	x.style.width = "30%";
	x.style.height = "30%";
}

function change(x){
	x.style.fontSize = "xx-large";
	x.style.color = "#d8c5ec";
}

function original(x){
	x.style.fontSize = "x-large";
	x.style.color = "deepskyblue";
}

function createEle(ele){
	return document.createElement(ele);
}

function eleById(ele){
	return document.getElementById(ele);
}

function createText(writetext){
	return document.createTextNode(writetext);
}

//create final review form on change of final dropdown i.e. 3rd select option
function createForm(){
	var myBody = document.getElementsByTagName('body')[0].getElementsByTagName('div')[2];

	var formDiv = createEle('div');
	formDiv.setAttribute('id','divmargin');

	//check if user is visiting for the first time or its returning user based on cookie
	//display message accordingly
	if( GetCookie('user_name') == null ){
		var h2Ele = createEle('h2');
		h2Ele.setAttribute('id','thankYouLbl');
		var h2Text = createText("Thank you for visiting our website. Please fill in below review form.");
		h2Ele.appendChild(h2Text);
		formDiv.appendChild(h2Ele);
	} else {
		var getName = GetCookie('user_name');
		var h2Ele = createEle('h2');
		h2Ele.setAttribute('id','thankYouLbl');
		var h2Text = createText("Welcome back "+getName.toUpperCase()+", please provide your review. We have retrieved your personal info for you.");
		h2Ele.appendChild(h2Text);
		formDiv.appendChild(h2Ele);							
	}

	var formEle = createEle('form');
	formEle.setAttribute('id','reviewForm');
	formEle.setAttribute('name','reviewForm');
	
	var fsetEle = createEle('fieldset');
	var nameLbl = createEle('label');
	nameLbl.setAttribute('id','formLbl');
	var labelText = createText('Name :');
	nameLbl.appendChild(labelText);
	var nameInp = createEle('input');
	nameInp.setAttribute('id','name');
	nameInp.setAttribute('type','text');
	fsetEle.appendChild(nameLbl);
	fsetEle.appendChild(nameInp);
	formEle.appendChild(fsetEle);
	
	var fsetEle1 = createEle('fieldset');
	var phoneLbl = createEle('label');
	phoneLbl.setAttribute('id','formLbl');
	var labelText1 = createText('Phone No :');
	phoneLbl.appendChild(labelText1);
	var phoneInp = createEle('input');
	phoneInp.setAttribute('id','phone');
	phoneInp.setAttribute('type','tel');
	fsetEle1.appendChild(phoneLbl);
	fsetEle1.appendChild(phoneInp);
	formEle.appendChild(fsetEle1);

	var fsetEle2 = createEle('fieldset');
	var emailLbl = createEle('label');
	emailLbl.setAttribute('id','formLbl');
	var labelText2 = createText('Email :');
	emailLbl.appendChild(labelText2);
	var emailInp = createEle('input');
	emailInp.setAttribute('id','email');
	emailInp.setAttribute('type','email');
	fsetEle2.appendChild(emailLbl);
	fsetEle2.appendChild(emailInp);
	formEle.appendChild(fsetEle2);

	var fsetEle3 = createEle('fieldset');
	var cmntLbl = createEle('label');
	cmntLbl.setAttribute('id','formLbl');
	var labelText2 = createText('Comment :');
	cmntLbl.appendChild(labelText2);
	var cmntInp = createEle('textArea');
	cmntInp.setAttribute('id','comment');
	cmntInp.setAttribute('type','text');
	fsetEle3.appendChild(cmntLbl);
	fsetEle3.appendChild(cmntInp);
	formEle.appendChild(fsetEle3);

	var fsetEle4 = createEle('fieldset');
	var btnInp = createEle('input');
	btnInp.setAttribute('type','button');
	btnInp.setAttribute('id','subButton');
	btnInp.setAttribute('value','Submit');

	if(document.attachEvent){
		btnInp.attachEvent("onclick",function() {
	  		submitButton();
		});
	} else {
		btnInp.addEventListener("click", function() {
	  		submitButton();
		});
	}

	fsetEle4.appendChild(btnInp);
	formEle.appendChild(fsetEle4);

	formDiv.appendChild(formEle);
	myBody.appendChild(formDiv);

	//if cookie exist, get all the details and display in related form fields
	if( GetCookie('user_name') != null ){
		eleById('name').value = GetCookie('user_name');
		eleById('phone').value = GetCookie('user_phone');
		eleById('email').value = GetCookie('user_email');
		//eleById('comment').value = GetCookie('user_comment');
	}
}

//onclick of form submit button
function submitButton(){
	console.log("-----"+eleById('name').value+"----"+eleById('phone').value+"-----"+eleById('email').value+
				"-------"+eleById('comment').value);

	//validation: check if all values are entered
	if(eleById('name').value == "" || eleById('phone').value == "" ||
		eleById('email').value == "" || eleById('comment').value == ""){

		//if error message already exists, delete it
		if(eleById('reviewForm').parentNode.lastChild.nodeName == "H3")
			eleById('reviewForm').parentNode.removeChild(eleById('reviewForm').parentNode.lastChild);

		var errorMsg = createEle('h3');
		errorMsg.setAttribute('id','errroLbl');
		errorMsg.appendChild(createText("Please fill all details"));
		eleById('reviewForm').parentNode.appendChild(errorMsg);
	}else{

		//delete error message
		if(eleById('reviewForm').parentNode.lastChild.nodeName == "H3")
			eleById('reviewForm').parentNode.removeChild(eleById('reviewForm').parentNode.lastChild);

		//set all cookies from data inserted in the form
		SetCookie('user_name',eleById('name').value);
		SetCookie('user_phone',eleById('phone').value);
		SetCookie('user_email',eleById('email').value);
		SetCookie('user_comment',eleById('comment').value);

		//clear the form fields value
		eleById('name').value = "";
		eleById('phone').value = "";
		eleById('email').value = "";
		eleById('comment').value = "";

		//delete first thank you or welcome back msg on submitting review
		if(eleById('reviewForm').parentNode.firstChild.nodeName == "H2")
			eleById('reviewForm').parentNode.removeChild(eleById('reviewForm').parentNode.firstChild);
		
		//add thank you message at the end
		var thanksMsg = createEle('h2');
		thanksMsg.setAttribute('id','finalthankYouLbl');
		thanksMsg.appendChild(createText("Thank you for your review "+GetCookie('user_name').toUpperCase()+
										 ". Hope to see you again!"));

		//if thank you msg already exists, delete it and recreate it with new name stored in cookies 
		if(eleById('reviewForm').parentNode.lastChild.nodeName == "H2"){
			eleById('reviewForm').parentNode.removeChild(eleById('reviewForm').parentNode.lastChild);
			eleById('reviewForm').parentNode.appendChild(thanksMsg);
		}else{
			eleById('reviewForm').parentNode.appendChild(thanksMsg);
		}
	}

}