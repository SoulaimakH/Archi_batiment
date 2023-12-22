import { CalculeMaxSurfaceEauService } from "../services/calculeMaxSurfaceEau.service";
import { Test, TestingModule } from "@nestjs/testing";


describe('CalculeMaxSurfaceEauService', () => {
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculeMaxSurfaceEauService],
    }).compile();

    service = module.get<CalculeMaxSurfaceEauService>(CalculeMaxSurfaceEauService);
  });

 //boundary tests
  it('should handle an empty list and return 0', () => {
    const result = service.calculeMaxSurfaceEau_Optimazed([]);
    expect(result).toBe(0);
  });
  it('should handle an empty list and return 0', () => {
    const result = service.calculeMaxSurfaceEau([]);
    expect(result).toBe(0);
  });

  it('should handle a list with a single element and return 0', () => {
    const result = service.calculeMaxSurfaceEau_Optimazed([5]);
    expect(result).toBe(0);
  });
  it('should handle a list with a single element and return 0', () => {
    const result = service.calculeMaxSurfaceEau([5]);
    expect(result).toBe(0);
  });


  // simple tests
  it('should handle a list with all heights as 0 and return 0', () => {
    const result = service.calculeMaxSurfaceEau_Optimazed([0, 0, 0, 0]);
    expect(result).toBe(0);
  });
  it('should handle a list with all heights as 0 and return 0', () => {
    const result = service.calculeMaxSurfaceEau([0, 0, 0, 0]);
    expect(result).toBe(0);
  });

  it('should handle a simple scenario with decreasing heights', () => {
    const result = service.calculeMaxSurfaceEau_Optimazed([5, 4, 3, 2, 1]);
    expect(result).toBe(0);
  });
  it('should handle a simple scenario with decreasing heights', () => {
    const result = service.calculeMaxSurfaceEau([5, 4, 3, 2, 1]);
    expect(result).toBe(0);
  });

  it('should handle a simple scenario with increasing heights', () => {
    const result = service.calculeMaxSurfaceEau_Optimazed([1, 2, 3, 4, 5]);
    expect(result).toBe(0);
  });
  it('should handle a simple scenario with increasing heights', () => {
    const result = service.calculeMaxSurfaceEau([1, 2, 3, 4, 5]);
    expect(result).toBe(0);
  });

  it('should handle a simple scenario with increasing heights', () => {
    const result = service.calculeMaxSurfaceEau_Optimazed([1, 2, 1, 4, 5]);
    expect(result).toBe(1);
  });
  it('should handle a simple scenario with increasing heights', () => {
    const result = service.calculeMaxSurfaceEau([1, 2, 1, 4, 5]);
    expect(result).toBe(1);
  });


  // Additional complex tests
  it('should handle a complex scenario with alternating heights', () => {
    const result = service.calculeMaxSurfaceEau_Optimazed([2, 1, 2, 1, 2]);
    expect(result).toBe(2);
  });
  it('should handle a complex scenario with alternating heights', () => {
    const result = service.calculeMaxSurfaceEau([2, 1, 2, 1, 2]);
    expect(result).toBe(2);
  });

  it('should calculate the max surface for a given list of heights (example)', () => {
    const result = service.calculeMaxSurfaceEau_Optimazed([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
    // Adjust the expected result based on your specific calculation
    expect(result).toBe(6);
  });
  it('should calculate the max surface for a given list of heights (example)', () => {
    const result = service.calculeMaxSurfaceEau([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
    // Adjust the expected result based on your specific calculation
    expect(result).toBe(6);
  });


  it('should handle a complex scenario with repeating heights', () => {
    const result = service.calculeMaxSurfaceEau_Optimazed([1, 2, 3, 2, 1, 2, 3]);
    expect(result).toBe(4);
  });
  it('should handle a complex scenario with repeating heights', () => {
    const result = service.calculeMaxSurfaceEau([1, 2, 3, 2, 1, 2, 3]);
    expect(result).toBe(4);
  });

});
