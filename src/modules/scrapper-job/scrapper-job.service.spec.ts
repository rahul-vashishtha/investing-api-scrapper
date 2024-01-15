import { Test, TestingModule } from '@nestjs/testing';
import { ScrapperJobService } from './scrapper-job.service';

describe('ScrapperJobService', () => {
  let service: ScrapperJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrapperJobService],
    }).compile();

    service = module.get<ScrapperJobService>(ScrapperJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
