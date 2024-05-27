import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsService } from './organizations.service';

describe('OrganizationsService', () => {
  let service: OrganizationsService;

  const mockOrganizationsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findOneByActiveStatus: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: OrganizationsService,
          useValue: mockOrganizationsService,
        },
      ],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findAll', () => {
    service.findAll();
    expect(mockOrganizationsService.findAll).toHaveBeenCalled();
  });

  it('should call findOne', () => {
    service.findOne(1);
    expect(mockOrganizationsService.findOne).toHaveBeenCalled();
  });

  it('should call findOneByActiveStatus', () => {
    service.findOneByActiveStatus(1);
    expect(mockOrganizationsService.findOneByActiveStatus).toHaveBeenCalled();
  });

  it('should call create', () => {
    service.create({
      id_organization: 1,
      name: 'test',
      tribes: [],
      status: 1,
    });
    expect(mockOrganizationsService.create).toHaveBeenCalled();
  });

  it('should call update', () => {
    service.update({
      id: 1,
      organization: {
        id_organization: 1,
        name: 'test',
        tribes: [],
        status: 1,
      },
    });
    expect(mockOrganizationsService.update).toHaveBeenCalled();
  });

  it('should call remove', () => {
    service.remove(1);
    expect(mockOrganizationsService.remove).toHaveBeenCalled();
  });
});
