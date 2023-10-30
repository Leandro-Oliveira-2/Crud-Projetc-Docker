<template>
  <div class="container">
    <!-- Primeiro Conteúdo -->
    <div class="content first-content">
      <div class="first-column">
        <h2 class="title title-primary">Bem Vindo de Volta!</h2>
        <p class="description description-primary">Mantenha-se conectado conosco</p>
        <p class="description description-primary">Faça login com a sua melhor conta</p>
        <button id="signin" class="btn btn-primary" v-on:click="onSignInClick()">Cadastro</button>
      </div>
      <div class="second-column">
        <div class="social-media">
          <ul class="list-social-media">
              <a class="link-social-media" href="#">
                    <li class="item-social-media">
                      <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                      </svg>
                    </li>
                </a>
                <a class="link-social-media" href="#">
                    <li class="item-social-media">
                      <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                      </svg>
                    </li>
                </a>
                <a class="link-social-media" href="#">
                    <li class="item-social-media">
                      <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                      </svg>
                    </li>
                </a>
          </ul>
        </div>
        <h2 class="title title-second">Bem vindo!</h2>
        <form class="form" @submit.prevent="loginForm">
          <label class="label-input">
              <i class="far fa-envelope icon-modify"></i>
              <input type="email" placeholder="email"  v-model="userData.email" >
          </label>

          <label class="label-input">
              <i class="fas fa-lock icon-modify"></i>
              <input type="password" placeholder="Senha"  v-model="userData.password">
          </label>

          <a class="password" href="#">Esqueceu sua senha?</a>
          <button class="btn btn-second" type="submit">Login</button>
        </form>
      </div>
    </div>

    <!-- Segundo Conteúdo -->
    <div class="content second-content">
      <div class="first-column">
        <h2 class="title title-primary">Olá Amigo!</h2>
        <p class="description description-primary">Insira seus dados pessoais</p>
        <p class="description description-primary">e comece a jornada conosco</p>
        <button id="signup" class="btn btn-primary">inscrever-se</button>
      </div>
      <div class="second-column">
        <h2 class="title title-second">Faça Login com sua conta</h2>
        <!-- ... (conteúdo do segundo bloco) -->
      </div>
    </div>
  </div>
</template>



<script >
import Alert from '@/utils/Alert'
import axios from 'axios';
import request from "../utils/request";

export default {
props: {
  
},
name: 'HomeView',
data() {
  return {
    userData: {
      id:'',
      accessToken:'',
      email: '',
      password: '',
      user:{
        saldo: 0,
        fidelidade:{
        dia: 0
      }
      }
      
    },
  };
},
methods: {
  async loginForm() {
    console.log("Formulário de login enviado!");
    try {
      const response = await axios.post('http://localhost:8081/api/v1/auth/', this.userData);
      this.userData.id = response.data.user.id;
      this.userData.accessToken = response.data.accessToken;
      this.userData.user.saldo = response.data.user.saldo;
      localStorage.setItem('UserId', response.data.user.id);
      localStorage.setItem('Usuario', JSON.stringify(response.data));
      localStorage.setItem('userEdit', 1);

      let dateFidelidade = new Date(response.data.user.fidelidade.data);
      let ano = dateFidelidade.getFullYear();
      let mes = dateFidelidade.getMonth()+1;
      let dia = dateFidelidade.getDate();
      let dateNow = new Date();
      let anoNow = dateNow.getFullYear();
      let mesNow = dateNow.getMonth() +1;
      let diaNow = dateNow.getDate();

      let dataSeguinte = new Date(`${ano}-${mes}-${dia}T05:06:01.603Z`)
      dataSeguinte.setDate(dataSeguinte.getDate() + 1);
      console.log(dataSeguinte.getFullYear(), anoNow, dataSeguinte.getMonth() , mesNow, dataSeguinte.getDate() , diaNow)
      if(!(anoNow == ano && mesNow == mes && diaNow == dia)){
        console.log("Entrei na 126")
        if(dataSeguinte.getFullYear() == anoNow && dataSeguinte.getMonth()+1  == mesNow && dataSeguinte.getDate() == diaNow){
          console.log("Entrei na 128")
          this.userData.user.fidelidade.dia = response.data.user.fidelidade.dia + 1;
          this.userData.user.fidelidade.data = new Date();
        }else{
          console.log("Entrei no else")
          this.userData.user.fidelidade.dia = 1;
          this.userData.user.fidelidade.data = new Date();
        }

        if(this.userData.user.fidelidade.dia == 5){
          console.log("Entrei na 138")
          this.userData.user.saldo= this.userData.user.saldo + 50;
          this.userData.user.fidelidade.dia = 0;
        }

        console.log(this.userData.user.fidelidade)
        this.userUpdate();
        
      }

      this.$router.push({ name: 'betting' });
      } 
      catch (error) {
        console.log(error)
      Alert("Erro no login")
    }
  },
  async userUpdate() {
      try {
        request(
          `/users/${this.userData.id}`,
          "PATCH",
          this.userData.user,
          this.userData.accessToken,
          (r) => {
            Alert("usuário atualizado com Sucesso!");
          }
        );
      } catch (error) {
        console.log(error);
        Alert("Erro na atualização!");
        document.location.reload();
      }
    },
  onSignInClick() {
    this.$router.push({ name: 'about' });
  },
  limparStorage(){
    console.log(localStorage.getItem("UserId"));
    if(localStorage.getItem("UserId") !== null ){
      localStorage.clear();
      window.location.reload();
    }
  }
},
mounted (){
  this.limparStorage()
}
};
</script>


<style>

body {
  font-family: 'Open Sans', sans-serif;
}
.container {
display: flex;
flex-direction: column; /* Alinhar o conteúdo verticalmente */
justify-content: center; /* Centralizar verticalmente */
align-items: center; /* Centralizar horizontalmente */
background-color: #89f3ac;
height: 100vh; /* Ocupar toda a altura da tela */
width:100vw; /* Ocupar toda a largura da tela */
overflow: hidden; /* Evitar que o conteúdo ultrapasse a tela */
}

.custom-select {
  height: 45px;
  width: 100%;
  border: none;
  background-color: #ecf0f1;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16"><path d="M7.646 11.854a.5.5 0 0 1-.707 0L2.93 7.828a.25.25 0 0 1 0-.354l.354-.354a.5.5 0 0 1 .708 0L8 10.293l4.007-4.007a.5.5 0 0 1 .708 0l.354.354a.25.25 0 0 1 0 .354L8.354 11.854a.5.5 0 0 1-.708 0z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px 16px;
}
.custom-select:hover {
  background-color: #ecf0f1;
}



.slide-enter-active, .slide-leave-active {
transition: opacity 0.8s, transform 0.8s;
}
.slide-enter, .slide-leave-to {
opacity: 0;
transform: translateX(50px);
}
@keyframes gradient {
0% {
    background-position: 0% 50%;
}

50% {
    background-position: 100% 50%;
}

100% {
    background-position: 0% 50%;
}
}

.content {
background-color: #fff;
  border-radius: 15px;
  width: 60vw; /* Ajuste a largura conforme necessário */
  height: 75vh;
  justify-content: space-between;
  align-items: center;
  position: relative;
}


.content::before {
  content: "";
  position: absolute;
  background-image: url('/public/img/bet-apostas.jpg');
  background-position: center;
  background-size: cover;
  background-color: rgba(255, 255, 255, 0.6);
  width: 43%;
  height: 100%;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  left: 0;
}
.title {
  font-size: 28px;
  font-weight: bold;
  text-transform: capitalize;
}
.title-primary {
  color: #fff;
}
.title-second {
  margin-top: -10%;    color: #58af9b;
  padding-block-end: 30px;
}
.description {
  font-size: 14px;
  font-weight: 300;
  line-height: 30px;
}
.description-primary {
  color: #fff;
}
.description-second {
  color: #7f8c8d;
}
.btn {
  border-radius: 15px;
  text-transform: uppercase;
  color: #fff;
  font-size: 10px;
  padding: 10px 50px;
  cursor: pointer;
  font-weight: bold;
  width: 150px;
  align-self: center;
  border: none;
  margin-top: 1rem;
}
.btn-primary {
  background-color: transparent;
  border: 1px solid #fff;
  transition: background-color .5s;
}
.btn-primary:hover {
  background-color: #fff;
  color: #58af9b;
}
.btn-second {
  background-color: #58af9b;
  border: 1px solid #58af9b;
  transition: background-color .5s;
}
.btn-second:hover {
  background-color: #fff;
  border: 1px solid #58af9b;
  color: #58af9b;
}
.first-content {
  display: flex;
}
.first-content .second-column {
  z-index: 11;
}
.first-column {
  text-align: center;
  width: 40%;
  z-index: 10;
}
.second-column {
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.social-media {
  margin: 1rem 0;
  padding-block-end: 10%;
}
.link-social-media:not(:first-child){
  margin-left: 10px;
}
.link-social-media .item-social-media {
  transition: background-color .5s;
}
.link-social-media:hover .item-social-media{
  background-color: #58af9b;
  color: #fff;
  border-color: #58af9b;
}
.list-social-media {
  display: flex;
  list-style-type: none;
}
.item-social-media {
  border: 1px solid #bdc3c7;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #95a5a6;
}
.form {
  display: flex;
  flex-direction: column;
  width: 55%;
}
.form input {
  height: 45px;
  width: 100%;
  border: none;
  background-color: #ecf0f1;
}
input:-webkit-autofill
{
  -webkit-box-shadow: 0 0 0px 1000px #ecf0f1 inset !important;
  -webkit-text-fill-color: #000 !important;
}
.label-input {
  background-color: #ecf0f1;
  display: flex;
  align-items: center;
  margin: 8px;
}
.icon-modify {
  color: #7f8c8d;
  padding: 0 5px;
}

/* second content*/

.second-content {
  position: absolute;
  display: flex;
}
.second-content .first-column {
  order: 2;
  z-index: -1;
}
.second-content .second-column {
  order: 1;
  z-index: -1;
}
.password {
  color: #34495e;
  font-size: 14px;
  margin: 15px 0;
  text-align: center;
}



button:hover {
background-position: right center;
background-size: 200% auto;
-webkit-animation: pulse 2s infinite;
animation: pulse512 1s infinite;
}



input:focus {
  outline: none;
}
</style>