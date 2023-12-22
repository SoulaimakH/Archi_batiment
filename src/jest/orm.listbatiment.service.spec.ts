import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { listBatiment } from '../entities/batiment.schema';
import { hauteurListdto } from '../dto/hauteurtList.dto';
import { OrmListbatimentService } from "../services/orm.listbatiment.service";
import { CalculeMaxSurfaceEauService } from "../services/calculeMaxSurfaceEau.service";


// Mocking the mongoose model
const mockModel = {
  find: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
};

describe('OrmListbatimentService', () => {
  let service
  let calculeMaxSurfaceEauService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrmListbatimentService,
        CalculeMaxSurfaceEauService,
        {
          provide: getModelToken(listBatiment.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<OrmListbatimentService>(OrmListbatimentService);
    calculeMaxSurfaceEauService = module.get<CalculeMaxSurfaceEauService>(CalculeMaxSurfaceEauService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test for a limit case
  it('should handle errors when creating Listbatiment with invalid data', async () => {
    // Mocking an error during the creation process
    mockModel.create.mockRejectedValueOnce(new Error('Invalid data'));

    await expect(service.create({ buildingsHeightList: [1, 2, 3] } as hauteurListdto))
      .rejects
      .toThrowError('An error occurred while creating Listbatiment');
    expect(mockModel.create).toHaveBeenCalled();
  });

  //sumple jest
  it('should retrieve Listbatiment by num', async () => {
    const mockBatiment:listBatiment={
      num:123,
      listHauteur:[1,2,3],
      maxsurfaceEau:0
    };
    mockModel.findOne.mockReturnValueOnce(mockBatiment);

    const result = await service.findByNum(123);

    expect(result).toEqual(service.mapToDto(mockBatiment));
    expect(mockModel.findOne).toHaveBeenCalledWith({ num: 123 });
  });

  // Complex tests
  it('should update Listbatiment by num', async () => {
    const mockUpdatedBatiment :listBatiment={
      num:456,
      listHauteur:[4,5,6],
      maxsurfaceEau:0
    };
    mockModel.findOneAndUpdate.mockReturnValueOnce(mockUpdatedBatiment);
    const result = await service.updateByNum(123, { buildingsHeightList: [4, 5, 6] } as hauteurListdto);
    expect(result).toEqual(service.mapToDto(mockUpdatedBatiment));
    expect(mockModel.findOneAndUpdate).toHaveBeenCalledWith(
      { num: 123 },
      { listHauteur: [4, 5, 6] ,num:456},
      { new: true, runValidators: true },
    );
  });

  it('should delete Listbatiment by num', async () => {
    await service.delete(123);
    expect(mockModel.deleteOne).toHaveBeenCalledWith({ num: 123 });
  });
});