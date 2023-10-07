<template>
  <nav-bar @filtrar="filtrarUsuarios" />
  <body>
    <div class="container-fluid">
      <div class="row">
        <div id="myDiv" class="container">
          <div class="row">
            <div class="col-12">
              <h2>Tabela de Clientes</h2>
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
                  <tr v-for="usuario in usuarios" :key="usuario.id">
                    <td>{{ usuario.id }}</td>
                    <td>{{ usuario.name }}</td>
                    <td>{{ usuario.email }}</td>
                    <td>{{ usuario.adress }}</td>
                    <td>
                      {{
                        usuario.saldo
                          ? usuario.saldo.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })
                          : "00,00"
                      }}
                    </td>
                    <td>
                      <div class="dropdown">
                        <button
                          class="btn btn-sm btn-light dropdown-toggle"
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
                              Excluir</a
                            >
                          </li>
                        </ul>
                        <div
                          class="modal fade"
                          id="exampleModal"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                  Excluir Usuário
                                </h5>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">
                                Você tem certeza que deseja excluir o usuário?
                              </div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Nâo
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
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
      transacoes: [], // Adicione esta linha
    };
  },
  methods: {
    verificarUser() {
      const verific = localStorage.getItem("Usuario");

    if (verific === null) {
      this.$router.push({ name: "about" });
      setInterval(() => {
        window.location.reload();
      }, 100);
    }
      localStorage.setItem("entrei", 1);

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
    filtrarUsuarios(pesquisa) {
      try {
        const response = request(
          `/users/filterByName?name=${pesquisa}`,
          "POST",
          {},
          userComplite.accessToken  ,
          (r) => {
            this.usuarios = [...r.data].sort(
              (a, b) => parseInt(a.id) - parseInt(b.id)
            );
            Alert("usuário atualizado com Sucesso!");
          }
        );
      } catch (error) {
        alert("Usuário não encontrado");
      }
    },
    async listarUsers() {
      window.scrollBy(0, -5000);
      try {
        const response = await request(
          `/users/`,
          "GET",
          "",
          userComplite.accessToken,
          (r) => {
            this.usuarios = [...r.data].sort(
              (a, b) => parseInt(a.id) - parseInt(b.id)
            );
            Alert("usuário atualizado com Sucesso!");
          }
        );
        this.usuarios = response.data;
      } catch (error) {
        console.error("Erro ao listar usuários", error.response);
      }
    },
    excluirUsuario() {
      console.log(this.userIdExclude);
      try {
        request(
          `/users/${this.userIdExclude}`,
          "DELETE",
          {},
          userComplite.accessToken,
          (r) => {
            Alert("usuário deletado com Sucesso!");
          }
        );
      } catch (error) {
        console.error("Erro ao excluir usuário", error.response);
      }
    },
  },
  mounted() {
    this.listarUsers();
    this.verificarUser();
  },
};
</script>
    
<style>
@import "bootstrap/dist/css/bootstrap.css";

.txt-pag {
  margin-block-end: 15%;
}

h2 {
  margin: 5% 32% 0;
  margin-block-end: 5%;
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
  background-color: #89f3ac;
  height: auto;
  width: 100vw;
  min-height: 700px;
  overflow: visible;
  margin-block-end: -15%;
}

.table.table-dark.table-striped {
  margin: 0 12% 0;
  width: 900px;
  font-size: 0.8vw;
  position: relative;
  margin-block-end: 5%;
}

.btn.btn-secondary.dropdown-toggle {
  font-size: 1vw; /* Ajuste o tamanho da fonte conforme necessário */
  text-align: center;
}
</style>
  