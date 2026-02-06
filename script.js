// ===== VARIABLES =====
let placesTotales = 0;
let placesOccupees = 0;

let heureEntree = null;
let paiementEffectue = false;

const tarifParHeure = 500; // FCFA

// ===== INITIALISATION =====
function initialiser() {
    placesTotales = parseInt(document.getElementById("totalPlaces").value);

    if (isNaN(placesTotales) || placesTotales <= 0) {
        alert("Nombre de places invalide !");
        return;
    }

    placesOccupees = 0;
    heureEntree = null;
    paiementEffectue = false;

    afficherEtat("Parking initialisé");
}

// ===== ENTREE =====
function entree() {
    if (placesOccupees >= placesTotales) {
        afficherEtat("🚫 Parking plein !");
        return;
    }

    placesOccupees++;
    heureEntree = new Date();
    paiementEffectue = false;

    afficherEtat("🚗 Véhicule entré");
}

// ===== SORTIE =====
function sortie() {
    if (placesOccupees <= 0) {
        afficherEtat("🚫 Parking vide !");
        return;
    }

    if (!paiementEffectue) {
        afficherEtat("💳 Paiement obligatoire avant la sortie !");
        return;
    }

    placesOccupees--;
    heureEntree = null;
    paiementEffectue = false;

    afficherEtat("✅ Véhicule sorti");
}

// ===== CALCUL DU PAIEMENT =====
function calculerPaiement() {
    if (!heureEntree) return 0;

    const maintenant = new Date();
    const dureeMs = maintenant - heureEntree;
    const heures = Math.ceil(dureeMs / (1000 * 60 * 60));

    return heures * tarifParHeure;
}

// ===== PAYER =====
function payer() {
    if (!heureEntree) {
        afficherEtat("Aucun véhicule à payer");
        return;
    }

    const montant = calculerPaiement();
    paiementEffectue = true;

    document.getElementById("montant").innerText =
        "💰 Montant payé : " + montant + " FCFA";

    afficherEtat("Paiement effectué avec succès");
}

// ===== AFFICHAGE =====
function afficherEtat(message) {
    document.getElementById("etat").innerHTML =
        message + "<br><br>" +
        "Places totales : " + placesTotales + "<br>" +
        "Places occupées : " + placesOccupees + "<br>" +
        "Places libres : " + (placesTotales - placesOccupees);

    if (heureEntree) {
        document.getElementById("temps").innerText =
            "⏱ Temps de stationnement en cours...";
        document.getElementById("montant").innerText =
            "💰 Montant à payer : " + calculerPaiement() + " FCFA";
    } else {
        document.getElementById("temps").innerText = "";
        document.getElementById("montant").innerText = "";
    }
}
