import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class listBatiment {
  @Prop()
  num: number;

  @Prop()
  listHauteur: number[];

  @Prop()
  maxsurfaceEau: number;


  constructor(listHauteur: number[]) {
    this.listHauteur=listHauteur;
    this.num=parseInt(listHauteur.join(''), 10);
    this.maxsurfaceEau=this.calculeMaxSurfaceEau_Optimazed(listHauteur);
  }

  /*
  Fonction optimale qui retournent la surface maximale
  d'eau stockée pour une liste de hauteurs de bâtiments
  donnée.
  */
  calculeMaxSurfaceEau_Optimazed(listHauteur:number[]):number{
    let maxsurface=0;

    let gauche = 0;
    let droite = listHauteur.length - 1;

    let maxgauche = Number.MIN_VALUE;
    let maxdroite = Number.MIN_VALUE;


    while (gauche < droite) {
      if (maxgauche < maxdroite) {
        gauche++;
        maxgauche = Math.max(maxgauche, listHauteur[gauche]);
        maxsurface += maxgauche - listHauteur[gauche]
      } else {
        droite--;
        maxdroite = Math.max(maxdroite, listHauteur[droite]);
        maxsurface += maxdroite - listHauteur[droite];
      }
    }
    return maxsurface;
  }

  /*
  Fonction non optimale qui retournent la surface maximale
  d'eau stockée pour une liste de hauteurs de bâtiments
  donnée.
  */
  calculeMaxSurfaceEau(listHauteur:number[]):number{
    let maxsurface=0;
    let ajoutPcd = 0;
    for (let i = 1; i < listHauteur.length - 1; i++) {
      let droite = listHauteur[i];
      let gauche = listHauteur[i];
      let j = i + 1;

      if (listHauteur[i] !== listHauteur[i - 1]) {
        while (j < listHauteur.length) {
          droite = Math.max(droite, listHauteur[j] );
          j++;
        }
        j = i - 1;
        while (j >= 0) {
          gauche = Math.max(gauche, listHauteur[j]);
          j--;
        }
        const add = Math.min(droite, gauche) - listHauteur[i];
        maxsurface += Math.max(0, add);
        ajoutPcd = add;
      } else {
        maxsurface += ajoutPcd;
      }
    }
    return maxsurface;
  }

}
export const BatimentSchema = SchemaFactory.createForClass(listBatiment);