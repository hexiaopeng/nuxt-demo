import {
  Router
} from 'express';
import UserModel from '../model/user'
const router = Router()

router.get('/login', (req, res) => {
  //   console.log('req', req);

  const user = new UserModel({
    username: '小明',
    sex: 'MAN'
  })
  //   user.save().then((ret) => {
  //       console.log('ret', ret);
  //   })
  user.save().then(ret => {
    console.log('ret', ret);
    
  }).catch(err => {
    console.log('err', err);
    res.send(err)
    
  })
})

export default router
