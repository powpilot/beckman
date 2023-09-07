import { getConnection, getConnectionOptions, getRepository } from "typeorm";
import { TechDoc } from "../models";



export const getTechDocs = async (): Promise<Array<TechDoc>> => {
  const techdocRepository = getConnection().getRepository(TechDoc);
  return techdocRepository.find();
};

export const createTechDoc = async (payload: TechDoc): Promise<TechDoc> => {
  const techdocsRepository = getRepository(TechDoc);
  const techdoc = new TechDoc();
  return techdocsRepository.save({
    ...techdoc,
    ...payload,
  });
};

export const getTechDocByNumber  = async (docnumber: string): Promise<TechDoc | null> => {
  const techdocsRepository = getRepository(TechDoc);
  const techdoc = await techdocsRepository.findOne({  docnumber: docnumber  });
  return techdoc ? techdoc : null;
};

export const checkTechDocExists   = async (docnumber: string, title: string, updatedDate: string): Promise<Boolean> => {
  const techdocsRepository = getRepository(TechDoc); 
  const techdoc = await techdocsRepository.findOne({  docnumber: docnumber, title: title , lastupdate: updatedDate });
  let exists:Boolean;
  if(techdoc){exists = true}else{exists= false}
  return exists;
};


