import { Test } from '@nestjs/testing';
import { AppModule } from '~/app.module';

describe('AppModule', () => {
  it('should compile the AppModule', async () => {
    const module = await Test.createTestingModule({
      providers: [AppModule],
    }).compile();

    expect(module).toBeDefined();
  });
});
