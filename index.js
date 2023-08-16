const express = require('express')
const path = require('path')
const session = require('express-session')
const fs = require('fs')
const ejs = require('ejs')
//const routh = express.Router()
const app =express();
const product_routh = express.Router();
//Database
const products=[];
const toysDB=new Object();
const admindata =[{id:'122225322532',name:'พิศิษฐ์ วงษ์ใหญ่',nicname:'PEX',age:34,username:'pexlab',session_id:'',address:'บริษัท สมศรี ซุปเปอร์ สโตร์ จำกัด',pic:'./pic/admin_pic/IMG_25620716_083731.jpg'},
{id:'25112532',name:"ปิญาพร วงษ์ใหญ่",nicname:'AUM',username:'aum',age:33,session_id:'',address:'ร้านสมศรี2',pic:'./pic/admin_pic/aum.jpg'}];
//setting app
const login_admin=[]
const addminkey=['122225322532','25112532']
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./views');

//use http requset body encode
app.use(express.urlencoded({extended:false}));
//session
app.use(session({
	secret:'Somsri',
	resave:true,
	saveUninitialized:true,
	cookie:{maxAge:1000*60*60*24}
})) ;
//Routh and Middlewave
app.get('/home',(req,res,next)=>{
	if(req.session.username!=undefined){
		user = req.session
		res.render('home.ejs',{customer:{name:user.name,username:user.username,address:user.address,time_in:user.in_timestr}});
	}else{
		res.render('home',{})
	}
});
app.get('/logout',(req,res,next)=>{
	res.sendFile(path.join(__dirname,'/public/logout.html'));
});
app.get('/logout/confirmed',(req,res,next)=>{
		req.session.destroy();
		res.redirect('/home');
});
app.get('/adminHome',(req,res,next)=>{
	if (addminkey.indexOf(req.session.userid)!=-1){
		admin= admindata.find((val,index,arr)=>{return (val.id==req.session.userid)?true:false;});
		res.render('adminHome.ejs',{admin:admin,login:req.session.admin});
	}else{
		res.redirect('*')
	}
});
app.get('/login',(req,res,next)=>{
	console.log(req.sessionID)
	if(login_admin.includes(req.sessionID)==false){
		login_admin.push(req.sessionID)
	}else{
		
	}
	console.log(login_admin)
	if(req.session.username&&req.session.password){
		let showinfo='';
		if(addminkey.indexOf(req.session.userid)==-1){
			
			showinfo=`<h2>เข้าสู่ระบบแล้ว</h2><br>
			<h3>usename: ${req.session.username}</h3><br>
			<h3>ชื่อผู้ใช้งาน: ${req.session.name}</h3><br> 
			<h3>Session ID: ${req.sessionID}</h3><br>
			<h3>เวลาลงชื่อเข้าใช้งาน: ${req.session.in_timestr}</h3><br><hr>
			<h3><a href="/home">กลับสู่หน้าหลัก</a></h3>`
			
		}else{
			
			showinfo='<h2>ยินดีต้อนรับ คุณ: '+req.session.name+'<br> \
			<a href="/adminHome" style="color:blue;"> เข้าสู่โต๊ะทำงาน </a><br>\
			<a href="/home" style="color:green;"> กลับหน้าหลัก </a><br>\
			<a href="/logout" style="color:red;"> Logout ลงชื่อออก </a></h2><hr>'
			if(req.session.admin==undefined){
				req.session.admin =new Array();
			}
			req.session.admin.push(req.session.userid);
			console.log(req.session.admin)
		}
		
		res.send(showinfo);
		
	}else{
		res.redirect('/login.html');
	}
});
app.post('/login',(req,res,next)=>{
	let username = req.body.username;
	let password = req.body.password;
	let user = admindata.find((value,index,arr)=>{return ((value['username']==username)&&(value.id==password)?true:false)});
	if(user!=null){
		let date = new Date()
		req.session.username = req.body.username;
		req.session.password = req.body.password;
		req.session.userid = user.id;
		req.session.name = user.name;
		req.session.in_timestr =`${date.getHours()}:${date.getMinutes()}${date.getSeconds()}`
		res.render('home.ejs',{customer:{name:user.name,username:user.username,address:user.address,time_in:req.session.in_timestr}});
	}else{
		req.session.destroy()
		res.send('<h2>ไม่พบผู้ใช้งานรายนี้<br><a href="/login">กลับหน้าเข้าสู่ระบบ</a><br><a href="/home">กลับหน้าหลัก</h2><hr>');
	}
});
product_routh.get('/toyspack',function(req,res,next){
	res.render('products.ejs',{datas:products.toyspack})
});
product_routh.get('/toys',(req,res,next)=>{
	res.render('products.ejs',{data:products.toys})
});
product_routh.get('/',(req,res,next)=>{
	res.render('products.ejs',{data:products.all})
});
product_routh.get('/scool',(req,res,next)=>{
	res.render('products.ejs',{data:products.school})
});
product_routh.get('/maid',(ewq,res,next)=>{
	res.render('products.ejs',{data:products.maid})
});
product_routh.get('/tools',(req,res,next)=>{
	res.render('products.ejs',{data:products.tools})
});
app.use('/products',product_routh);

app.use('*',(req,res,next)=>{
	res.status(404);

	res.send('<h2>ไม่พบหน้าทีค้นหา <br><a href="/home" style="color:red;">กลับหนาหลัก</a></h2>')
});
//connection app
const PORT = process.env.PORT||3000;
app.listen(PORT,(err)=>{
	if(err==undefined){
		console.log('Server Started: on port: '+PORT+'.Exit please \'CTRL+C\'');
	}else{
		console.log('Error: '+String(err));
	}
	
});