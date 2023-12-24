import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () =>{

    const navigate = useNavigate();

    const [data, setData] = useState();


    useEffect(()=>{

        isLogedin();
        getdata();
    },[])
  


  
    async function getdata(){
    
      const response = await fetch('/getNotes',{
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
      })
      .then(res=>res.json())
  
      setData(response);
  
      console.log(response);
    }

    async function isLogedin(){
        
        const response = await fetch('/islogedin',{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
          })
          .then(res=>res.json())
          //console.log(response.error);

          if(response.error==='user not authenticated'){
            console.log('kullanıcı giriş yapmamış');
            navigate('/userlogin');
          }

          
    }


    async function logout(event){

        event.preventDefault(); 


        axios.post("/logout").then((res)=>{
            console.log(res);
        })

          navigate('/userlogin');
      
    }
  

    return(
        <div>
            <h1>homepage</h1>
            <button onClick={logout}>logout</button>
        </div>
    )
}


export default HomePage;