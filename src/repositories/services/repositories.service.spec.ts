import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesService } from './repositories.service';

describe('RepositoriesService', () => {
  let service: RepositoriesService;

  const mockRepositoriesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findRepositoriesByTribe: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RepositoriesService,
          useValue: mockRepositoriesService,
        },
      ],
    }).compile();

    service = module.get<RepositoriesService>(RepositoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findAll', () => {
    service.findAll();
    expect(mockRepositoriesService.findAll).toHaveBeenCalled();
  });

  it('should call findOne', () => {
    service.findOne(1);
    expect(mockRepositoriesService.findOne).toHaveBeenCalled();
  });

  it('should call remove', () => {
    service.remove(1);
    expect(mockRepositoriesService.remove).toHaveBeenCalled();
  });
});
