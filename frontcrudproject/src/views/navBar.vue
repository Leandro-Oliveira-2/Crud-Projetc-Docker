<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" routerLink="/">Snet Crud</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="betting" class="nav-link" active-class="active"
              >Clientes</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="userScreen" class="nav-link" active-class="active"
              >Extrato</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="transations" class="nav-link" active-class="active"
              >Seu Extrato</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="deposit" class="nav-link" active-class="active"
              >Deposito</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="saque" class="nav-link" active-class="active"
              >Saque</router-link
            >
          </li>

          <form class="d-flex" @submit.prevent="filtrar">
            <input
              class="form-control me-3"
              type="search"
              placeholder="Pesquisar"
              v-model="userName"
              aria-label="Search"
            />
            <button class="btn btn-light pesquisa" type="submit">
              Pesquisar
            </button>
          </form>
          <li class="nav-item saldo">
            <a class="nav-link active" aria-current="page" href="#"
              >Saldo:
              {{
                saldo
                  ? saldo.toLocaleString("pt-BR", { maximumFractionDigits: 2 })
                  : "00,00"
              }}</a
            >
          </li>
          <li class="nav-item-sair">
            <router-link to="/" class="nav-link" active-class="active"
              ><b>Sair</b></router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
import request from "../utils/request";
const userComplite = JSON.parse(localStorage.getItem("Usuario"));

export default {
  name: "nav-bar",
  computed: {
    isHomeRoute() {
      return (
        this.$route.path === "/betting" || this.$route.path === "/alterUser"
      );
    },
  },
  data() {
    return {
      saldo: 0,
      user: {},
      userName: "",
      userId: localStorage.getItem("UserId"),
    };
  },
  methods: {
    //get saldo
    async getSaldo() {
      console.log(this.userId)
      try {
        const response = await request(
          `/users/${this.userId}`,
          "GET",
          "",
          userComplite.accessToken,
          (r) => {
            this.saldo = r.data.saldo
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
    filtrar() {
      try {
        this.$emit("filtrar", this.userName);
      } catch (error) {
        alert("Usuário não encontrado");
      }
    },
  },
  mounted() {
    this.getSaldo();
  },
};
</script>


<style>
@import "bootstrap/dist/css/bootstrap.css";

.nav-item-sair {
  margin-left: 85%;
  position: absolute;
}

.nav-item.saldo {
  margin-left: 75%;
  position: absolute;
}

.form-control.me-3 {
  width: 300px;
  height: 30px;
  margin-top: 5px;
  margin-left: -150px;
  text-align: center;
  position: absolute;
}

.d-flex {
  width: 300px;
  height: 30px;
  margin-top: 7px;
  margin-left: 40%;
  text-align: center;
  position: absolute;
}

.btn.btn-light.pesquisa {
  width: 100px;
  height: 30px;
  margin-top: 10px;
  margin: 10px 52% 0;
  text-align: center;
}

.logo-icon {
  margin-left: 20px;
  width: 120px; /* Ajuste o tamanho desejado */
  height: 80px; /* Ajuste o tamanho desejado */
}
</style>
