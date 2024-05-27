import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesController } from './repositories.controller';
import { RepositoriesService } from '../services/repositories.service';
import { MetricsService } from '../services/metrics.service';

describe('RepositoriesController', () => {
  let controller: RepositoriesController;
  let service: RepositoriesService;
  let metricService: MetricsService;

  // Mock del RepositoriesService
  const mockRepositoriesService = {
    // Aquí defines los métodos mock necesarios
    findAll: jest.fn(),
    findOne: jest.fn(),
    // otros métodos que utilices en tu controlador
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepositoriesController],
      providers: [
        {
          provide: RepositoriesService,
          useValue: mockRepositoriesService, // Usa el mock aquí
        },
        {
          provide: MetricsService,
          useValue: mockRepositoriesService, // Usa el mock aquí
        },
      ],
    }).compile();

    controller = module.get<RepositoriesController>(RepositoriesController);
    service = module.get<RepositoriesService>(RepositoriesService);
    metricService = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should be defined metric', () => {
    expect(controller).toBeDefined();
    expect(metricService).toBeDefined();
  });
});
