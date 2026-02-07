let totalPlaces = 0;
let parkingInitialise = false;

let vehicules = [];       // Véhicules actuellement dans le parking
let vehiculesSortis = []; // Véhicules déjà sortis

let ticketAuto = 1;
const TARIF_HORAIRE = 100; // 100 FCFA / heure

// Initialisation du parking
function initialiser() {
    if (parkingInitialise) {
        alert("Le parking est déjà initialisé");
        return;
    }

    totalPlaces = parseInt(document.getElementById("totalPlaces").value);
    if (isNaN(totalPlaces) || totalPlaces <= 0) {
        alert("Nombre total de places invalide");
        return;
    }

    parkingInitialise = true;
    document.getElementById("totalPlaces").disabled = true;
    afficherEtat();
}

// Entrée véhicule
function entree() {
    if (!parkingInitialise) {
        alert("Veuillez initialiser le parking");
        return;
    }

    if (vehicules.length >= totalPlaces) {
        alert("Parking plein !");
        return;
    }

    let immat = document.getElementById("immatEntree").value.trim();
    if (immat === "") {
        alert("Immatriculation obligatoire");
        return;
    }

    if (vehicules.find(v => v.immat === immat)) {
        alert("Ce véhicule est déjà dans le parking");
        return;
    }

    vehicules.push({
        immat: immat,
        entree: new Date()
    });

    document.getElementById("immatEntree").value = "";
    afficherEntrees();
    afficherEtat();
}

// Préparer paiement
function sortie() {
    let immat = document.getElementById("immatSortie").value.trim();
    let index = vehicules.findIndex(v => v.immat === immat);

    if (index === -1) {
        alert("Véhicule non trouvé");
        return;
    }

    let vehicule = vehicules[index];
    let heureSortie = new Date();

    // Calcul durée et montant
    let dureeMs = heureSortie - vehicule.entree;
    let dureeHeures = Math.ceil(dureeMs / (1000 * 60 * 60));
    let montant = dureeHeures * TARIF_HORAIRE;

    // Afficher montant à payer et ticket
    document.getElementById("montant").innerHTML =
        `💰 Montant à payer : <strong>${montant} FCFA</strong>`;

    document.getElementById("ticket").textContent = `
======== TICKET DE PARKING ========
Ticket N° : ${ticketAuto}
Immatriculation : ${vehicule.immat}
Date et heure d'entrée : ${vehicule.entree.toLocaleString()}
Date et heure de sortie : ${heureSortie.toLocaleString()}
Tarif : 100 FCFA / heure
Montant à payer : ${montant} FCFA
==================================
`;

    // Ajouter à sortis mais le véhicule reste présent jusqu'au clic sur "Payer"
    vehiculesSortis.push({
        immat: vehicule.immat,
        entree: vehicule.entree,
        sortie: heureSortie,
        montant: montant,
        ticket: ticketAuto
    });

    ticketAuto++;
}

// Paiement et sortie réelle
function payer() {
    if (vehiculesSortis.length === 0) {
        alert("Aucun paiement en attente");
        return;
    }

    // On prend le dernier véhicule pour payer
    let v = vehiculesSortis[vehiculesSortis.length - 1];

    // Retirer le véhicule de la liste des présents
    let index = vehicules.findIndex(vehicle => vehicle.immat === v.immat);
    if (index !== -1) {
        vehicules.splice(index, 1);
    }

    afficherEntrees();
    afficherSorties();
    afficherEtat();

    alert(`Paiement de ${v.montant} FCFA effectué. Véhicule sorti !`);
}

// Impression (2 copies)
function imprimerTicket() {
    window.print();
}

// Affichage des véhicules présents
function afficherEntrees() {
    let tbody = document.getElementById("listeEntrees");
    tbody.innerHTML = "";

    vehicules.forEach(v => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${v.immat}</td>
            <td>${v.entree.toLocaleTimeString()}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Affichage des véhicules sortis
function afficherSorties() {
    let tbody = document.getElementById("listeSorties");
    tbody.innerHTML = "";

    vehiculesSortis.forEach(v => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${v.immat}</td>
            <td>${v.entree.toLocaleTimeString()}</td>
            <td>${v.sortie.toLocaleTimeString()}</td>
            <td>${v.montant} FCFA</td>
        `;
        tbody.appendChild(tr);
    });
}

// État du parking
function afficherEtat() {
    let occupees = vehicules.length;
    let libres = totalPlaces - occupees;

    document.getElementById("etat").innerHTML =
        `🅿️ Places totales : ${totalPlaces} |
         🚗 Occupées : ${occupees} |
         ✅ Libres : ${libres}`;
}
