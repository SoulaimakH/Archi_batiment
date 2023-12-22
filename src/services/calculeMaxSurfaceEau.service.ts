import { Injectable } from "@nestjs/common";

@Injectable()
export class CalculeMaxSurfaceEauService {

  /*
  Fonction optimale qui retourne la surface maximale
  d'eau stockée pour une liste de hauteurs de bâtiments
  donnée.
  */
  calculeMaxSurfaceEau_Optimazed(listHauteur:number[]):number{
    let maxsurface=0;

    let gauche = 0;
    let droite = listHauteur.length - 1;

    let maxgauche = listHauteur[gauche];
    let maxdroite = listHauteur[droite];

    // Parcourir la liste des hauteurs
    while (gauche < droite) {
      // Si la hauteur à gauche est plus petite que celle à droite
      if (maxgauche < maxdroite) {
        // Avancer vers la gauche
        gauche++;
        // Mettre à jour la hauteur maximale à gauche
        maxgauche = Math.max(maxgauche, listHauteur[gauche]);
        // Calculer la surface d'eau ajoutée du côté gauche
        maxsurface += maxgauche - listHauteur[gauche]
      } else {
        // Si la hauteur maximale à droit est  inférieure ou egale à celle à gauche
        // Reculer vers la droite
        droite--;
        // Mettre à jour la hauteur maximale à droite
        maxdroite = Math.max(maxdroite, listHauteur[droite]);
        // Calculer la surface d'eau ajoutée du côté droit
        maxsurface += maxdroite - listHauteur[droite];
      }
    }
    return maxsurface;
  }

  /*
  Fonction non optimale qui retourne la surface maximale
  d'eau stockée pour une liste de hauteurs de bâtiments
  donnée.
  */
  calculeMaxSurfaceEau(listHauteur:number[]):number{
    let maxsurface=0;
    let ajoutPcd = 0;

    // Parcourir la liste des hauteurs
    for (let i = 1; i < listHauteur.length - 1; i++) {
      let droite = listHauteur[i];
      let gauche = listHauteur[i];
      let j = i + 1;

      // Vérifier si la hauteur actuelle est différente de celle précédente
      if (listHauteur[i] !== listHauteur[i - 1]) {
        // Trouver la hauteur maximale à droite
        while (j < listHauteur.length) {
          droite = Math.max(droite, listHauteur[j] );
          j++;
        }
        j = i - 1;
        // Trouver la hauteur maximale à gauche
        while (j >= 0) {
          gauche = Math.max(gauche, listHauteur[j]);
          j--;
        }

        // Calculer la surface d'eau ajoutée
        const add = Math.min(droite, gauche) - listHauteur[i];
        maxsurface += Math.max(0, add);
        ajoutPcd = add;
      } else {
        // Si la hauteur actuelle est égale à la hauteur précédente, ajouter la surface précédemment calculée
        maxsurface += ajoutPcd;
      }
    }
    return maxsurface;
  }

}