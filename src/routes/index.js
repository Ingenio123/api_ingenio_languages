const router = require('express').Router();
const userController = require('../controllers/userController')
const  { createOne,updateTeachersData,updateImgProfile,getTeacherId,getCourses,getAllTeachers,addFlagtoTeachers} =  require('../controllers/teachersController')
const  {assignTeacher,createOneCourse,deleteOneCourse,getAllCourses,updateOneCourse} = require('../controllers/coursesController')
const {userValidation,validateUserSignUp, validateUserSignIn} = require('../middlewares/validator')
const  {verifyEmail,verifyAge,verifyToken,verifyIsAdmin} = require('../middlewares/verify');
const { getAll } = require('../controllers/studentController');
const {createOneFlags,assignTeachertoFlag, deleteFlag, getallFlags} = require('../controllers/flagsController')

router.get('/',  (req, res) => {
  res.render('index', {
    logged:false,
    title: 'Welcome Page',
    saludo: "INGENIO",
    subtitle1:"Learn a new ",
    subtitle2:"language today",
    Unregister:true
    // username: req.user.dispalyName
  });
});

router.get('/login',( req,res)=>{
  res.render('login')
})

router.get('/register',(req,res)=>{
  res.render('register')
})


router.get('/calendly', (req,res)=>{
  res.render('calendly')
})

router.get('/teacher', (req,res,next)=>{
  res.render('teacher')
})

router.get('/data/getAllTeachers', getAllTeachers ) //get all teachers

router.get('/data/teacher/:id',getTeacherId) //obtener un solo docente 

router.get('/data/teacher',getCourses) //obtener dato de los cursos que tiene / da  el docente 

router.get('/data/getAllCourses',getAllCourses)

router.get('/data/getAllStudents',getAll) //obtener los datos de los estudiantes

router.get('/data/getAllFlags', getallFlags ) //obtener todos los datos de las banderas  

router.get('/data/me',verifyToken,verifyIsAdmin,(req,res,next)=>{
  return res.status(200).json({msg:"todo  bien ", id: `el id es ${req.userId} `})
})

// ############## POST ############
router.post('/data/userSignUp', [validateUserSignUp ,userValidation, verifyEmail,verifyAge ], userController.registerUser );

router.post('/data/userSignIn', [ validateUserSignIn , userValidation ] ,  userController.signInUser )

router.post('/data/createTeacher', createOne ) //crear un  usuario

router.post('/data/createCourses', createOneCourse ) //crear un curso

router.post('/data/createFlag', createOneFlags ) //crear a Flag



// ########### PUT  ###############
router.put('/data/updateTeacher/:id', updateTeachersData); // ############   UPDATE DATA TEACHER            ###### 
router.put('/data/updateImgProfile/:id',updateImgProfile); // ############   UPDATE PROFILE IMG     ######
router.put('/data/addTeacherCourses/:id', assignTeacher ); //#############   ADD TEACHER A COURSE   ######
router.put('/data/addTeacherFlag/:id',assignTeachertoFlag) //asing teacher to Bandera 
router.put('/data/addFlagToTeachers/:_id', addFlagtoTeachers)



router.delete('/data/deletedFlag/:_id' , deleteFlag)

module.exports = router;
