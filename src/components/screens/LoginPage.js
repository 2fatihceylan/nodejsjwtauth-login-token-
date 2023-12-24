import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const LoginPage = () =>{

    const navigate = useNavigate();


    const [name, setName] = useState('');
    const [pass, setPass] = useState('');

    const [isReg, setIsreg] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    function isRegHandler(){
        setIsreg(!isReg);
    }

    function handleEmailChange(event){
        setName(event.target.value);
    }
    function handlePasswordChange(event){
        setPass(event.target.value);
    }

    function handleForgetPass(){

    }












    async function loginhandler(event){
  
      event.preventDefault(); 

      axios.post("/login", {
        name: name,
        password: pass
      })
      .then((response) => {
        
        if(response.status===200){
          //console.log('giriş başarılı');
          navigate('/home');
        }
      }).catch((err)=>{
        console.log(err);

        if(err.response.data.error==='User_does_not_exist'){
          console.log('Kullanıcı kayıtlı değil');
        }
        else if(err.response.data.error==='wrong_password'){
          console.log('Parola yanlış');
        }
      })
        
    }




    function registerhandler(event){
      event.preventDefault(); 

      if(name!==null&&pass!==null){

        axios.post("/register", {
          name: name,
          password: pass
        })
        .then((response) => {
          
          if(response.status===200){
            console.log('kayıt başarılı');
            setIsreg(false);
            setIsSuccess(true);
          }
        }).catch((err)=>{
       
          if(err.response.data.error==='user_already_exist'){
            console.log('bu kullanıcı adında hali hazırda kullanıcı var')
          }

        })
      }

      
      
    }





    return(
        <div className="Auth-form-container">
            {isReg?(<form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Kayıt Ol</h3>
          <div className="form-group mt-3">
            <label>Kullanıcı Adı</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Kullanıcı adı adresi girin"
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Parola</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Parola oluşturun"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button onClick={registerhandler} type="submit" className="btn btn-primary">
              Kayıt Ol
            </button>
          </div>
       

          <p className="forgot-password text-right mt-2">
            <a onClick={isRegHandler} href="#">Giriş Yap</a>
          </p>
        </div>
      </form>):(<form className="Auth-form">
        <div className="Auth-form-content">
          {isSuccess?(
          <div className="p-3 mb-2 bg-success text-white">
            <h4>Kayıt Başarılı Şimdi Giriş Yap</h4>
          </div>):(<></>)}
          
          <h3 className="Auth-form-title">Giriş Yap</h3>
          <div className="form-group mt-3">
            <label>Kullanıcı adı</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Kullanıcı adınızı girin"
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Parola</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Parolanızı girin"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button onClick={loginhandler} type="submit" className="btn btn-primary">
              Giriş
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Parolamı <a href="#" onClick={handleForgetPass}>unuttum?</a>
          </p>

          <p className="forgot-password text-right mt-2">
            <a onClick={isRegHandler} href="#">Kayıt Ol</a>
          </p>
        </div>
      </form>)}
      
    </div>
    )
}


export default LoginPage;