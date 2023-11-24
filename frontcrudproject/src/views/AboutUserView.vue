<template>
  <nav-bar />
  <div class="container-body">
    <div class="conteudo">
      <div class="section d-flex">
        <div class="update-section">
          <div
            class="align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm"
          >
            <div class="lh-1">
              <h1 class="h6 mb-0 text-white lh-1">
                Atualizações de Recompensa 1
              </h1>
              <small>desde 2023</small>
            </div>
          </div>

          <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Quantidade de Recompensas</th>
                <th>Data da Recompensa</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in usuariosParaListar" :key="user.id">
                <th scope="row">{{ user.id }}</th>
                <td>{{ user.rewardDates }}</td>
                <td>{{ user.dataFormatada }}</td>
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
        </div>

        <div class="update-section">
          <div
            class="align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm"
          >
            <div class="lh-1">
              <h1 class="h6 mb-0 text-white lh-1">Histórico de Saldo</h1>
              <small>desde 2023</small>
            </div>
          </div>

          <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Data da Verificação</th>
                <th>Saldo no Dia</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuario in usuariosParaListar2" :key="usuario.id">
                <td>#</td>
                <td>{{ usuario.datas }}</td>
                <td>
                  {{ usuario.values.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  }) }}
                </td>
              </tr>
            </tbody>
          </table>
          <nav aria-label="Page navigation example" class="pageNavigation">
            <ul class="pagination">
              <li class="page-item" @click="paginaAnterior2">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li
                class="page-item"
                v-for="pagina2 in totalPaginas2"
                :key="pagina2"
                :class="{ active: pagina2 === paginaAtual2 }"
              >
                <a class="page-link" href="#" @click="irParaPagina2(pagina2)">{{
                  pagina2
                }}</a>
              </li>
              <li class="page-item" @click="proximaPagina2">
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
  <footer-view />
</template>

<script>
import navBar from "@/views/navBar.vue";
import FooterView from "./FooterView.vue";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Alert from "@/utils/Alert";
import { Money3Component } from "v-money3";

export default {
  components: {
    navBar,
    FooterView,
    VMoney3: Money3Component,
  },
  name: "AboutUserView",
  data() {
    return {
      userGet: JSON.parse(localStorage.getItem("Usuario")),
      verification: localStorage.getItem("entrei"),
      userForList: [],
      userForListInHystory: [],
      paginaAtual: 1,
      paginaAtual2: 1,
      usuariosDividos: [],
      usuariosDividos2: [],
      usuariosParaListar: [],
      usuariosParaListar2: [],
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
    async getUser() {
      if(this.verification == 1){
        localStorage.setItem("entrei", 0);
        window.location.reload();
      }

      let list = [];
      let inteirador = 0;
      let list2 = [];
      let inteirador2 = 0;

      // Verifica se saldoHistory é um array antes de iterar sobre ele
      if (Array.isArray(this.userGet.user.saldoHistory.values)) {
        const datas = this.userGet.user.saldoHistory.datas;
        const values = this.userGet.user.saldoHistory.values;

        // Certifica-se de que datas e values tenham o mesmo comprimento
        if (datas.length === values.length) {
          for (let i = 0; i < datas.length; i++) {
            // Formate o valor aqui antes de adicioná-lo ao novo objeto
            const formattedValue = values[i].toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            });
            console.log(formattedValue)
            const novoObjeto = {
              id: inteirador2++,
              datas: `${datas[i].split("-")[2].slice(0, 2)}/${
                datas[i].split("-")[1]
              }/${datas[i].split("-")[0]}`,
              values: formattedValue,
            };
            list2.push(novoObjeto);
          }

          this.usuariosDividos2 = this.divisorList(list2, 7);
          this.usuariosParaListar2 =
            this.usuariosDividos2[this.paginaAtual2 - 1];
        } else {
          console.error("Datas e values não têm o mesmo comprimento");
          // Lida com a situação em que datas e values não têm o mesmo comprimento, se necessário.
        }
      } else {
        console.error("this.userGet.user.saldoHistory.values não é um array");
        // Lida com a situação em que values não é um array, se necessário.
      }

      console.log(this.userForListInHystory);
      this.userForList = this.userGet.user.fidelidade.rewardDates;
      this.userForList.forEach((element) => {
        const novoObjeto = {
          id: inteirador++, // Corrigido aqui
          rewardDates: inteirador, // Corrigido aqui
          dataFormatada: `${element.split("-")[2].slice(0, 2)}/${
            element.split("-")[1]
          }/${element.split("-")[0]}`,
        };
        list.push(novoObjeto);
        this.usuariosDividos = this.divisorList(list, 7);
        console.log(this.usuariosDividos);
        this.usuariosParaListar = this.usuariosDividos[this.paginaAtual - 1];
      });

      let data = this.userForList[0].dataFormatada;
      console.log(this.userForList);
    },

    divisorList(array, size) {
      const newArray = [];
      for (let i = 0; i < array.length; i += size) {
        newArray.push(array.slice(i, i + size));
      }
      return newArray;
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
    irParaPagina2(pagina2) {
      if (this.paginaAtual2 === pagina2)
        return console.log("Já está na página atual");
      this.usuariosParaListar2 = this.usuariosDividos2[pagina2 - 1];
      this.paginaAtual2 = pagina2;
    },
    proximaPagina2() {
      if (this.paginaAtual2 === this.totalPaginas2)
        return Alert("Já está na última página");
      this.irParaPagina2(this.paginaAtual2 + 1);
    },
    paginaAnterior2() {
      if (this.paginaAtual2 === 1) return Alert("Já está na primeira página");
      this.irParaPagina2(this.paginaAtual2 - 1);
    },
  },
  mounted() {
    this.getUser();
  },
  computed: {
    totalPaginas() {
      return Math.ceil(this.usuariosDividos.length);
    },
    totalPaginas2() {
      return Math.ceil(this.usuariosDividos2.length);
    },
  },
  created() {},
};
</script>

<style>
@import "bootstrap/dist/css/bootstrap.css";

.conteudo {
  justify-content: center;
  width: 100%;
  margin-right: 10%;
  background-color: #59c9a8;
  border-radius: 10px;
}

.tables-container {
  display: flex;
  align-items: center; /* Alinha os itens verticalmente ao centro */
  height: 100vh; /* Faz o container ter a altura total da viewport */
  margin: auto; /* Centraliza o container na página */
}

.section {
  display: flex;
}

.container-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 800px;
  height: auto;
  background-image: linear-gradient(
    315deg,
    rgb(243, 162, 137) 0%,
    #77a4e0 74%,
    #59c9a8 100%
  );
}

.align-items-center.p-3.my-3.text-white.bg-purple.rounded.shadow-sm {
  width: 600px;
}

.table.table-dark.table-striped {
  width: 600px;
}

.tables-container {
  position: fixed;
  top: 63%;
  width: 100%;
  display: inline;
  margin: 0 auto;
}

.section.d-flex {
  justify-content: center; /* Alinha os itens horizontalmente ao centro */
  margin-top: -15%;
}

.update-section {
  margin-right: 10px;
}

.pageNavigation {
  position: relative;
  top: -5%;
  width: 100%;
  display: inline;
  margin: 0 auto;
}

.update-section {
  margin-left: 10px;
}
</style>
