let config = {}
config.boxName = "Breakfast Box" //Name of the box you want to open

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

if (window.location.href == "https://www.blooket.com/market") {

let boxes = Array.from(findObfuscatedClass("styles__box__"))

boxes.forEach(function(obj) {
    let obj_iter = obj.children
    for (let obj2 of obj_iter) {
        if (obj2.innerHTML == config.boxName) {
            //console.log("Found Purchase Button!")
            obj2.parentNode.click()
            let btnArr = Array.from(findObfuscatedClass("styles__button__"))
            btnArr.forEach(function(btn) {
                if (btn.innerHTML.includes("Yes")) {
                    //console.log("Found Yes Button!")
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
else {
    alert("Make sure you are running this on shop page!")
}
