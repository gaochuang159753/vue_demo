<template>
  <div class="table">
    <h1>Table</h1>
    <table>
      <tr>
        <th>公司名称</th>
        <th>公司地点</th>
        <th>投递状态</th>
        <th>投递渠道</th>
        <th>查看</th> 
      </tr>
      <tr v-for="work in works">
        <td>{{ work.name }}</td>
        <td>{{ work.site }}</td>
        <td>{{ work.states }}</td> 
        <td>{{ work.channel }}</td>
        <td><a :href= 'work.href'>查看</a></td>
      </tr>
    </table>
    <h1>Add</h1>
    <form action="">
      <div class="form_group">
        <label for="">公司名称</label>
        <input type="text" v-model="name">
      </div>
      <div class="form_group">
        <label for="">公司地点</label>
        <input type="text" v-model="site">
      </div>
      <div class="form_group">
        <label for="">投递状态</label>
        <input type="text" v-model="states">
      </div>
      <div class="form_group">
        <label for="">信息渠道</label>
        <input type="text" v-model="channel">
      </div>
      <div class="form_group">
        <label for="">网站链接</label>
        <input type="text" v-model="href">
      </div>

    </form>
    <button @click="ADD_LIST()" >添加</button>
  </div>
</template>

<script>
export default {
  name: 'table',
  data () {
    return {
      works: this.$store.state.activeList,
      name: '',
      site: '',
      states: '',
      channel: '',
      href: '',
    }
  },
  methods:{
    ADD_LIST(){
      var activeList = {
        name: this.name,
        site: this.site,
        states: this.states,
        channel: this.channel,
        href: this.href,
      }
      console.log(activeList)
      this.$store.state.activeList.push(activeList)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

table{
  width: 100%;
  border-radius: 4px;
  border: 1px solid #eee;
}
tr,th,td{
  height: 40px;
  line-height: 40px;
  text-align: center;
}
td{
  border-top: 1px solid #eee;
  width: 20%;
}
.form_group{
  margin-bottom: 15px;
}
label{
  width: 100px;
  text-align: right;
  line-height: 40px;
  display: inline-block;
  margin-right: 20px;
}
input{
  width: 200px;
  line-height: 30px;
  height: 30px;
  padding-left: 10px;
  font-size: 16px;
  outline: none;
}
button{
  height: 36px;
  background: #41B883;
  color: #fff;
  line-height: 36px;
  text-align: center;
  border: none;
  width: 100px;
  font-size: 16px;
  padding: 0;
}

</style>
