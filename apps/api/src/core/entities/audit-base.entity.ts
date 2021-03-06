import { UpdateDateColumn, CreateDateColumn, ManyToOne, VersionColumn, ObjectIdColumn, ObjectID } from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import toHexString from './toHexString';
import {ApiModelProperty} from '@xmlking/swagger';
// FIXME: we need to import User like this to avoid Circular denpendence problem
import {User} from '../../auth/user.entity';

// TODO: Implement Soft Delete

export abstract class AuditBase {

  @ApiModelProperty()
  @Transform(toHexString, {toPlainOnly: true})
  @ObjectIdColumn() id: ObjectID;

  // @Exclude()
  @CreateDateColumn()
  createdAt?: Date;

  // @Exclude()
  @UpdateDateColumn()
  updatedAt?: Date;

  // @Exclude()
  @ManyToOne(type => User, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  createdBy: User;

  // @Exclude()
  @ManyToOne(type => User, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  updatedBy: User;

  @Exclude()
  @VersionColumn()
  version?: number;
}
