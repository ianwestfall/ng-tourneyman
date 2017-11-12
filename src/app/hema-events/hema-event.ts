import { User } from '../common-models/user';

export class HemaEvent {
  id: number;
  name: string;
  description: string;
  start_dt: Date;
  end_dt: Date;
  create_dt: Date;
  status: string;
  created_by: User;

  constructor(values: Object = {}){
    Object.assign(this, values);
    this.start_dt = this.start_dt?
      new Date(this.start_dt): null;
    this.end_dt =
      this.end_dt? new Date(this.end_dt): null;
    this.create_dt = this.create_dt? new Date(this.create_dt): null;
  }
}
