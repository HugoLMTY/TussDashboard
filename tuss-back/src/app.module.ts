import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScriapController } from './scriap/scriap.controller';
import { ScriapService } from './scriap/scriap.service';
// import { PieceModule } from './pieces/piece.module';
// import { RiflesModule } from './rifles/rifles.module';
// import { AccessoriesModule } from './accessories/accessories.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/tussdb'),
    // PieceModule,
    // RiflesModule,
    // AccessoriesModule,
  ],
  controllers: [AppController, ScriapController],
  providers: [AppService, ScriapService],
})
export class AppModule {}
