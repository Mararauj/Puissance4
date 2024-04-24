import { Puissance4 } from './puissance4.js'; 

var couleurs = ["red", "green", "blue", "yellow", "orange", "purple", "cyan", "magenta"];

var rows = prompt("Entrez le nombre de lignes :", "6");
var cols = prompt("Entrez le nombre de colonnes :", "7");

while(parseInt(rows) < 4 || parseInt(cols) < 4) {
    alert("Veuillez les saisir à nouveau le nombre de lignes et colonnes (minimum 4)");
    rows = prompt("Entrez le nombre de lignes :", "6");
    cols = prompt("Entrez le nombre de colonnes :", "7");
}

var p1 = prompt("Entrez la couleur du Joueur 1 :", "red");
var p2 = prompt("Entrez la couleur du Joueur 2 :", "yellow");

while (p1 === p2 || !couleurs.includes(p1) || !couleurs.includes(p2)) {
    alert("Veuillez les saisir à nouveau des couleurs différentes (red, green, blue, yellow, orange, purple, cyan, magenta");
    p1 = prompt("Entrez la couleur du Joueur 1 :", "red");
    p2 = prompt("Entrez la couleur du Joueur 2 :", "yellow");
}

new Puissance4('#game', parseInt(rows), parseInt(cols), p1, p2);