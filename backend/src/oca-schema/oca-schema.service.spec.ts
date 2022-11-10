import { Test, TestingModule } from '@nestjs/testing';
import { OcaSchemaService } from './oca-schema.service';

describe('OcaSchemaService', () => {
  let service: OcaSchemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OcaSchemaService],
    }).compile();

    service = module.get<OcaSchemaService>(OcaSchemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
