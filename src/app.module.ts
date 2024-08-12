import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './jwt-strategy/jwt-strategy.service';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategyModule } from './jwt-strategy/jwt-strategy.module';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), UserModule, AuthModule, JwtStrategyModule, PostsModule, LikesModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
