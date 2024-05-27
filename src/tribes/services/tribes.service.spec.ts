import { Test, TestingModule } from '@nestjs/testing';
import { TribesService } from './tribes.service';

describe('TribesService', () => {
  let service: TribesService;

  const mockTribesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
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
});
