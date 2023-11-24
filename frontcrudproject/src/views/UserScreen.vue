<template>
  <nav-bar @filtrar="filtrarUsuarios" />
  <div class="container-fluid">
    <div class="row">
      <div id="myDiv" class="container col-12">
        <h1 id="title">Tela de extratos</h1>
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th class="id">id</th>
              <th class="date">Date</th>
              <th class="transaction">Transaction Type</th>
              <th class="description">Description</th>
              <th class="status-remetente-destinatario">
                Remetente/Destinatário:
              </th>
              <th class="value">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transacao in usuariosParaListar" :key="transacao.id">
              <td>{{ transacao.id }}</td>
              <td>{{ new Date(transacao.date).toLocaleString() }}</td>
              <td>{{ transacao.transationType }}</td>
              <td>{{ transacao.description }}</td>
              <td>
                {{
                  transacao.recepterId !== undefined || transacao.transationType
                    ? "Operação de Conta"
                    : ""
                }}
              </td>
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
        <nav aria-label="Page navigation example" class="pageNavigation">
          <ul class="pagination">
            <li class="page-item" @click="paginaAnterior">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li
              class="page-item"
              v-for="pagina in totalPaginas"
              :key="pagina"
              :class="{ active: pagina === paginaAtual }"
            >
              <a class="page-link" href="#" @click="irParaPagina(pagina)">{{
                pagina
              }}</a>
            </li>
            <li class="page-item" @click="proximaPagina">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
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
import navBar from "@/views/navBar.vue";
import request from "../utils/request";
import Alert from "@/utils/Alert";
import footer from "../views/FooterView.vue";
const userComplite = JSON.parse(localStorage.getItem("Usuario"));
export default {
  components: {
    "nav-bar": navBar,
    "footer-view": footer,
  },
  name: "userScreen",
  data() {
    return {
      usuarios: [],
      user: {},
      userId: localStorage.getItem("UserId"),
      transacoes: [],
      paginaAtual: 1,
      usuariosDividos: [],
      usuariosParaListar: [],
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
    divisorList(array, size) {
      const newArray = [];
      for (let i = 0; i < array.length; i += size) {
        newArray.push(array.slice(i, i + size));
      }
      return newArray;
    },
    async transacoesUser() {
      if(this.verification == 1){
        localStorage.setItem("entrei", 0);
        window.location.reload();
      }
      window.scrollBy(0, -5000);
      try {
        const response = await request(
          `/transations/`,
          "GET",
          "",
          userComplite.accessToken,
          (r) => {
            this.transacoes = r.data;
            let tranfer = this.transacoes.filter((usuario) => {
              return usuario.transationType == "Transferência";
            });
            this.totalPaginas = Math.ceil(this.transacoes.length / 10);
            this.usuariosDividos = this.divisorList(r.data, 10);
            this.usuariosParaListar =
              this.usuariosDividos[this.paginaAtual - 1];
          }
        );
      } catch (error) {
        console.error("Erro ao listar usuários", error);
      }
    },
    async filtrarUsuarios(pesquisa) {
      try {
        await request(
          `/transations/filterByName?name=${pesquisa}`,
          "POST",
          {},
          userComplite.accessToken,
          (r) => {
            this.transacoes = [...r.data].sort(
              (a, b) => parseInt(a.id) - parseInt(b.id)
            );
            if (pesquisa.length == 0) {
              document.getElementById("title").innerHTML = "Tela de extratos";
            } else {
              document.getElementById("title").innerHTML =
                "Extratos Filtrados por:" + pesquisa;
            }
            this.totalPaginas = Math.ceil(this.transacoes.length / 10);
            this.usuariosDividos = this.divisorList(r.data, 10);
            this.usuariosParaListar =
              this.usuariosDividos[this.paginaAtual - 1];
          },
          (error) => {
            if (error.response && error.response.status === 403) {
              Alert("Transações não encontradas!");
            }
          }
        );
      } catch (error) {
        Alert("Erro na busca!", error);
      }
    },
    irParaPagina(pagina) {
      if (this.paginaAtual === pagina)
        return console.log("Já está na página atual");
      this.usuariosParaListar = this.usuariosDividos[pagina - 1];
      this.paginaAtual = pagina;
    },
    proximaPagina() {
      if (this.paginaAtual === this.totalPaginas)
        return Alert("Já está na última página");
      this.irParaPagina(this.paginaAtual + 1);
    },
    paginaAnterior() {
      if (this.paginaAtual === 1) return Alert("Já está na primeira página");
      this.irParaPagina(this.paginaAtual - 1);
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

h1 {
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
  background-image: linear-gradient(
    315deg,
    rgb(243, 162, 137) 0%,
    #77a4e0 74%,
    #59c9a8 100%
  ); 
  height: auto;
  width: 100vw;
  min-height: 800px;
  overflow: visible;
}

.nav-bar {
  background-color: aqua;
  font-size: small;
}

.pageNavigation {
  margin: -5% 45% 2px;
  color: #f38989;
  margin-block-end: 5%;
}

.table.table-dark.table-striped {
  margin: 0 8% 0;
  width: 900px;
  font-size: 0.8vw;
  position: relative;
  margin-block-end: 5%;
}

.btn.btn-outline-light {
  width: 100px;
  height: 50px;
  margin-top: 72%;
  margin-left: -85%;
  position: absolute;
  text-align: center;
}
</style>
