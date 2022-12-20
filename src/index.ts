
import admin from "firebase-admin";
import path from 'path'
import fs from 'fs'

(async () => {
  try{

    const serviceAccount = require('../firebaseServiceAccount.json')
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount as any) });

    let myPath = path.join(path.join(path.resolve(__dirname), '../'), '/output')

    const uids: string[] = []
    for(let i =0; i < uids.length; i++){

      const uid = uids[i]
      const userData = await admin.auth().getUser(uid)
  
      if(!fs.existsSync(myPath)) fs.mkdirSync(myPath, { recursive: true })
      fs.writeFileSync(path.join(myPath, `/${userData.uid}.json`), JSON.stringify(userData.toJSON()))
  
    }
  }catch(error){
    console.error(error)
    process.exit(1)
  }
})()
