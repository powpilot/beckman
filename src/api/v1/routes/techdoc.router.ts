import { Router, Request, Response } from "express";
import TechDocService from "../services/techdocs.service";

const router = Router();

export default (app: Router) => {
  app.use("/techdocs", router);

  router.get("", async (req: Request, res: Response) => {
    const service = new TechDocService();
    const response = await service.getTechDocs();
    return res.send(response);
  });

  router.post("/create", async (req: Request, res: Response) => {
    const service = new TechDocService();
    const response = await service.createTechDoc(req.body);
    return res.send(response);
  });


  router.post("/load", async (req: Request, res: Response) => {
    const service = new TechDocService();
    let data = ''
    const options: any = {
      headers: {
        'content-type': 'application/json;charset=utf-8',
        'cookie': 'foundation.globalization.language=ru; foundation.globalization.country=RU; wsrcookie=en_RU; bec_enabled=true; _mkto_trk=id:213-HFT-078&token:_mch-beckmancoulter.com-1692797653719-34777; SC_ANALYTICS_GLOBAL_COOKIE=fe98fceeefa64325834a66d1ce0dd60b|True; cookieconsent_status=dismiss; website#lang=ru; ASP.NET_SessionId=ls1lk1kuwvdfz0t2bjm1wgpr; JSESSIONID=1JypkxpQBW7cxJfH3ydpwHKhhBl9QQPzpJcwhRHxHB2sFWJM1gFP!1760111419!1510845621; QSI_HistorySession=https%3A%2F%2Fwww.beckmancoulter.com%2Fru%2Fsearch%3Fquery%3D*%26index%3D0%26size%3D25%26languages%3DEnglish%26type%3Dtech-docs~1693572691574; TempCookie=state=oidc_state_c67efdabe3cf4f02aa5368b979e43f68&nonce=9611a416afbd471d939e0905af36c161; AWSALB=WYjZieA7VMv2ZsrYFjfoz7qsmb55cMws/kYh5nYWNFB5DBYlgrcAUswyZarB9mKDZd4LYN44Uc8VwU8rrubvx+Dtij2ZCnsSTr+OYSH/8AG9n+q5RLzvn+QMHMut; AWSALBCORS=WYjZieA7VMv2ZsrYFjfoz7qsmb55cMws/kYh5nYWNFB5DBYlgrcAUswyZarB9mKDZd4LYN44Uc8VwU8rrubvx+Dtij2ZCnsSTr+OYSH/8AG9n+q5RLzvn+QMHMut'
      }
    }

    fetch('https://www.beckmancoulter.com/api/bec/search/document?query=*&index=0&size=999', options)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        data = myJson
        let parseddata = JSON.parse(JSON.stringify(myJson))
        Object.values(parseddata.results).forEach((e: any) => {
          let parseddoc = JSON.parse(JSON.stringify(e))
          let newdoc: any = { title: parseddoc.title, docnumber: parseddoc.documentNumber, lastupdate: parseddoc.updatedDate }
          const result = service.createTechDoc(newdoc);
          console.log(JSON.stringify(newdoc))
        })
      });
    return res.send('ok');
  });



  router.get("/refresh", async (req: Request, res: Response) => {
    const service = new TechDocService();
    let data = ''
    const options: any = {
      headers: {
        'content-type': 'application/json;charset=utf-8',
        'cookie': 'foundation.globalization.language=ru; foundation.globalization.country=RU; wsrcookie=en_RU; bec_enabled=true; _mkto_trk=id:213-HFT-078&token:_mch-beckmancoulter.com-1692797653719-34777; SC_ANALYTICS_GLOBAL_COOKIE=fe98fceeefa64325834a66d1ce0dd60b|True; cookieconsent_status=dismiss; website#lang=ru; ASP.NET_SessionId=ls1lk1kuwvdfz0t2bjm1wgpr; JSESSIONID=1JypkxpQBW7cxJfH3ydpwHKhhBl9QQPzpJcwhRHxHB2sFWJM1gFP!1760111419!1510845621; QSI_HistorySession=https%3A%2F%2Fwww.beckmancoulter.com%2Fru%2Fsearch%3Fquery%3D*%26index%3D0%26size%3D25%26languages%3DEnglish%26type%3Dtech-docs~1693572691574; TempCookie=state=oidc_state_c67efdabe3cf4f02aa5368b979e43f68&nonce=9611a416afbd471d939e0905af36c161; AWSALB=WYjZieA7VMv2ZsrYFjfoz7qsmb55cMws/kYh5nYWNFB5DBYlgrcAUswyZarB9mKDZd4LYN44Uc8VwU8rrubvx+Dtij2ZCnsSTr+OYSH/8AG9n+q5RLzvn+QMHMut; AWSALBCORS=WYjZieA7VMv2ZsrYFjfoz7qsmb55cMws/kYh5nYWNFB5DBYlgrcAUswyZarB9mKDZd4LYN44Uc8VwU8rrubvx+Dtij2ZCnsSTr+OYSH/8AG9n+q5RLzvn+QMHMut'
      }
    }

    let newrecs = await fetch('https://www.beckmancoulter.com/api/bec/search/document?query=*&index=0&size=999', options)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        data = myJson
        let parseddata = JSON.parse(JSON.stringify(myJson))
        let newrecords = Object.values(parseddata.results)
        let arlen = newrecords.length;
        for (let i = 0; i < arlen; i++) {
          let parseddoc = JSON.parse(JSON.stringify(newrecords[i]))
          service.checkTechDocExists(parseddoc.documentNumber, parseddoc.title, parseddoc.updatedDate).then((result: Boolean) => {
            if (result == false) {
              let newdoc: any = { title: parseddoc.title, docnumber: parseddoc.documentNumber, lastupdate: parseddoc.updatedDate }
              const response = service.createTechDoc(newdoc);
              console.log("new record:" + parseddoc.documentNumber + " " + parseddoc.title)
            } else {
              console.log("record already exists:" + parseddoc.documentNumber + " " + parseddoc.title)
            }
          })
        }
      })
    return res.send('ok');

  });


  router.get("/load", async (req: Request, res: Response) => {
    const service = new TechDocService();
    let data = ''
    const options: any = {
      headers: {
        'content-type': 'application/json;charset=utf-8',
        'cookie': 'foundation.globalization.language=ru; foundation.globalization.country=RU; wsrcookie=en_RU; bec_enabled=true; _mkto_trk=id:213-HFT-078&token:_mch-beckmancoulter.com-1692797653719-34777; SC_ANALYTICS_GLOBAL_COOKIE=fe98fceeefa64325834a66d1ce0dd60b|True; cookieconsent_status=dismiss; website#lang=ru; ASP.NET_SessionId=ls1lk1kuwvdfz0t2bjm1wgpr; JSESSIONID=1JypkxpQBW7cxJfH3ydpwHKhhBl9QQPzpJcwhRHxHB2sFWJM1gFP!1760111419!1510845621; QSI_HistorySession=https%3A%2F%2Fwww.beckmancoulter.com%2Fru%2Fsearch%3Fquery%3D*%26index%3D0%26size%3D25%26languages%3DEnglish%26type%3Dtech-docs~1693572691574; TempCookie=state=oidc_state_c67efdabe3cf4f02aa5368b979e43f68&nonce=9611a416afbd471d939e0905af36c161; AWSALB=WYjZieA7VMv2ZsrYFjfoz7qsmb55cMws/kYh5nYWNFB5DBYlgrcAUswyZarB9mKDZd4LYN44Uc8VwU8rrubvx+Dtij2ZCnsSTr+OYSH/8AG9n+q5RLzvn+QMHMut; AWSALBCORS=WYjZieA7VMv2ZsrYFjfoz7qsmb55cMws/kYh5nYWNFB5DBYlgrcAUswyZarB9mKDZd4LYN44Uc8VwU8rrubvx+Dtij2ZCnsSTr+OYSH/8AG9n+q5RLzvn+QMHMut'
      }
    }

    fetch('https://www.beckmancoulter.com/api/bec/search/document?query=*&index=0&size=999', options)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        data = myJson
        let parseddata = JSON.parse(JSON.stringify(myJson))
        Object.values(parseddata.results).forEach((e: any) => {
          let parseddoc = JSON.parse(JSON.stringify(e))
          let newdoc: any = { title: parseddoc.title, docnumber: parseddoc.documentNumber, lastupdate: parseddoc.updatedDate }
          const response = service.createTechDoc(newdoc);
          console.log(JSON.stringify(newdoc))
        })
      });
    return res.send('ok');
  });
};

