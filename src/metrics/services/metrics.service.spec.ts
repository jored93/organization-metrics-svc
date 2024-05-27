import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from './metrics.service';

describe('MetricsService', () => {
  let service: MetricsService;

  const mockMetricsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MetricsService,
          useValue: mockMetricsService,
        },
      ],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should call findAll', () => {
    service.findAll();
    expect(mockMetricsService.findAll).toHaveBeenCalled();
  });

  it('should call findOne', () => {
    service.findOne(1);
    expect(mockMetricsService.findOne).toHaveBeenCalled();
  });

  it('should call remove', () => {
    service.remove(1);
    expect(mockMetricsService.remove).toHaveBeenCalled();
  });
});
