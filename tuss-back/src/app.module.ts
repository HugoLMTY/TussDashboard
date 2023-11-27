import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PieceModule } from './piece/piece.module';
import { RiflesModule } from './rifles/rifles.module';
import { AccessoriesModule } from './accessories/accessories.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), PieceModule, RiflesModule, AccessoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}