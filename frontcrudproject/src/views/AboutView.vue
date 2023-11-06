<template>
  <div class="container" :key="activeContent">
    <div class="content first-content">
      <div class="first-column">
        <h2 class="title title-primary">Olá Amigo!</h2>
        <p class="description description-primary">
          Insira seus dados pessoais
        </p>
        <p class="description description-primary">
          e comece a jornada conosco
        </p>
        <button
          id="signin"
          class="btn btn-primary"
          v-on:click="onSignInClick()"
        >
          Login
        </button>
      </div>
      <div class="second-column">
        <form class="form" @submit.prevent="cadastroForm">
          <h2 class="title title-second">Crie Sua Conta</h2>
          <label class="label-input" for="">
            <i class="far fa-user icon-modify"></i>
            <input type="text" v-model="userData.name" placeholder="Nome" />
          </label>

          <label class="label-input" for="">
            <i class="far fa-envelope icon-modify"></i>
            <select
              id="gender"
              placeholder="Selecione seu gênero"
              v-model="userData.gender"
              class="custom-select"
              required
            >
              <option value="MASCULINO">Masculino</option>
              <option value="FEMININO">Feminino</option>
              <option value="OUTROS">Outros</option>
            </select>
          </label>

          <label class="label-input" for="">
            <i class="fas fa-lock icon-modify"></i>
            <input type="email" v-model="userData.email" placeholder="email" />
          </label>

          <label class="label-input" for="">
            <i class="far fa-user icon-modify"></i>
            <input
              type="text"
              v-model="userData.phone"
              @input="applyPhoneMask"
              placeholder="Número de telefone"  
            />
          </label>

          <label class="label-input" for="">
            <i class="far fa-envelope icon-modify"></i>
            <input
              type="text"
              v-model="userData.adress"
              placeholder="Endereço"
            />
          </label>

          <label class="label-input" for="">
            <i class="fas fa-lock icon-modify"></i>
            <input
              type="password"
              v-model="userData.secret"
              placeholder="Confirme a senha"
            />
          </label>
          <button class="btn btn-second" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
    <div class="content second-content">
      <div class="first-column">
        <h2 class="title title-primary">Olá Amigo!</h2>
        <p class="description description-primary">
          Insira seus dados pessoais
        </p>
        <p class="description description-primary">
          e comece a jornada conosco
        </p>
        <button id="signup" class="btn btn-primary">inscrever-se</button>
      </div>
      <div class="second-column">
        <h2 class="title title-second">Faça Login com sua conta</h2>

        <p class="description description-second">
          ou use seu Email cadastrado
        </p>
      </div>
    </div>
  </div>
</template>
  
<script>
import request from "../utils/request";
import Alert from "@/utils/Alert";

export default {
  name: "AboutView",
  data() {
    return {
      userData: {
        name: "",
        gender: "",
        email: "",
        phone: "",
        adress: "",
        secret: "",
        saldo: 0,
        fidelidade: {
          dia: 0,
        },
      },
      activeContent: "signin",
    };
  },
  methods: {
    verificarUser() {
      if (localStorage.getItem("userEdit") == 1) {
        localStorage.clear();
        window.location.reload();
      }
    },
    applyPhoneMask(event) {
      let value = event.target.value.replace(/\D/g, ""); // Remove todos os caracteres que não são dígitos
      if (value.length > 11) {
        value = value.slice(0, 11); // Limita o valor a 10 dígitos
      }
      if (value.length > 1){
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses em volta dos dois primeiros dígitos
      }
      if (value.length > 6) {
        value = value.replace(/(\d{5})(\d)/, "$1-$2"); // Coloca hífen entre o quinto e o sexto dígitos
      }
      event.target.value = value.replace(
        /^(\d{2})(\d{5})(\d{4})$/,
        "($1) $2-$3"
      ); // Aplica a máscara (XX) XXXX-XXXX
    },
    async cadastroForm() {
      try {
        request(`/users/`, "POST", this.userData, "", (r) => {
          Alert("usuário Criado com Sucesso!");

          this.userData = {
            name: "",
            gender: "",
            email: "",
            phone: "",
            adress: "",
            secret: "",
            saldo: 0,
            fidelidade: {
              dia: 0,
            },
          };
          this.$router.push({ name: "home" });
        });
      } catch (error) {
        Alert("Erro ao cadastrar usuário:", "red");
      }
    },
    onSignInClick() {
      this.activeContent =
        this.activeContent === "signin" ? "signup" : "signin";
      this.$router.push({ name: "home" });
    },
  },
  mounted() {
    this.verificarUser();
  },
  computed: {
    propriedadeCalculada() {
      return Number(this.userData.phone) + 1;
    },
  },
};
</script>
  
  <style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap");

input:focus {
  outline: none;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Open Sans", sans-serif;
}
.container {
  display: flex;
  flex-direction: column; /* Alinhar o conteúdo verticalmente */
  justify-content: center; /* Centralizar verticalmente */
  align-items: center; /* Centralizar horizontalmente */
  background-color: #89f3ac;
  height: 100vh; /* Ocupar toda a altura da tela */
  width: 100vw; /* Ocupar toda a largura da tela */
  overflow: hidden; /* Evitar que o conteúdo ultrapasse a tela */
}

.custom-select {
  outline: none;
  height: 45px;
  width: 100%;
  border: none;
  background-color: #ecf0f1;
  padding-left: 40px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16"><path d="M7.646 11.854a.5.5 0 0 1-.707 0L2.93 7.828a.25.25 0 0 1 0-.354l.354-.354a.5.5 0 0 1 .708 0L8 10.293l4.007-4.007a.5.5 0 0 1 .708 0l.354.354a.25.25 0 0 1 0 .354L8.354 11.854a.5.5 0 0 1-.708 0z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px 16px;
  transition: background-color 0.5s;
}
.custom-select:hover {
  background-color: #ecf0f1;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.8s, transform 0.8s;
}
.slide-enter,
.slide-leave-to {
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
  width: 60vw;
  height: 75vh;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.content::before {
  content: "";
  position: absolute;
  background-image: url("/public/img/bet-apostas.jpg");
  background-position: center;
  background-size: cover;
  background-color: rgba(255, 255, 255, 0.6);
  width: 40%;
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
  margin-top: -10%;
  color: #58af9b;
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
  transition: background-color 0.5s;
}
.btn-primary:hover {
  background-color: #fff;
  color: #58af9b;
}
.btn-second {
  background-color: #58af9b;
  border: 1px solid #58af9b;
  transition: background-color 0.5s;
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
.link-social-media:not(:first-child) {
  margin-left: 10px;
}
.link-social-media .item-social-media {
  transition: background-color 0.5s;
}
.link-social-media:hover .item-social-media {
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
input:-webkit-autofill {
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
.password::first-letter {
  text-transform: capitalize;
}

.sign-in-js .first-content .first-column {
  z-index: -1;
}

.sign-in-js .second-content .second-column {
  z-index: 11;
}
.sign-in-js .second-content .first-column {
  z-index: 13;
}

.sign-in-js .content::before {
  left: 60%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  animation: slidein 0.8s; /*MODIFIQUEI DE 3s PARA 0.8s*/

  z-index: 12;
}

.sign-up-js .content::before {
  animation: slideout 0.8s; /*MODIFIQUEI DE 3s PARA 0.8s*/
  z-index: 12;
}

.sign-up-js .second-content .first-column,
.sign-up-js .second-content .second-column {
  z-index: -1;
}

.sign-up-js .first-content .second-column {
  z-index: 11;
}

.sign-up-js .first-content .first-column {
  z-index: 13;
}

@keyframes slidein {
  from {
    left: 0;
    width: 40%;
  }

  25% {
    left: 5%;
    width: 50%;
  }

  50% {
    left: 25%;
    width: 60%;
  }

  75% {
    left: 45%;
    width: 50%;
  }

  to {
    left: 60%;
    width: 40%;
  }
}

@keyframes slideout {
  from {
    left: 60%;
    width: 40%;
  }

  25% {
    left: 45%;
    width: 50%;
  }

  50% {
    left: 25%;
    width: 60%;
  }

  75% {
    left: 5%;
    width: 50%;
  }

  to {
    left: 0;
    width: 40%;
  }
}
button:hover {
  background-position: right center;
  background-size: 200% auto;
  -webkit-animation: pulse 2s infinite;
  animation: pulse512 1s infinite;
}

@keyframes pulse512 {
  0% {
    box-shadow: 0 0 0 0 #05bada66;
  }

  70% {
    box-shadow: 0 0 0 10px rgb(218 103 68 / 0%);
  }

  100% {
    box-shadow: 0 0 0 0 rgb(218 103 68 / 0%);
  }
}

input:focus {
  outline: none;
}
</style>
