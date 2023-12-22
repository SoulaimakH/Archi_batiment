import { Test, TestingModule } from '@nestjs/testing';
import { ListBatimentController } from "../controller/listBatiment.controller";
import { OrmListbatimentService } from "../services/orm.listbatiment.service";
import { listBatimentdto } from "../dto/listBatement.dto";
import { hauteurListdto } from "../dto/hauteurtList.dto";
import { HttpException } from "@nestjs/common";



describe('ListBatimentController', () => {
  let controller
  let service

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListBatimentController],
      providers: [
        {
          provide: OrmListbatimentService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            findByNum: jest.fn(),
            delete: jest.fn(),
            updateByNum: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ListBatimentController>(ListBatimentController);
    service = module.get<OrmListbatimentService>(OrmListbatimentService);
  });

  describe('getAllListBatiments', () => {
    it('should return a list of ListBatiments', async () => {
      const mockListBatiments: listBatimentdto[] = [{

          "listHauteur": [2, 1, 2, 1, 2],
          "maxsurfaceEau": 2,
          "num": 21212

      }];
      service.findAll=jest.fn().mockResolvedValue(mockListBatiments)

      const result = await controller.getAllListBatiments();

      expect(result).toEqual(mockListBatiments);
    });

    it('should handle errors and return 500 status code', async () => {
      service.findAll=jest.fn().mockRejectedValueOnce(new Error('Test error'));
      await expect(controller.getAllListBatiments()).rejects.toThrowError('An error occurred while retrieving ListBatiments.');
    });
  });


  describe('createListBatiments', () => {
    it('should create a new ListBatiment and return it', async () => {
      const mockListHeight: hauteurListdto = {"buildingsHeightList":[2, 1, 2, 1, 2]};
      const mockCreatedBatiment: listBatimentdto = {
        "listHauteur": [2, 1, 2, 1, 2],
        "maxsurfaceEau": 2,
        "num": 21212
      };
      service.create = jest.fn().mockResolvedValueOnce(mockCreatedBatiment);
      const result = await controller.createListBatiments(mockListHeight);
      expect(result).toEqual(mockCreatedBatiment);
    });

    it('should handle errors and return 500 status code', async () => {
      const mockListHeight: hauteurListdto = {"buildingsHeightList":[2, 1, 2, 1, 2]};
      service.create = jest.fn().mockRejectedValueOnce(new Error('Test error'));
      await expect(controller.createListBatiments(mockListHeight)).rejects.toThrowError(HttpException);
    });

    it('should handle errors and return 400 status code', async () => {
      const mockListHeight: hauteurListdto = {"buildingsHeightList":[2, 1, 2, 1, 2]};
      service.create = jest.fn().mockRejectedValueOnce(new Error('Test error'));
      await expect(controller.createListBatiments(mockListHeight)).rejects.toThrowError(HttpException);
    });

  });

  describe('getListBatiments', () => {
    it('should return a ListBatiment by ID', async () => {
      const mockId = 'mock-id';
      const mockListBatiment: listBatimentdto = {
        "listHauteur": [2, 1, 2, 1, 2],
        "maxsurfaceEau": 2,
        "num": 21212
      };
      service.findById = jest.fn().mockResolvedValueOnce(mockListBatiment);
      const result = await controller.getListBatiments(mockId);

      expect(result).toEqual(mockListBatiment);
    });

    it('should handle errors and return 500 status code', async () => {
      // Mock the service method to throw an error
      service.findById = jest.fn().mockRejectedValueOnce(new Error('Test error'));
      // Call the controller method and expect it to throw an HttpException
      await expect(controller.getListBatiments('mock-id')).rejects.toThrowError(HttpException);
    });
  });

  describe('getListBatimentsByNum', () => {
    it('should return a ListBatiment by num', async () => {
      const mockNum = 123;
      const mockListBatiment: listBatimentdto = {
        "listHauteur": [2, 1, 2, 1, 2],
        "maxsurfaceEau": 2,
        "num": 21212
      };
      service.findByNum = jest.fn().mockResolvedValueOnce(mockListBatiment);
      const result = await controller.getListBatimentsByNum(mockNum);

      expect(result).toEqual(mockListBatiment);
    });

  });

  describe('deleteListBatiments', () => {
    it('should delete a ListBatiment by num', async () => {
      const mockNum = 123;
      const result = await controller.deleteListBatiments(mockNum);

      expect(result).toBeUndefined();
    });

    it('should handle errors and return 500 status code', async () => {
      const mockNum = 123;
      service.delete = jest.fn().mockRejectedValueOnce(new Error('Test error'));
      await expect(controller.deleteListBatiments(mockNum)).rejects.toThrowError(HttpException);
    });

  });

  describe('updateListBatiments', () => {
    it('should update a ListBatiment by num', async () => {
      const mockNum = 123;
      const mockNewDto: hauteurListdto = {"buildingsHeightList":[2, 1, 2, 1, 2]};
      const mockUpdatedBatiment: listBatimentdto = {"listHauteur": [2, 1, 2, 1, 2],
        "maxsurfaceEau": 2,
        "num": 21212};
      service.updateByNum = jest.fn().mockResolvedValueOnce(mockUpdatedBatiment);
      const result = await controller.updateListBatiments(mockNum, mockNewDto);

      expect(result).toEqual(mockUpdatedBatiment);
    });

    it('should handle errors and return 500 status code', async () => {
      const mockNum = 123;
      service.updateByNum = jest.fn().mockRejectedValueOnce(new Error('Test error'));
      const mockNewDto: hauteurListdto = {"buildingsHeightList":[2, 1, 2, 1, 2]};

      await expect(controller.updateListBatiments(mockNum, mockNewDto)).rejects.toThrowError(HttpException);
    });

    it('should return 404 status code if ListBatiment not found', async () => {
      const mockNum = 456;
      service.updateByNum = jest.fn().mockRejectedValueOnce(new Error('ListBatiment not found'));
      const mockNewDto: hauteurListdto = {"buildingsHeightList":[2, 1, 2, 1, 2]};
      await expect(controller.updateListBatiments(mockNum, mockNewDto)).rejects.toThrowError(HttpException);
    });
  });

});
