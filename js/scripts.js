//this is untested, unfinished, and unused
//intended originally to pass an individual bus' info into index.html as an element, then style it

//set time by hour and minutes
const dt = new Date();
document.getElementById("datetime").innerHTML = dt.toLocaleTimeString();

//bus routes
const routesAtStop = [
  {line: "60", dir: "(E)", dest: "Randolph / Harbor Dr", freq: 20, status: "active"},
  {line: "124", dir: "(E)", dest: "Navy Pier", freq: 10, status: "active"},
  {line: "151", dir: "(N)", dest: "Devon / Clark", freq: 16, status: "active"},
  {line: "J14", dir: "(S)", dest: "103rd/Stony Island", freq: 15, status: "active"},
  {line: "124", dir: "(S)", dest: "Navy Pier", freq: 10, status: "active"},
  {line: "6x", dir: "", dest: "Jackson Park Express", freq: null, status: "reroute"},
  {line: "4", dir: "", dest: "Cottage Grove", freq: null, status: "outOfService"},
  {line: "20", dir: "", dest: "Madison", freq: null, status: "outOfService"},
  {line: "157", dir: "", dest: "Streeterville / Taylor", freq: null, status: "outOfService"}
]

//sets a random next bus arrival of 1 to 9 minutes for each route
//should ultimately be replaced with some function to get this value
const randomStart = (route) => {
  route["next"] = (Math.trunc (Math.random() * 10));
}

//total number of minutes worth of arrivals to show in table
const minutesToShow = 120;

//return number of arrivals to show
const numArrivals = (route) => {
  randomStart(route);
  return Math.trunc((minutesToShow - route["next"]) / route["freq"]);
}

//set an arrival for each route
const setAnArrival = (route, iteration) => {
  return route["next"] + iteration * route["freq"];
}

let busesToShow = [];

const createIndivBus = (route, iteration) => {
    aBus = {
      line: route["line"],
      dir: route["dir"],
      dest: route["dest"],
      eta: setAnArrival(route, iteration)
    };
    busesToShow.push(aBus);
}

const routeArrToBusArr = (route) => {
  if (route.status === "active") {
    for (i = 0; i < numArrivals(route); i++) {
      createIndivBus(route, i);
    }
  }
}

const busArr = () => {
  for (x = 0; x < routesAtStop.length; x++) {
    routeToArray(routesAtStop[x]);
  }
}

busArr();

const compareNumbers = (a, b) => {
  return a.eta - b.eta;
}

busesToShow.sort(compareNumbers);
