import {Router} from 'express';
import {getFirestore} from 'firebase-admin/firestore';
const router=Router();

router.route('/').get(async (req,res)=>{
    const firestore=getFirestore();
    const snapshot=await firestore.collection('usuarios').get();
    const usuarios=[];
    snapshot.forEach(doc=>{
        usuarios.push(doc.data());
    });
    res.json(usuarios);
});

export default router;