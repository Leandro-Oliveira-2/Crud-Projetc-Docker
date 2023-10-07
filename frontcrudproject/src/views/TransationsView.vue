<template>
    <nav-bar @filtrar="filtrarUsuarios"/>
      <div class="container-fluid">
        <div class="row">
          <div id="myDiv" class="container col-12">
            <h1 id="Title-user" style="text-align: center;">Tela de extratos</h1>
            <table class="table table-dark table-striped">
              <thead>
                <tr>
                  <th class="id">id</th>
                  <th class="date">Date</th>
                  <th class="transaction">Transaction Type</th>
                  <th class="description">Description</th>
                  <th class="value">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="transacao in transacoes" :key="transacao.id">
                  <td>{{ transacao.id }}</td>
                  <td>{{ new Date(transacao.date).toLocaleString() }}</td>
                  <td>{{ transacao.transationType }}</td>
                  <td>{{ transacao.description }}</td>
                  <td>
                    {{
                      transacao.value
                        ? transacao.value.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })
                        : ""
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              class="btn btn-outline-light"
              v-on:click="mudarPag()"
            >
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
          </div>
        </div>
      </div>
      <footer-view />
    </template>
    
    
    <script>
    import axios from "axios";
    import navBar from "@/views/navBar.vue";
    import request from "../utils/request";
    import footer from "../views/FooterView.vue";
    const userComplite = JSON.parse(localStorage.getItem("Usuario"));
    export default {
      components: {
        "nav-bar": navBar,
        "footer-view": footer,
      },
      name: "transations",
      data() {
        return {
          usuarios: [],
          user: {},
          userId: localStorage.getItem("UserId"),
          transacoes: [], // Adicione esta linha
        };
      },
      methods: {
        verificarUser() {
      
            if (this.userId === null || this.userId == "") {
              this.$router.push({ name: "about" });
            }
    
          const usuarioString = localStorage.getItem("Usuario");
          return (
            (this.user = JSON.parse(usuarioString).user), console.log(this.user)
          );
        },
        async transacoesUser() {
        window.scrollBy(0,-5000);
          try {
            const response = await request(
              `/transations/list/${this.userId}`,
              "GET",
              "",
              userComplite.accessToken,
              (r) => {
                console.log(r.data.name)
                this.transacoes = r.data.transations;
                document.getElementById("Title-user").innerHTML = "Extrato do Usuário: " + r.data.name;
                
                Alert("usuário atualizado com Sucesso!");
              }
            );
          } catch (error) {
            console.error("Erro ao listar usuários", error.response);
          }
        },
        filtrarUsuarios(pesquisa) {
          try {
            const response =  request(
              `/transations/filterByName?name=${pesquisa}`,
              "POST",
              {},
              {headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },},
                (r) => {
                  console.log(r.data)
                this.transacoes = [...r.data].sort(
                  (a, b) => parseInt(a.id) - parseInt(b.id)
                );
                Alert("usuário atualizado com Sucesso!");
              }
            );
            
          } catch (error) {
            alert("Usuário não encontrado");
          }
        },  
        mudarPag() {
          this.$router.push({ name: "betting" });
        },
      },
      mounted() {
        this.verificarUser();
        this.transacoesUser();
      },
    };
    </script>
      
    <style>
    @import "bootstrap/dist/css/bootstrap.css";
    
    .txt-pag {
      margin-block-end: 15%;
    }
    
    h1{
      margin: 5% 32% 15%;
      margin-block-end: 5%;
    }
    
    .container {
      position: relative;
      background-size: cover;
      background-position: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #89f3ac;
      height: auto;
      width: 100vw;
      min-height: 700px;
      overflow: visible;
      margin-block-end: -15%;
    }
    
    .nav-bar {
      background-color: aqua;
      font-size: small;
    }
    
    .table.table-dark.table-striped {
      margin: 0 8% 0;
      width: 900px;
      font-size: 0.8vw;
      position: relative;
      margin-block-end: 5%;
    }
    
    .btn.btn-outline-light{
      width: 100px;
      height: 50px;
      margin-top: 72%;
      margin-left: -85%;
      position: absolute;
      text-align: center;
    }
    </style>
    