function logout() {
	localStorage.clear();
	sessionStorage.clear();
	window.location.replace("./login.html");
}

var token = localStorage.getItem("token");

//Function to get list of sites
async function getSites() {
	let siteName = " ";
	let site = document.getElementById("site_one");
	let site2 = document.getElementById("site_two");
	let site3 = document.getElementById("site_three");
	let response = await fetch(
		`https://fcs.concept-nova.com/api/v1/sites/?token=${token}`,
		{
			method: "GET",
			 mode: 'no-cors',
			headers: {
		      'Content-Type': 'application/json'
		      // 'Content-Type': 'application/x-www-form-urlencoded',
		       }
		}
	);
	let results = await response.json();

	if (results.code == 200) {
		localStorage.setItem("siteId", JSON.stringify(results.message));
	}
	results.message.forEach((result) => {
		siteName += ` <h5>${result.site_name}</h5>`;
		site.innerHTML = siteName;
		site2.innerHTML = siteName;
		site3.innerHTML = siteName;
	});
}
getSites();

var site_details = JSON.parse(localStorage.getItem("siteId"));

let siteId = site_details[0].site_id;

let tank_container = document.getElementById("tanks_list");

//function to get list of tanks
async function getTankList() {
	let tank = " ";
	let tankList = document.getElementById("tank_list");
	let tankList2 = document.getElementById("tank_list2");
	let tankList3 = document.getElementById("tank_list3");
	let response = await fetch(
		`https://fcs.concept-nova.com/api/v1/sites/${siteId}?token=${token}`,
		{
			method: "GET",
			 mode: 'no-cors',
			headers: {
		      'Content-Type': 'application/json'
		      // 'Content-Type': 'application/x-www-form-urlencoded',
		    }
		}
	);
	let results = await response.json();

	if (results.code == 200) {
		localStorage.setItem("tankId", JSON.stringify(results.message));
	}

	results.message.forEach((result) => {
		tank += `<p>
        ${result.tank_name}           
         </p> `;
	});

	tankList.innerHTML = tank;
	tankList2.innerHTML = tank;
	tankList3.innerHTML = tank;
}
getTankList();

var tank_details = JSON.parse(localStorage.getItem("tankId"));

let tankId = tank_details[0].tank_id;

//function to get tanks
async function getTanks() {
	let tankDetails = "";
	let details1 = document.getElementById("tank_details");
	let details2 = document.getElementById("tank_details2");
	let details3 = document.getElementById("tank_details3");
	let response = await fetch(
		`https://fcs.concept-nova.com/api/v1/sites/${siteId}/${tankId}?token=${token}`,
		{
			method: "GET",
			 mode: 'no-cors',
			headers: {
			      'Content-Type': 'application/json'
			      // 'Content-Type': 'application/x-www-form-urlencoded',
			    }
		}
	);
	let result = await response.json();
	let details = [];
	details.push(result.message);

	details.forEach((detail) => {
		tankDetails += `
         <p><span>Tank Capacity: </span>  ${detail.tank_capacity}</p>
         <p><span>Tank Current Volume: </span> ${detail.tank_current_volume}</p> `;
	});

	details1.innerHTML = tankDetails;
	details2.innerHTML = tankDetails;
	details3.innerHTML = tankDetails;
}
getTanks();
