export class User {
  first_name: string;
  last_name: string;
  email: string;

  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}