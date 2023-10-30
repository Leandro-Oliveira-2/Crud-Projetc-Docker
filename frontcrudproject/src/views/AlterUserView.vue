<template>
  <div class="container-body">
    <div class="centered-container">
      <h2 class="pb-2 border-bottom">Edição de Usuário</h2>
      <form class="form" @submit.prevent="userUpdate">
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
            placeholder="Número de telefone"
          />
        </label>

        <label class="label-input" for="">
          <i class="far fa-envelope icon-modify"></i>
          <input type="text" v-model="userData.adress" placeholder="Endereço" />
        </label>

        <button class="btn btn-second" type="submit">Atualizar</button>
      </form>
    </div>
  </div>

  <button type="button" class="btn btn-outline-light" v-on:click="mudarPag()">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="currentColor"
      class="bi bi-arrow-left-square-fill"
      viewBox="0 0 16 16"
      routerLink="betting"
    >
      <path
        d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"
      />
    </svg>
  </button>
</template>
  
  <script>
import Alert from "@/utils/Alert";
import navBar from "@/views/navBar.vue";
import request from "../utils/request";

const userAlter = JSON.parse(localStorage.getItem("userAlter"));
const userComplite = JSON.parse(localStorage.getItem("Usuario"));
export default {
  components: {
    "nav-bar": navBar,
  },
  name: "alterUser",
  data() {
    return {
      userData: {
        name: userAlter.name,
        gender: userAlter.gender,
        email: userAlter.email,
        phone: userAlter.phone,
        adress: userAlter.adress,
      },

      userId: localStorage.getItem("UserId"),
    };
  },
  methods: {
    async userUpdate() {
      try {
        request(
          `/users/${userAlter.id}`,
          "PATCH",
          this.userData,
          userComplite.accessToken,
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
    verificarUser() {
      console.log(userAlter)
      if(localStorage.getItem('userEdit') == 1){
        localStorage.setItem('userEdit', 0);
        window.location.reload();
      }
      if (verific === null) {
      this.$router.push({ name: "about" });
      setInterval(() => {
        window.location.reload();
      }, 100);
    }
    },
    mudarPag() {
      this.$router.push({ name: "betting" });
    },
  },
  mounted(){

  }
};
</script>
  
<style>
.label-input {
  margin-block-end: 30px;
}

button.btn.btn-outline-light {
  position: fixed;
  top: 90%;
  width: 80px;
  margin-left: 80px;
}

.container-body {
  width: 100vw;
  height: 100vh;
  background-color: #b9e2c7;
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.centered-container {
  width: 583px;
    height: 621px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    margin-block-end: 10vh;
}

h2 {
  margin-bottom: 60px;
}

.btn-second {
  font-size: 20px;
  background-color: #58af9b;
  text-align: center; /* Adicionado para centralizar o texto */
}

.btn-second:hover {
  background-color: #fff;
  border: 1px solid #58af9b;
  color: #58af9b;
  text-align: center; /* Mantido para o estado de hover */
}


.form input {
  height: 45px;
  width: 100%;
  border: none;
  background-color: #ecf0f1;
  
}

.form{
  width: 80%;
  
}

table.table.table-bordered {
  margin-left: 27%;
  margin-top: 5%;
  width: 70%;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-collapse: separate;
  border: solid #ccc 1px;

  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
}
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px #ecf0f1 inset !important;
  -webkit-text-fill-color: #000 !important;
}
</style>