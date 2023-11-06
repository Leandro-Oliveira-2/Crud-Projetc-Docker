<template>
  <nav-bar @filtrar="filtrarUsuarios" />
  <div class="container-fluid">
    <div class="row">
      <div id="myDiv" class="container col-12">
        <h1 id="Title-user" style="text-align: center">Tela de extratos</h1>
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
              <td>{{ transacao.recepterId }}</td>
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
import Alert from "@/utils/Alert";
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
      window.scrollBy(0, -5000);
      try {
        const response = await request(
          `/transations/list/${this.userId}`,
          "GET",
          "",
          userComplite.accessToken,
          (r) => {
            console.log(r.data);
            console.log(r)
            r.data.receivedTransfers.forEach((element) => {
            });
            this.transacoes = r.data.transations
              .concat(r.data.receivedTransfers)
              .sort((a, b) => parseInt(a.id) - parseInt(b.id));
            this.transacoes.map((transacao) => {
              if (
                transacao.transationType == "Deposito" ||transacao.transationType == "deposito"){
                transacao.recepterId = "Operação de Conta";
              }
              if (
                transacao.transationType == "Saque" || transacao.transationType == "saque") {
                transacao.recepterId = "Operação de Conta";
              }

              if (transacao.recepter) {
                transacao.recepterId = `Enviado para ${transacao.recepter.name}`;
              }

              if (transacao.user) {
                transacao.recepterId = `Recebido de ${transacao.user.name}`;
              }

              if (typeof transacao.recepterId == "number") {
                transacao.recepterId = "Enviado";
              }
            });
            console.log(this.transacoes );
            this.totalPaginas = Math.ceil(this.transacoes.length / 10);
            this.usuariosDividos = this.divisorList(this.transacoes, 10);
            this.usuariosParaListar =
              this.usuariosDividos[this.paginaAtual - 1];
            document.getElementById("Title-user").innerHTML =
              "Extrato do Usuário: " + r.data.name;
          }
        );
      } catch (error) {
        console.error("Erro ao listar usuários", error.response);
      }
    },
    filtrarUsuarios(pesquisa) {
      try {
        const response = request(
          `/transations/filterByName?name=${pesquisa}`,
          "POST",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
          (r) => {
            console.log(r.data);
            this.transacoes = [...r.data].sort(
              (a, b) => parseInt(a.id) - parseInt(b.id)
            );
            this.totalPaginas = Math.ceil(this.transacoes.length / 10);
            this.usuariosDividos = this.divisorList(r.data, 10);
            this.usuariosParaListar =
              this.usuariosDividos[this.paginaAtual - 1];
          }
        );
      } catch (error) {
        Alert("Transações não encontradas!");
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
  background-color: #89f3ac;
  height: auto;
  width: 100vw;
  min-height: 800px;
  overflow: visible;
  margin-block-end: -15%;
}

.nav-bar {
  background-color: aqua;
  font-size: small;
}

.pageNavigation {
  margin: -5% -12% 2px;
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
