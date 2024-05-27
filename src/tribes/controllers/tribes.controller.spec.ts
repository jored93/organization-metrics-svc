import { Test, TestingModule } from '@nestjs/testing';
import { TribesController } from './tribes.controller';
import { TribesService } from '../services/tribes.service';

describe('TribesController', () => {
  let controller: TribesController;
  let service: TribesService;

  // Mock del TribesService
  const mockTribesService = {
    // Aquí defines los métodos mock necesarios
    findAll: jest.fn(),
    findOne: jest.fn(),
    // otros métodos que utilices en tu controlador
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TribesController],
      providers: [
        {
          provide: TribesService,
          useValue: mockTribesService, // Usa el mock aquí
        },
      ],
    }).compile();

    controller = module.get<TribesController>(TribesController);
    service = module.get<TribesService>(TribesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  // tus otros tests aquí
});
