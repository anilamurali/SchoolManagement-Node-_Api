const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")
const req = require("express/lib/request")
var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS" ); 
    next(); });
var studentModel=Mongoose.model("students",
new Mongoose.Schema(
    {
        admno:String,
        rollno:String,
        name:String,
        standard:String,
        parentname:String,
        mobile:String,
        address:String
    }
))
var facultyMoodel=Mongoose.model("faculties",
new Mongoose.Schema(
    {
        fname:String,
        education:String,
        fmobile:String,
        faddress:String,
        pincode:String,
        district:String,
    }
))
Mongoose.connect("mongodb+srv://mzc:mzc@cluster0.m2f8m.mongodb.net/CollegeDb")
app.post("/api/addstudent",(req,res)=>{
    var getAdmno=req.body.admno
    var getRollno=req.body.rollno
    var getName=req.body.name
    var getStd=req.body.standard
    var getParent=req.body.parentname
    var getMobile=req.body.mobile
    var getAddress=req.body.address
    data={"admno":getAdmno,"rollno":getRollno,"name":getName,"standard":getStd,"parentname":getParent,"mobile":getMobile,"address":getAddress}
    let student=new studentModel(data)
    student.save((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
            res.send({"status":"success","data":data})
        }
    })
    
    
})
app.post("/api/addfaculty",(req,res)=>{
    var getFname=req.body.fname
    var getEducation=req.body.education
    var getFmobile=req.body.fmobile
    var getFaddress=req.body.faddress
    var getPincide=req.body.pincode
    var getDistrict=req.body.district
    data={"fname":getFname,"education":getEducation,"fmobile":getFmobile,"faddress":getFaddress,"pincode":getPincide,"district":getDistrict}
    let faculty=new facultyMoodel(data)
    faculty.save((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
            res.send({"status":"success","data":data})
        }
    })
})
app.get("/api/viewfaculty",(req,res)=>{
    facultyMoodel.find(
        (error,data)=>{
            if(error){
            res.send({"status":"error"})

            }
            else{
                res.send(data)

            }
        }
    )
})
app.get("/api/viewstudent",(req,res)=>{
    studentModel.find(
        (error,data)=>{
            if(error){
            res.send({"status":"error"})

            }
            else{
                res.send(data)

            }
        }
    )
})
app.post("/api/studentsearch",(req,res)=>{
   var getAdmno=req.body
   console.log(getAdmno)
   studentModel.find(getAdmno,(error,data)=>{
       if(error){
           res.send({"status":"error"})
       }
       else{
           res.send(data)
       }
   })
})
app.post("/api/facultysearch",(req,res)=>{
    var getFname=req.body
    console.log(getFname)
    facultyMoodel.find(getFname,(error,data)=>{
        if(error){
            res.send({"status":"error"})
        }
        else{
            res.send(data)
        }
    })
})
app.post("/api/studentdelete",(req,res)=>{
    
    var getId=req.body
    console.log(getId)
    studentModel.findByIdAndDelete(getId,(error,data)=>{
        if(error){
            res.send({"status":"error"})
        }
        else
        {
            res.send({"status":"success"})
        }
    })
})
app.post("/api/facultydelete",(req,res)=>{
    var getId=req.body
    console.log(getId)
    facultyMoodel.findByIdAndDelete(getId,(error,data)=>{
        if(error){
            res.send({"status":"error"})
        }
        else{
            res.send({"status":"success"})
        }
    })

})


app.listen(4500,()=>{
    console.log("server runnig")
})