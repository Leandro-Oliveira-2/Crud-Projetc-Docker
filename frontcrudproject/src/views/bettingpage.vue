<template>
  <nav-bar @filtrar="filtrarUsuarios" />
  <HomeView @deposito="handleDeposito" />
  <body>
    <div class="container-fluid">
      <div class="row">
        <div id="myDiv" class="container">
          <div class="row">
            <div class="col-12-title">
              <h1 id="title">Tabela de Cliente</h1>
            </div>
            <div class="col-12">
              <button
                type="button"
                class="btn btn-light"
                v-on:click="registrerScreen()"
                style="margin: 0 12% 2px"
              >
                Cadastrar
              </button>
              <a>{{ " " }}</a>
              <table class="table table-striped table-dark">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Saldos</th>
                    <th style="text-align: center">Alterações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="usuario in usuariosParaListar" :key="usuario.id">
                    <td>{{ usuario.id }}</td>
                    <td>{{ usuario.name }}</td>
                    <td>{{ usuario.email }}</td>
                    <td>{{ usuario.adress }}</td>

                    <td>
                      {{
                        usuario.saldo
                          ? Number(usuario.saldo).toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : "00,00"
                      }}
                    </td>
                    <td>
                      <div class="dropdown">
                        <button
                          class="btn btn-sm btn-light dropdown-toggle btn-sm"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style="text-align: center"
                        >
                          Ações
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <a
                              class="dropdown-item"
                              v-on:click="editPag(usuario)"
                              >Editar</a
                            >
                          </li>
                          <li>
                            <a
                              type="button"
                              class="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              v-on:click="alterIdUser(usuario.id)"
                            >
                              Excluir
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>

                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    ref="myModal"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" style="color: black">
                            Excluir Usuário
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body" style="color: black">
                          <p>Você tem certeza que deseja excluir o usuário?</p>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Não
                          </button>
                          <button
                            type="button"
                            class="btn btn-primary"
                            v-on:click="excluirUsuario()"
                          >
                            Tenho Certeza
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
                    <a
                      class="page-link"
                      href="#"
                      @click="irParaPagina(pagina)"
                      >{{ pagina }}</a
                    >
                  </li>
                  <li class="page-item" @click="proximaPagina">
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  <footer-view />
</template>


    
<script>
import navBar from "@/views/navBar.vue";
import request from "../utils/request";
import footer from "../views/FooterView.vue";
import Alert from "@/utils/Alert";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
const userComplite = JSON.parse(localStorage.getItem("Usuario"));

export default {
  components: {
    "nav-bar": navBar,
    "footer-view": footer,
  },
  name: "betting",
  data() {
    return {
      usuarios: [],
      user: {},
      userIdExclude: 0,
      userId: localStorage.getItem("UserId"),
      transacoes: [],
      paginaAtual: 1,
      usuariosDividos: [],
      usuariosParaListar: [],
    };
  },
  methods: {
    verificarUser() {
      const verific = JSON.parse(localStorage.getItem("Usuario"));
      console.log(verific);
      const fidelidade = localStorage.getItem("fidelidade");

      if (verific === null) {
        this.$router.push({ name: "about" });
        setInterval(() => {
          window.location.reload();
        }, 100);
      }

      if (fidelidade) {
        try {
          request(
            `/transations/deposit`,
            "POST",
            {
              userId: verific.user.id,
              transationType: "Fidelidade",
              description: "Depósito de Fidelidade",
              value: parseFloat(50),
              status: "Concluído",
            },
            userComplite.accessToken,
            (r) => {
              setTimeout(() => {
                Alert(
                  "Parabéns você logou 5 dias seguidos, $50,00 adicionado a conta!"
                );
              }, 5000);
            },
            (error) => {
              if (error.response && error.response.status === 400) {
                Alert("Valor Inválido!");
              }
            }
          );
        } catch (error) {
          console.log(error);
          Alert("Erro na transação!");
        }
      }

      if (localStorage.getItem("userEdit") == 1) {
        localStorage.setItem("userEdit", 0);
        window.location.reload();
      }
      if (this.userId === null || this.userId == "") {
        this.$router.push({ name: "about" });
      }

      const usuarioString = localStorage.getItem("Usuario");
      return (this.user = JSON.parse(usuarioString).user);
    },
    divisorList(array, size) {
      const newArray = [];
      for (let i = 0; i < array.length; i += size) {
        newArray.push(array.slice(i, i + size));
      }
      return newArray;
    },
    editPag(user) {
      localStorage.setItem("userAlter", JSON.stringify(user));
      localStorage.setItem("userEdit", 1);

      this.$router.push({ name: "alterUser" });
    },
    alterIdUser(id) {
      this.userIdExclude = id;
    },
    registrerScreen() {
      localStorage.setItem("userEdit", 1);
      this.$router.push({ name: "about" });
    },
    async filtrarUsuarios(pesquisa) {
      console.log("Olá")
      try {
        await request(
          `/users/filterByName?name=${pesquisa}`,
          "POST",
          {},
          userComplite.accessToken,
          (r) => {
            this.transacoes = [...r.data].sort(
              (a, b) => parseInt(a.id) - parseInt(b.id)
            );
            if (pesquisa.length == 0) {
              document.getElementById("title").innerHTML = "Tabela de Clientes";
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
    async handleDeposito() {},
    async listarUsers() {
      
      if (localStorage.getItem("userEdit") == 1) {
        localStorage.setItem("userEdit", 0);
        window.location.reload();
      }
      window.scrollBy(0, -5000);
      try {
        const response = await request(
          `/users/`,
          "GET",
          "",
          userComplite.accessToken,
          (r) => {
            this.usuarios = [...r.data.filter((item) => item.enabled)].sort(
              (a, b) => parseInt(a.id) - parseInt(b.id)
            );
            console.log(this.usuarios);

            this.usuarios.map((item) => {
              console.log(item.enabled);
            });
            this.usuariosDividos = this.divisorList(this.usuarios, 10);
            this.usuariosParaListar =
              this.usuariosDividos[this.paginaAtual - 1];
          }
        );
      } catch (error) {
        console.error("Erro ao listar usuários", error.response);
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
    excluirUsuario() {
      try {
        request(
          `/users/${this.userIdExclude}`,
          "DELETE",
          {},
          userComplite.accessToken,
          (r) => {
            console.log(r);
            Alert("usuário deletado com Sucesso!");
            window.location.reload();
          }
        );
      } catch (error) {
        console.log(error);
        Alert("Erro na Exclusão do Usuário!");
        document.location.reload();
      }
    },
  },
  mounted() {
    this.listarUsers();
    this.verificarUser();
  },
  computed: {
    totalPaginas() {
      return Math.ceil(this.usuariosDividos.length);
    },
  },
};
</script>
    
<style>
@import "bootstrap/dist/css/bootstrap.css";

.txt-pag {
  margin-block-end: 15%;
}

.col-12-title {
  text-align: center;
  margin-top: 3%;
}

.btn.btn-light {
  width: 120px;
  height: 30px;
  margin-top: 5px;
  margin: 10px -10px 10px;
  text-align: center;
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

.table.table-dark.table-striped {
  margin: 0 12% 0;
  width: 900px;
  font-size: 0.8vw;
  position: relative;
  margin-block-end: 5%;
}

.pageNavigation {
  margin: -5% 45% 2px;
  color: #f38989;
  margin-block-end: 5%;
}

.btn.btn-secondary.dropdown-toggle {
  font-size: 0.5vw; /* Ajuste o tamanho da fonte conforme necessário */
  text-align: center;
}
</style>
  