import { Test, TestingModule } from '@nestjs/testing';
import { MetricsController } from './metrics.controller';
import { MetricsService } from '../services/metrics.service';

describe('MetricsController', () => {
  let controller: MetricsController;
  let service: MetricsService;

  // Mock del MetricsService
  const mockMetricsService = {
    // Aquí defines los métodos mock necesarios
    findAll: jest.fn(),
    findOne: jest.fn(),
    // otros métodos que utilices en tu controlador
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetricsController],
      providers: [
        {
          provide: MetricsService,
          useValue: mockMetricsService, // Usa el mock aquí
        },
      ],
    }).compile();

    controller = module.get<MetricsController>(MetricsController);
    service = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  // tus otros tests aquí
});
