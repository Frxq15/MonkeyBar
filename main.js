let sizetype = '';
let drinktype = '';
let total = 0;
let newtotal = 0;
let sizetotal = 2.95;
let extratotal = 0;
let drinkselected = false;
let favouriteexists = false;
var ingredients = [];
let ingredientsstr = '';

function sizeSelect(size) {
	sizetype = size;
	console.log('Drink size set to :', sizetype)

	if (sizetype == 'Small') {
		sizetotal = 2.45;
        updateTotal();
		return;
	}
	if (sizetype == 'Medium') {
		sizetotal = 2.95;
        updateTotal();
		return;
	}
	if (sizetype == 'Large') {
		sizetotal = 3.45;
        updateTotal();
		return;
	} else {
		console.log("An error occured whilst calculating size price.");
	}
}

function drinkSelect(drink) {
	drinktype = drink;
	console.log('Drink type set to :', drinktype);
	drinkselected = true;
	setBases();
	updateBase();
}

function updateTotal() {
	total = sizetotal + extratotal;
	console.log("new total = ", total);
	document.getElementById("total").innerHTML = "£" + String(total);
}
function setBases() {
	if (drinktype == 'Smoothie') {
		document.getElementById("smoothieOptions").hidden = false;
		document.getElementById("MilkshakeOptions").hidden = true;
		document.getElementById("Extras").hidden = true;
		document.getElementById("baseA").innerHTML = "Apple Juice";
		document.getElementById("baseB").innerHTML = "Orange Juice";
		document.getElementById("base1").checked = true;
		return;
	}
	if (drinktype == 'Milkshake') {
		document.getElementById("smoothieOptions").hidden = false;
		document.getElementById("MilkshakeOptions").hidden = false;
		document.getElementById("Extras").hidden = false;
		document.getElementById("baseA").innerHTML = "Whole Milk";
		document.getElementById("baseB").innerHTML = "Semi-Skimmed Milk";
		document.getElementById("baseC").innerHTML = "Coconut Milk";
		document.getElementById("baseD").innerHTML = "Oat Milk";
		document.getElementById("base2").checked = true;
		return;
	}
}

function log(str) {
	console.log(str);
}

function updateBase() {
	if (drinkselected) {
		document.getElementById("base1").hidden = false;
		document.getElementById("base2").hidden = false;
		return;
	}
	document.getElementById("smoothieOptions").hidden = true;
	document.getElementById("MilkshakeOptions").hidden = true;
}

function resetForm() {
	drinkselected = false;
	drinktype = '';
	updateBase();
	sizetotal = 2.95;
	extratotal = 0;
    tempIngredients = [];
    tempExtras = [];
	updateTotal();
	document.getElementById("newtotal").innerHTML = "£" + newtotal;
	document.getElementById("total").innerHTML = "£" + String(total);
	document.getElementById('drinksForm').reset();
	initial();
}

function checkForFavourite() {
	//if (FAVOURITE EXISTS) {
	//favouriteexists = true;
	//return;
	//}
	favouriteexists = false;
	document.getElementById("order").disabled = true;
	document.getElementById("order").style.backgroundColor = "rgb(250, 45, 45)";
	document.getElementById("order").innerHTML = "<del>★ ORDER FAVOURITE</del>";
}

//JSON HANDLING
function getIngredients() {
	fetch('./ingredients.json')
		.then(response => response.text())
		.then((data) => {
			json = JSON.parse(data);
			ingredients = json.ingredients;
			log(ingredients);
			setIngredients();
		})
}

function setIngredients() {
	document.getElementById("ingredientA").innerHTML = ingredients[0];
	document.getElementById("ingredientB").innerHTML = ingredients[1];
	document.getElementById("ingredientC").innerHTML = ingredients[2];
	document.getElementById("ingredientD").innerHTML = ingredients[3];
	document.getElementById("ingredientE").innerHTML = ingredients[4];
	document.getElementById("ingredientF").innerHTML = ingredients[5];
	document.getElementById("ingredientG").innerHTML = ingredients[6];
}
var tempIngredients = [];

function addIngredient(i) {
	tempIngredients.push(i);
	var str = tempIngredients.toString();
	log('Ingredient added: ' + str);
}

function selectIngredient(i) {
	if (document.getElementById(i).checked == false) {
		log("ingredient removed");
		removeIngredients(i);
		return;
	}
	tempIngredients.push(i);
	log("ingredient added");
	log("current ingredients: ");
	tempIngredients.forEach(item => console.log(item));
	return;
}
var tempExtras = [];

function selectExtra(e, id) {
	if (document.getElementById(id).checked) {
		log("added extra " + e);
		tempExtras.push(e);
		extratotal += 0.50;
        updateTotal();
		log("new extra total = " + extratotal);
		tempExtras.forEach(item => console.log(item));
		return;
	}
	log("removed extra " + e)
    extratotal -= 0.50;
    updateTotal();
	removeExtras(e);
	return;
}

function initial() {
	document.getElementById("smoothieOptions").hidden = true;
	document.getElementById("MilkshakeOptions").hidden = true;
	document.getElementById("Extras").hidden = true;
    sizeSelect('Medium');
    sizetotal = 2.95;
    document.getElementById('total').innerHTML = String('£'+total);
	total = sizetotal + extratotal;
	checkForFavourite();
	getIngredients();
	updateNewTotal(0);
	updateTotal();
}

function removeIngredients(i) {
	log("INGREDIENT = " + i);
	var iIndex = tempIngredients.indexOf(i);
	tempIngredients.splice(iIndex, 1);
	log("current ingredients: ");
	tempIngredients.forEach(item => console.log(item));
}

function removeExtras(i) {
	log("EXTRA = " + i);
	var iIndex = tempExtras.indexOf(i);
	tempExtras.splice(iIndex, 1);
	log("current extras: ");
	tempExtras.forEach(item => console.log(item));
}

function addToBasket() {
    if(drinktype == '') {
        alert('Please select a drink type before adding this item to basket.');
        return;
    }
	if(tempIngredients.length < 1) {
        alert('Please select atleast one ingredient before adding this item to basket.');
        return;
    }
	if(tempExtras.length < 1) {
        tempExtras.push('No Extras Selected');
    }
	updateNewTotal(total);
	log('ADDED TO BASKET AND UPDATED TOTAL TO: ' + total);
    let newi = "";
    let newe = "";
    tempIngredients.forEach(ingredient => (newi += ingredient + ", "))
    tempExtras.forEach(extra => (newe += extra + ", "))
    var output = "1x " + sizetype + "<b> " + drinktype + "</b><br> <b>Ingredients: </b>" + newi + "<br> <b>Extras:</b> " + newe + "<br><b>Cost:</b> £" + total + "<br>";
    log(output);
    updateTotal();
    document.getElementById('basket').innerHTML = document.getElementById('basket').innerHTML + output + "<br>";
	resetForm();
	return;
}
function selectIngredient(i) {
	if (document.getElementById(i).checked == false) {
		log("ingredient removed");
		removeIngredients(getIngredientNames(i));
		return;
	}
	tempIngredients.push(getIngredientNames(i));
	log("ingredient added");
	log("current ingredients: ");
	tempIngredients.forEach(item => console.log(item));
	return;
}
function getIngredientNames(i) {
	switch (i.toLowerCase()) {
		case "ingredient1":
			log(String(ingredients[0]));
			return String(ingredients[0]);
		case "ingredient2":
			return String(ingredients[1]);
		case "ingredient3":
			return String(ingredients[2]);
		case "ingredient4":
			return String(ingredients[3]);
		case "ingredient5":
				return String(ingredients[4]);
		case "ingredient6":
				return String(ingredients[5]);
		case "ingredient7":
				return String(ingredients[6]);
	}
}
function removeIngredients(i) {
	log("INGREDIENT = " + i);
	var iIndex = tempIngredients.indexOf(getIngredientNames(i));
	tempIngredients.splice(iIndex, 1);
	log("current ingredients: ");
	tempIngredients.forEach(item => console.log(item));
}
function submit() {
	alert('Your drinks are now being processed, Thank you for your order.');
	location.reload();
	return;
}
function updateNewTotal(a) {
    newtotal = newtotal + a;
	console.log("FINAL total = ", newtotal);
	document.getElementById("newtotal").innerHTML = "£" + String(newtotal.toFixed(2));
}
function setTotal() {
	newtotal = 0;
}