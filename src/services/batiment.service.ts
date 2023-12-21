import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { listBatiment } from "../entities/batiment.schema";
import { hauteurListdto } from "../dto/hauteurtList.dto";

@Injectable()
export class BatimentService {
  constructor(
    @InjectModel(listBatiment.name)
    private BatimentModel: mongoose.Model<listBatiment>,
  ) {}

  async findAll(): Promise<listBatiment[]> {
    return this.BatimentModel.find();
  }

  async create(listHauteur: hauteurListdto): Promise<listBatiment> {
    let listBastement = new listBatiment(listHauteur.buildingsHeightList);
    return await this.BatimentModel.create(listBastement);
  }


  async findById(id: string): Promise<listBatiment> {
    const Batiment = await this.BatimentModel.findById(id);

    if (!Batiment) {
      throw new NotFoundException('Batiment not found.');
    }

    return Batiment;
  }
  async findByNum(num:number): Promise<listBatiment> {
    const Batiment = await this.BatimentModel.findOne({ num: num });

    if (!Batiment) {
      throw new NotFoundException('Batiment not found.');
    }

    return Batiment;
  }


  async updateByNum(num: number, listBastement: hauteurListdto): Promise<listBatiment> {

    return this.BatimentModel.findOneAndUpdate(
      { num: num },
      listBastement,
      {
        new: true, // Return the modified document rather than the original
        runValidators: true, // Run validators on update
      }
    );
  }

  async delete(num:number) {
    return this.BatimentModel.deleteOne({ num: num });
  }



}