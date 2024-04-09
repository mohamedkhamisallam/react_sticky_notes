const { log } = require('console');
const fs=require('fs')
const path=require('path')
const filepath=path.join(__dirname,'../../../db.json')
const { v4: uuidv4 } = require('uuid');
const getuser=(req,res)=>{
    
try {
    const{email,password}=req.body
    let fileData=JSON.parse(fs.readFileSync(filepath))
let findUser=fileData.find((ele)=>{
    return ele.email===email&&ele.password==password
})
console.log(findUser);
if(findUser){
    delete findUser.password
    res.json({message:'success',findUser})

}else{
    res.json({message:'NOT USER'})

}
} catch (error) {
    console.log(`error`);
}

}
const getAllNotes=(req,res)=>{
    try {
        
        const{user_id}=req.headers;
        console.log(user_id);
        let fileData=JSON.parse(fs.readFileSync(filepath))
        let findUser=fileData.find((ele)=>{
            return ele.id===user_id
        })
        if(findUser){
            res.json({message:'success',findUser})


        }else{
            res.json({message:"No User"});

        }
        // if(findUser ||findUser.Notes){
            
        //         console.log(`notes`);
        //         res.json({message:'notes'})
    
            
           
        // }else{
        //     res.json({message:"No notes"});

        // }
        
        


    } catch (error) {
        console.log(`error`);
    }

}


const addUser=(req,res)=>{
   try {
    const{first_name,last_name,email,password}=req.body;
    console.log(first_name);

    let fileData=JSON.parse(fs.readFileSync(filepath))
let findUser=fileData.find((ele)=>{
    return ele.email===email
})
if(findUser){
    res.json({message:'SAME EMAIL'})
}
if(!findUser){
    let id=uuidv4(4)
    fileData.push({id,first_name,last_name,email,password,Notes:[]})
    fs.writeFileSync(filepath, JSON.stringify(fileData));
     fileData=JSON.parse(fs.readFileSync(filepath))
     res.json({message:'success',fileData})

}else{
    res.json({mesage:"same email"})
}
res.json({message:"success"})
   } catch (error) {
    console.log(`error`);
}
}


const addNote=(req,res)=>{

try {
    const{title,desc,user_id}=req.body;

    let fileData=JSON.parse(fs.readFileSync(filepath))
    let findUser=fileData.find((ele)=>{
        return ele.id===user_id
    })
    if(findUser){
        let id=uuidv4(4)
        findUser.Notes.push({title,desc,id})
        fs.writeFileSync(filepath, JSON.stringify(fileData));
        fileData=JSON.parse(fs.readFileSync(filepath))
        console.log(fileData);
        res.json({message:'success',findUser})
    }
} catch (error) {
    console.log('error');
}
}

const deleteNote=(req,res)=>{
try {
    const{id,user_id}=req.params
    let fileData=JSON.parse(fs.readFileSync(filepath))
    let findUser=fileData.find((ele)=>{
        return ele.id===user_id
    })
    if(findUser){
        let findNote=findUser.Notes.filter((ele)=>{
            return ele.id!==id
        })
        if(findNote){
            console.log(`loool`,findNote);
            findUser.Notes=findNote
           
           fs.writeFileSync(filepath, JSON.stringify(fileData));
        fileData=JSON.parse(fs.readFileSync(filepath))
        console.log(findUser);
            res.json({message:'success',findUser})

        }
    }
} catch (error) {
    console.log(`error`);
    
}
}
module.exports={getuser,addUser,getAllNotes,addNote,deleteNote}