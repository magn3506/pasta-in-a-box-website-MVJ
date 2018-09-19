//GLOBALE VARIABLER

let retter;
let destination = document.querySelector(".data_container");
let retFilter = "menu";
let modal = document.querySelector("#modal");


// Når DOM er loadet så gå til hentJson
document.addEventListener("DOMContentLoaded", hentJson);


// BURGER MENU & nav JS. Virker kun når menu.html er vist

// når der klikkes på burger menuen går den til functionen menuShow
let burger = document.querySelector(".burger");
burger.addEventListener("click", menuShow);


function menuShow() {

    //BURGER MENU ANIMATION
    // Burger menu bar 1,2,3 får classen Change_bar1,2,3
    document.querySelector(".bar1").classList.add("change_bar1");
    document.querySelector(".bar2").classList.add("change_bar2");
    document.querySelector(".bar3").classList.add("change_bar3");

    //NAV BAR ANIMATION
    //Nav bar får classen nav_in som indeholder en animation/keyframe i menu.css
    //Dette er et loop så nav_out fjernes igen.
    document.querySelector("nav").classList.add("nav_in");
    document.querySelector("nav").classList.remove("nav_out");

    //EVENT LISTENER ON OFF CLICK
    //Der når der klikkes på krydset/burger menu efter første klik går den videre til menuHide
    burger.removeEventListener("click", menuShow);
    burger.addEventListener("click", menuHide);
}


function menuHide() {

    //BURGER MENU ANIMATION
    // Fjerner change_bar class og går tilbage til normal visning.
    document.querySelector(".bar1").classList.remove("change_bar1");
    document.querySelector(".bar2").classList.remove("change_bar2");
    document.querySelector(".bar3").classList.remove("change_bar3");

    //NAV BAR ANIMATION
    // Nav får classen nav_out som inde hollder en animation/keyframe i menu.css
    // Dette er et loop så nav_in fjernes igen.
    document.querySelector("nav").classList.remove("nav_in");
    document.querySelector("nav").classList.add("nav_out");

    //EVENT LISTENER ON OF CLICK
    //Klikkes der på krydset/burgermenu får går scriptet videre til menuShow
    //Dette er et loop så menuHide removes.
    burger.removeEventListener("click", menuHide);
    burger.addEventListener("click", menuShow);

};

//PRIMÆRE JS DER FUNGERE PÅ BÅDE index.html og menu.html


// asyncron function der henter json filen.
async function hentJson() {

    let myJson = await fetch("csvjson.json");
    retter = await myJson.json();
    visRetter();
}


//For each loop der styre filtrering. Hvert element men class .menu_item bliver en får værdien af knap og for hver knap vil den gå videre til funcitonen filtrering
document.querySelectorAll(".menu_item").forEach(knap => {
    knap.addEventListener("click", filtrering);

});

// Sætter dater_container til at være tom  " " istedet for "menu" indsætter istedet data-kategorien og går videre til vis retter functionen.
function filtrering() {

    destination.textContent = "";
    retFilter = this.getAttribute("data-kategori");
    visRetter();
}

// Vis retter kloner template og udskriver i html.

function visRetter() {
    console.log("visr retter");

    // taget .ret_template bliver til en variabel
    let template = document.querySelector(".ret_template");


    // for each loop for hver ret
    retter.forEach(ret => {

        // hvis ret. kategori er det samme som ret filter eller samme som "menu" startes klonings processen. Her vælger filteret kun at vise det som matcher den valgte kategori
        if (ret.kategori == retFilter || retFilter == "menu") {

                // kloning af template bliver sat til en variabel.
            let klon = template.cloneNode(true).content;

            // Et valgt element bliver klonet og der tixføjes ny text eller html, hentet fra json filen.
            klon.querySelector("h2").textContent = ret.navn;
            klon.querySelector("img").src = "images/" + ret.billede + ".jpg";
            klon.querySelector(".kortBeskrivelse").textContent = ret.kortbeskrivelse;
            klon.querySelector(".pris").textContent = ret.pris + ".-";

            document.querySelector("h1").textContent = retFilter;

            //modal//
            // Der sættes en eventlistener på hver ret så det bliver en knap
            //derefter går den til visModal
            klon.querySelector(".ret_indhold").addEventListener("click", () => {
                visModal(ret);
            })

            destination.appendChild(klon);
        }

    })
}


// MODAL VISES
function visModal(ret) {
    console.log("vis modal");

// adder en class til modal som hedder vis, den indeholder display block. Se menu.css
    modal.classList.add("vis");

    modal.querySelector(".modal_navn").textContent = ret.navn;
    modal.querySelector(".modal_pris").textContent = "pris" + " " + ret.pris + ".-";


// Hvis der ikke findes en lang beskrivelse af retten i json filen vises den korte istedet.
    if (ret.langbeskrivelse == "" || ret.billede == "") {
        modal.querySelector(".modal_kortbeskrivelse").textContent = ret.kortbeskrivelse;

    } else {
        modal.querySelector(".modal_langbeskrivelse").textContent = ret.langbeskrivelse;
        modal.querySelector("img").src = "images/" + ret.billede + ".jpg";
        modal.querySelector("img").alt = "Dette er et billede af" + " " + ret.billede;
    }

    // eventlistener. Når der klikkes på button/det røde kryds i modal vinduet skjules modal vinduet igen.
    modal.querySelector("button").addEventListener("click", skjulModal);


}

// function der remover classen vis fra modal
function skjulModal(retter) {
    modal.classList.remove("vis");
    console.log("remove vis")

}
