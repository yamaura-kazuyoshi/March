const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {

	const users = await User.find({});

	res.json(users);

});


module.exports = router;
router.use(express.json());
router.post('/', async (req,res)=>{
	const user = new User({
		name: req.body.name,
		age: req.body.age
	});

	const savedUser = await user.save();
	res.json(savedUser);

});
router.get('/:userID', (req, res) => {
  try {
    User.findById(req.params.userID, (err, user) => {
      if (err) res.status(404).json('ユーザは存在しません');
      res.send(user);
    });
  } catch (err) {
    res.status(500).json({
      error: {
        name: err.name,
        message: err.message,
      },
    });
  }
});
router.get('/:userID',(req, res)=>{
	User.findById(req.params.userID,(err,user)=>{
		if (err) console.log('error');
		res.send(user);
	});
});
router.delete('/:userID',async (req,res)=>{
	const user = await User.remove({_id: req.params.userID});
	res.send(user);
});
router.patch('/:userID',async (req,res)=>{
	console.log(req.body.age);
	const user = await User.updateOne({_id: req.params.userID},{$set:{age:req.body.age}});
	res.send(user);
});
/* GET users listing. */
router.get('/register', function (req, res, next) {
	res.render('register');
  });
  
  /* POST users/resister */
  router.post('/register', (req, res) => {
	/*新規登録　エラー処理*/
	const { name, email, password } = req.body;
	console.log({ name, email, password })
	let errors = [];
  
	if (!name || !email || !password) {
	  errors.push({ msg: '入力されていない項目があります。' });
	}
  
	if (password.length < 6) {
	  errors.push({ msg: 'パスワードは6字以上にしてください。' });
	}
  
	if (errors.length > 0) {
	  res.render('register', {
		errors,
		name,
		email,
		password
	  });
	} else {
  
	  User.findOne({ email: email }).then(user => {
		if (user) {
		  errors.push({ msg: 'そのemailは登録できません。' });
		  res.render('register', {
			errors,
			name,
			email,
			password
		  });
		} else {
		  const newUser = new User({
			name,
			email,
			password
		  });
  
		  /*  bcrypt.genSalt(saltRounds, function(err, salt) {
				bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
				   DBへの保存処理
				  });
			  }); */
  
		  bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
			  if (err) throw err;
			  //保存処理
			  newUser.password = hash;
			  newUser
				.save()
				.then(user => {
				  res.send('login');
				})
				.catch(err => console.log(err));
			})
		  })
		}
	  })
  
  
	}
  
  })
  
