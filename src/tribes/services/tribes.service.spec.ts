import { Test, TestingModule } from '@nestjs/testing';
import { TribesService } from './tribes.service';

describe('TribesService', () => {
  let service: TribesService;

  const mockTribesService = {
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
          provide: TribesService,
          useValue: mockTribesService,
        },
      ],
    }).compile();

    service = module.get<TribesService>(TribesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findAll', () => {
    service.findAll();
    expect(mockTribesService.findAll).toHaveBeenCalled();
  });

  it('should call findOne', () => {
    service.findOne(1);
    expect(mockTribesService.findOne).toHaveBeenCalled();
  });

  it('should call create', () => {
    service.create({
      id_tribe: 1,
      id_organization: 1,
      name: 'test',
      repositories: [],
      status: 1,
    });
    expect(mockTribesService.create).toHaveBeenCalled();
  });

  it('should call update', () => {
    service.update({
      id: 1,
      tribe: {
        id_tribe: 1,
        id_organization: 1,
        name: 'test',
        repositories: [],
        status: 1,
      },
    });
    expect(mockTribesService.update).toHaveBeenCalled();
  });

  it('should call remove', () => {
    service.remove(1);
    expect(mockTribesService.remove).toHaveBeenCalled();
  });
});
