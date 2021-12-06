function findObfuscatedClass(searchQuery) {
    let output = []

    let e2 = document.querySelectorAll("*")
    for (let e of e2) {
        if (e.className.includes(searchQuery)) {
            output.push(e)
        }
    }
    return output
}

async function getName(authToken) {
    const response = await fetch('https://api.blooket.com/api/users/verify-token?token=JWT+' + authToken);
    const data = await response.json();

    return data.name
};

function buy(name) {
    let boxes = Array.from(findObfuscatedClass("styles__box__"))
    boxes.forEach(function(obj) {
        let obj_iter = obj.children
        for (let obj2 of obj_iter) {
            if (obj2.innerHTML == name) {
                obj2.parentNode.click()
                let btnArr = Array.from(findObfuscatedClass("styles__button__"))
                btnArr.forEach(function(btn) {
                    if (btn.innerHTML.includes("Yes")) {
                        btn.click()
                       setTimeout(function() {
                            let final = Array.from(findObfuscatedClass("styles__mysteryBoxContainerBefore___"))
                            final[0].click()
                       }, 1000)
                    }
                })
            }
        }
    })
}

async function httpBuy(name) {
    const username = await getName();
    fetch("https://api.blooket.com/api/users/unlockblook", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7",
    "authorization": localStorage.token,
    "content-type": "application/json;charset=UTF-8",
    "sec-ch-ua": "\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Chrome OS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  },
  "referrer": "https://www.blooket.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": JSON.stringify({"name": username, "box": name.split(" ")[0]}),
  "method": "PUT",
  "mode": "cors",
  "credentials": "include"
});
}

function getTokens() {
    let tokens = parseInt(findObfuscatedClass("styles__tokenBalanceText___")[0].innerHTML)
    return tokens
}

let purchaseQueue = {
    "Blizzard Box": 10,
    "Aquatic Box": 5
}

let costs = {
    "Blizzard Box": 25,
    "Aquatic Box": 25,
    "Bot Box": 20,
    "Space Box": 20,
    "Breakfast Box": 15,
    "Medieval Box": 15,
    "Wonderland Box": 20
}

for (let [name, amt] of Object.entries(purchaseQueue)) {
    for (let i = 0; i < amt; i++) {
        console.log(name, amt, getTokens())
        if (costs[name] < getTokens()) {
            buy(name)
        }else {
            console.log("Couldnt finish buying things because little money")
            break
        }
    }
}
