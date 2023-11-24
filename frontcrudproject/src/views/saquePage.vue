<template>
  <nav-bar />
  <div class="container-body">
    <div class="centered-container">
      <h2 class="pb-2 border-bottom">Saque</h2>
      <form class="form" @submit.prevent="saqueForm">
        <label class="label-input">
          <i class="far fa-envelope icon-modify"></i>
          <money3 v-model="postData.value" v-bind="moneyConfig" />
        </label>
        <label class="label-input">
          <i class="fas fa-lock icon-modify"></i>
          <input
            type="text"
            placeholder="Descrição"
            v-model="postData.description"
          />
        </label>
        <button class="btn btn-second" type="submit">Enviar</button>
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
import request from "../utils/request";
import { Money3Component } from "v-money3";
import navBar from "@/views/navBar.vue";

const userComplite = JSON.parse(localStorage.getItem("Usuario"));
const user = localStorage.getItem("UserId");

export default {
  name: "saquePage",
  components: {
    VMoney3: Money3Component,
    "nav-bar": navBar,
  },
  data() {
    return {
      postData: {
        userId: user,
        transationType: "Saque",
        description: "",
        value: "",
        status: "Concluído",
      },
      moneyConfig: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
    };
  },
  methods: {
    async saqueForm() {
      this.postData.userId = parseInt(this.postData.userId);
      this.postData.value = parseFloat(this.postData.value);
      try {
        await request(
          `/transations/saque`,
          "POST",
          this.postData,
          userComplite.accessToken,
          (r) => {
            Alert("Saque feito com Sucesso!");
            this.postData.value = "";
            this.postData.description = "";
            const userAtualizado = JSON.parse(localStorage.getItem("Usuario"));
            userAtualizado.user.saldo = response.data.saldoAtual;
            localStorage.setItem("Usuario", JSON.stringify(userAtualizado));
          },
          (error) => {
            if (error.response && error.response.status === 403) {
              Alert("Saldo insuficiente!");
            }
          }
        );
      } catch (error) {
        Alert("Erro na transação!", error);
      }
    },
    verificarUser() {
      if(this.verification == 1){
        localStorage.setItem("entrei", 0);
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
      localStorage.setItem("userEdit", 1);
      this.$router.push({ name: "betting" });
    },
  },
};
</script>

<style>
button.btn.btn-outline-light {
  position: fixed;
  top: 90%;
  width: 80px;
  margin-left: 80px;
}

.container-body {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
    315deg,
    rgb(243, 162, 137) 0%,
    #77a4e0 74%,
    #59c9a8 100%
  ); 
  display: flex;
  justify-content: center;
  align-items: center;
}

.centered-container {
  width: 550px;
  height: 550px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.2);
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

.form {
  display: flex;
  flex-direction: column;
  width: 80%;
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
</style>