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
    this.start_dt = this.fixDate(this.start_dt);
    this.end_dt = this.fixDate(this.end_dt);
    this.create_dt = this.create_dt? new Date(this.create_dt): null;
  }

  fixDate(dateString: any): Date{
    if(dateString){
      let fixedDate = new Date(dateString);
      fixedDate = new Date(fixedDate.getTime() + Math.abs(fixedDate.getTimezoneOffset()*60000));
      return fixedDate;
    }
    return null;
  }
}
