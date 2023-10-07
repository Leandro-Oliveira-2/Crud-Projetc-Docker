<template>
  <footer class="navbar navbar-expand-lg navbar-dark bg-dark">
    <h3 id="txt">UM EXEMPLAR DA ESPECIE DOS CRUDS!</h3>
    <p style="color: white"><span>Snet Crud</span> &copy; 2023</p>
  </footer>
</template>


<script>
import axios from "axios";

export default {
  name: "footer",
  methods: {
    
  },
  
};
</script>



<style>
footer {
  
  bottom: 0;
  border-top: 1px solid #dec129;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 100%; /* Para ocupar toda a largura */
  background-color: aliceblue;
  margin-top: 15%;
  position: fixed;
}


h3#txt {
  color: white;
}

footer span {
  font-weight: bold;
  color: #dec129;
  font-size: 14px;
}
</style>