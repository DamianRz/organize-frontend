import IOption from '../types/Option.type';
import IUserStore from '@/types/UserStore';
import { BASE_USERSTORE } from '../types/BaseObjects.types';

export default class OptionActions {
  private userInfo: IUserStore = BASE_USERSTORE;

  constructor(userInfo: IUserStore) {
    this.userInfo = userInfo;
  }

}