import {Router} from 'express';
import {getFirestore} from 'firebase-admin/firestore';
const router=Router();

router.route('/').get(async (req,res)=>{
    const firestore=getFirestore();
    const snapshot=await firestore.collection('estadisticas').get();
    let data={promedio:0,desviacion:0};
    snapshot.forEach(doc=>{
        var { sumXi, sumXi2, contador } = doc.data();
        data.promedio=sumXi/contador;
        data.desviacion=Math.sqrt((sumXi2-2*(sumXi*sumXi/contador)+(sumXi/contador)*(sumXi/contador)*contador)/(contador-1));
        if (isNaN(data.desviacion)) {
            data.desviacion=0;
        }
    });
    res.json(data);
});

export default router;