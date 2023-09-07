import { TechDoc} from "../models";

import {
  getTechDocs,
  createTechDoc,
  checkTechDocExists
} from "../repositories/techdoc.repository";

export default class TechDocService    {
  public async getTechDocs(): Promise<Array<TechDoc>> {
    return getTechDocs(); 
  }

  public async createTechDoc(body: TechDoc): Promise<TechDoc> {
    return createTechDoc(body);
  }

  public async checkTechDocExists(docnumber: string, title: string, updatedDate: string): Promise<Boolean> {
    return checkTechDocExists(docnumber, title, updatedDate);
  }



}
