import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { listBatiment } from '../entities/batiment.schema';
import { hauteurListdto } from '../dto/hauteurtList.dto';
import { NotFoundException } from '@nestjs/common';
import { BatimentService } from "../services/batiment.service";

// Mocking the Mongoose Model
const mockModel = {
  find: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
};

describe('BatimentService', () => {
  let service

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BatimentService,
        {
          provide: getModelToken(listBatiment.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<BatimentService>(BatimentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new Batiment', async () => {
      const mockHauteurListDto: hauteurListdto = {
        buildingsHeightList: [1, 2, 3],
      };
      mockModel.create.mockReturnValueOnce(mockHauteurListDto);

      const result = await service.create(mockHauteurListDto);
      expect(result).toEqual(mockHauteurListDto);
    });
  });

  describe('findById', () => {
    it('should find a Batiment by ID', async () => {
      const mockId = 'mock-id';
      const mockBatiment: hauteurListdto = {
        buildingsHeightList: [1, 2, 3],
      };

      mockModel.findById.mockReturnValueOnce(mockBatiment);

      const result = await service.findById(mockId);

      expect(result).toEqual(mockBatiment);
      expect(mockModel.findById).toHaveBeenCalledWith(mockId);
    });

    it('should throw NotFoundException if Batiment not found by ID', async () => {
      const mockId = 'nonexistent-id';

      mockModel.findById.mockReturnValueOnce(null);

      await expect(service.findById(mockId)).rejects.toThrowError(
        NotFoundException,
      );
      expect(mockModel.findById).toHaveBeenCalledWith(mockId);
    });
  });

  describe('findByNum', () => {
    it('should find a Batiment by Num', async () => {
      const mockNum = 42;
      const mockBatiment: hauteurListdto = {
        buildingsHeightList: [1, 2, 3],
      };

      mockModel.findOne.mockReturnValueOnce(mockBatiment);

      const result = await service.findByNum(mockNum);

      expect(result).toEqual(mockBatiment);
      expect(mockModel.findOne).toHaveBeenCalledWith({ num: mockNum });
    });

    it('should throw NotFoundException if Batiment not found by Num', async () => {
      const mockNum = 99;

      mockModel.findOne.mockReturnValueOnce(null);

      await expect(service.findByNum(mockNum)).rejects.toThrowError(
        NotFoundException,
      );
      expect(mockModel.findOne).toHaveBeenCalledWith({ num: mockNum });
    });
  });

  describe('updateByNum', () => {
    it('should update a Batiment by Num', async () => {
      const mockNum = 42;
      const mockHauteurListDto: hauteurListdto = {
        buildingsHeightList: [4, 5, 6],
      };
      const mockUpdatedBatiment: hauteurListdto = {
        buildingsHeightList: [4, 5, 6],
      };

      mockModel.findOneAndUpdate.mockReturnValueOnce(mockUpdatedBatiment);

      const result = await service.updateByNum(mockNum, mockHauteurListDto);

      expect(result).toEqual(mockUpdatedBatiment);
      expect(mockModel.findOneAndUpdate).toHaveBeenCalledWith(
        { num: mockNum },
        mockHauteurListDto,
        { new: true, runValidators: true },
      );
    });
  });

  describe('delete', () => {
    it('should delete a Batiment by Num', async () => {
      const mockNum = 42;

      const result = await service.delete(mockNum);

      expect(result).toBeUndefined();
      expect(mockModel.deleteOne).toHaveBeenCalledWith({ num: mockNum });
    });
  });
});
