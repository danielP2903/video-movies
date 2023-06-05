export interface IMessages {
  message:string,
  type:TypeMessage;
}
type TypeMessage = 'SUCCESFULL' | 'ERROR'
