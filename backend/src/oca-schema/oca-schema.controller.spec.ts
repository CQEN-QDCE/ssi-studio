import { Test, TestingModule } from '@nestjs/testing';
import { OcaSchemaController } from './oca-schema.controller';

describe('OcaSchemaController', () => {
  let controller: OcaSchemaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OcaSchemaController],
    }).compile();

    controller = module.get<OcaSchemaController>(OcaSchemaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
