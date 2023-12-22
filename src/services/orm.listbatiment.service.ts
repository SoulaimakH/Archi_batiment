import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { listBatiment } from "../entities/batiment.schema";
import { hauteurListdto } from "../dto/hauteurtList.dto";
import { CalculeMaxSurfaceEauService } from "./calculeMaxSurfaceEau.service";
import { listBatimentdto } from "../dto/listBatement.dto";

@Injectable()
export class OrmListbatimentService {

  // Logger pour la gestion des logs dans le service
  private readonly logger = new Logger(OrmListbatimentService.name);

  constructor(
    @InjectModel(listBatiment.name)
    private BatimentModel: mongoose.Model<listBatiment>,
    private readonly calculeMaxSurfaceEauService: CalculeMaxSurfaceEauService
  ) {}

  // Récupérer tous les Listbatiments
  async findAll(): Promise<listBatimentdto[]> {
    try {
      // Utilisation de find() pour récupérer tous les documents
      const result = await this.BatimentModel.find().exec();
      // Mapper chaque document à un DTO
      return result.map((batiment) => this.mapToDto(batiment));
    } catch (error) {
      // Gestion des erreurs avec un message log et une exception
      console.error('Error while retrieving Listbatiments:', error.message);
      this.handleServiceError('retrieving Listbatiments', error);
    }
  }

  // Créer un nouveau Listbatiment
  async create(listHauteur: hauteurListdto): Promise<listBatimentdto> {
    try {
      let num=parseInt(listHauteur.buildingsHeightList.join(''), 10)
      // Vérifier si le document existe
      const batiment = await this.BatimentModel.findOne({ num: num });
      if (!batiment) {

      // Créer un nouvel objet listBatiment à partir de listHauteur
      const listBastement: listBatiment = {
        listHauteur: listHauteur.buildingsHeightList,
        // Calculer la surface d'eau maximale à l'aide du fonction optimale
        maxsurfaceEau: this.calculeMaxSurfaceEauService.calculeMaxSurfaceEau_Optimazed(listHauteur.buildingsHeightList),
        // Générer un numéro en concaténant les hauteurs des bâtiments
        num: num,
      };

        // si le document n'existe pas créer le Listbatiment dans la base de données
        const createdBatiment = await this.BatimentModel.create(listBastement);
        // Mapper le résultat à un DTO
        return this.mapToDto(createdBatiment);
      }
      else{
        // return existent one
        const batimentlist = batiment as listBatiment;
        return this.mapToDto(batimentlist);
      }

    } catch (error) {
      // Gestion des erreurs avec un message log et une exception
      this.handleServiceError('creating Listbatiment', error);
    }
  }


  // Récupérer un Listbatiment par son ID
  async findById(id: string): Promise<listBatimentdto> {
    try {
      // Utilisation de findById pour récupérer un document par son ID
      let batiment = await this.BatimentModel.findById(id);

      // Vérifier si le document existe
      if (!batiment) {
        throw new NotFoundException('Batiment not found.');
      }

      // Mapper le résultat à un DTO
      const batimentlist = batiment as listBatiment;
      return this.mapToDto(batimentlist);
    } catch (error) {
      // Gestion des erreurs avec un message log et une exception
      this.handleServiceError('finding Listbatiment by ID', error);
    }
  }

  // Récupérer un Listbatiment par son numéro
  async findByNum(num: number): Promise<listBatimentdto> {
    try {

      // Utilisation de findOne pour récupérer un document par son numéro
      const batiment = await this.BatimentModel.findOne({ num: num });

      // Vérifier si le document existe
      if (!batiment) {
        throw new NotFoundException('Batiment not found.');
      }
      // Mapper le résultat à un DTO
      const batimentlist = batiment as listBatiment;
      return this.mapToDto(batimentlist);
    } catch (error) {
      // Gestion des erreurs avec un message log et une exception
      this.handleServiceError('finding Listbatiment by num', error);
    }
  }

  // Mettre à jour un Listbatiment par son numéro
  async updateByNum(num: number, listBastement: hauteurListdto): Promise<listBatimentdto> {
    try {
      // Utilisation de findOneAndUpdate pour mettre à jour un document par son numéro
      const updatedBatiment = await this.BatimentModel.findOneAndUpdate(
        { num: num },
        { listHauteur: listBastement.buildingsHeightList,
        num:parseInt(listBastement.buildingsHeightList.join(''), 10),},
        {
          new: true, // Retourner le document modifié plutôt que l'original
          runValidators: true, // Exécuter les validateurs lors de la mise à jour
        }
      );

      // Mapper le résultat à un DTO
      const batimentlist = updatedBatiment as listBatiment;
      return this.mapToDto(batimentlist);
    } catch (error) {
      // Gestion des erreurs avec un message log et une exception
      this.handleServiceError('updating Listbatiment by num', error);
    }
  }

  // Supprimer un Listbatiment par son numéro
  async delete(num: number): Promise<void> {
    try {
      // Utilisation de deleteOne pour supprimer un document par son numéro
      await this.BatimentModel.deleteOne({ num: num });
    } catch (error) {
      // Gestion des erreurs avec un message log et une exception
      this.handleServiceError('deleting Listbatiment by num', error);
    }
  }

  // Fonction de mapping de listBatiment à listBatimentdto
   mapToDto(batiment: listBatiment): listBatimentdto {
    // Implement the logic to map listBatiment to listBatimentdto
    return {
      listHauteur: batiment.listHauteur,
      maxsurfaceEau: batiment.maxsurfaceEau,
      num: batiment.num,
    };
  }

  // Fonction de gestion des erreurs
   handleServiceError(operation: string, error: any): void {
    this.logger.error(`Error while ${operation}: ${error.message}`);
    throw new Error(`An error occurred while ${operation}.`);
  }
}
