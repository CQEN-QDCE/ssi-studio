import { Test, TestingModule } from '@nestjs/testing';
import { AgentEventController } from './agent-event.controller';

describe('AgentEventController', () => {
  let controller: AgentEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentEventController],
    }).compile();

    controller = module.get<AgentEventController>(AgentEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
