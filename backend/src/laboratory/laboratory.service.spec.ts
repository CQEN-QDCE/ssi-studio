import { Test, TestingModule } from '@nestjs/testing';
import { LaboratoryService } from './laboratory.service';

describe('LaboratoryService', () => {
  let service: LaboratoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LaboratoryService],
    }).compile();

    service = module.get<LaboratoryService>(LaboratoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
