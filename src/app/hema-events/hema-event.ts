import { User } from '../common-models/user';

export class HemaEvent {
  id: number;
  name: string;
  description: string;
  event_start_dt: Date;
  event_end_dt: Date;
  create_dt: Date;
  status: string;
  created_by: User;

  constructor(values: Object = {}){
    Object.assign(this, values);
    this.event_start_dt = this.event_start_dt?
      new Date(this.event_start_dt): null;
    this.event_end_dt =
      this.event_end_dt? new Date(this.event_end_dt): null;
    this.create_dt = this.create_dt? new Date(this.create_dt): null; 
  }
}
