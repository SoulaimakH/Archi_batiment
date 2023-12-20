import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Batiment } from "./batiment.schema";


@Injectable()
export class BatimentService {
  constructor(
    @InjectModel(Batiment.name)
    private BatimentModel: mongoose.Model<Batiment>,
  ) {}

  async findAll(): Promise<Batiment[]> {
    return this.BatimentModel.find();
  }

  async create(Batiment: Batiment): Promise<Batiment> {
    return await this.BatimentModel.create(Batiment);
  }

  async findById(id: string): Promise<Batiment> {
    const Batiment = await this.BatimentModel.findById(id);

    if (!Batiment) {
      throw new NotFoundException('Batiment not found.');
    }

    return Batiment;
  }

  async updateById(id: string, book: Batiment): Promise<Batiment> {
    return this.BatimentModel.findByIdAndUpdate(id, Batiment, {
      new: true,
      runValidators: true,
    });
  }


}