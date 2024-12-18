// just some random array for users
let u = [{ u: "admin1", p: "password1" }, { u: "admin2", p: "password2" }];

// buses and like 30 seats, or whtever
let b = [
  { n: "Cubao", s: Array(30).fill("AVAILABLE") },
  { n: "Baguio", s: Array(30).fill("AVAILABLE") },
  { n: "Pasay", s: Array(30).fill("AVAILABLE") }
];

// checks if userame and password are like correct or something
function auth(uN, pW) {
  return u.some(function (x) {
    return x.u === uN && x.p === pW;
  });
}

// shows the bus seats or something idk
function show() {
  for (let i = 0; i < b.length; i++) {
    console.log(b[i].n); // prints bus name
    for (let j = 0; j < b[i].s.length; j++) {
      console.log(j + 1 + ": " + b[i].s[j]); // prints seat number + status
    }
  }
}

// this adds a res, if it's available
function addR(bInd, n, seat) {
  if (b[bInd].s[seat - 1] === "AVAILABLE") {
    b[bInd].s[seat - 1] = n;
    console.log("k, booked seat " + seat + " for " + n);
  } else {
    console.log("nope, seat taken");
  }
}

// removes the res
function rmvR(bInd, n) {
  let i = b[bInd].s.indexOf(n);
  if (i != -1) {
    b[bInd].s[i] = "AVAILABLE";
    console.log("removed " + n + " from bus " + b[bInd].n);
  } else {
    console.log("not found");
  }
}

// admin menu, messy af
function ticketMenu() {
  let uN = prompt("username?");
  let pW = prompt("password?");
  if (auth(uN, pW)) {
    let choice;
    do {
      console.log("1. view buses, 2. manage, 3. logout");
      choice = prompt("pick 1-3");
      switch (choice) {
        case "1":
          show(); // view
          break;
        case "2":
          manage(); // manage seats
          break;
        case "3":
          console.log("byeeee"); // logout
          break;
        default:
          console.log("invalid"); // invalid choice
      }
    } while (choice !== "3");
  } else {
    console.log("wrong login");
  }
}

// admin doing whatever with buses
function manage() {
  let i = prompt("which bus? 0 = Cubao, 1 = Baguio, 2 = Pasay");
  if (i >= 0 && i <= 2) {
    let act;
    do {
      console.log("1. add res, 2. rmv res, 3. cancel");
      act = prompt("choose");
      if (act === "1") {
        let n = prompt("name?");
        let s = prompt("seat?");
        addR(i, n, s);
      } else if (act === "2") {
        let n = prompt("name to rmv?");
        rmvR(i, n);
      } else if (act === "3") {
        console.log("cancelled");
      } else {
        console.log("nah, invalid");
      }
    } while (act !== "3");
  } else {
    console.log("no such bus");
  }
}

// customer junk
function custMenu() {
  let act;
  do {
    console.log("1. book seat, 2. cancel seat, 3. exit");
    act = prompt("choose 1-3");
    if (act === "1") {
      book();
    } else if (act === "2") {
      cancelRes();
    } else if (act === "3") {
      console.log("done");
    } else {
      console.log("invalid");
    }
  } while (act !== "3");
}

// book a seat
function book() {
  console.log("buses: 0 = Cubao, 1 = Baguio, 2 = Pasay");
  let i = prompt("pick bus");
  if (i >= 0 && i <= 2) {
    if (b[i].s.includes("AVAILABLE")) {
      show(); // show seats
      let n = prompt("your name?");
      let s = prompt("which seat?");
      addR(i, n, s); // book seat
    } else {
      console.log("full");
    }
  } else {
    console.log("invalid");
  }
}

// cancel a seat res
function cancelRes() {
  let n = prompt("your name?");
  console.log("buses: 0 = Cubao, 1 = Baguio, 2 = Pasay");
  let i = prompt("pick bus");
  if (i >= 0 && i <= 2) {
    rmvR(i, n); // removes
  } else {
    console.log("nah, wrong bus");
  }
}

// this starts everything
function main() {
  let choice;
  do {
    console.log("1. admin, 2. customer, 3. exit");
    choice = prompt("choose 1-3");
    switch (choice) {
      case "1":
        ticketMenu(); // admin stuff
        break;
      case "2":
        custMenu(); // customer stuff
        break;
      case "3":
        console.log("bye");
        break;
      default:
        console.log("nah");
    }
  } while (choice !== "3");
}

main(); // runs the whole thing, I should had named the variables sbetter