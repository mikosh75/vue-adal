<template>
  <div class="esource">
    <h1>This is an eSource page</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ali...</p>
    https://mtz1-dev.exomtrials.com/study/ESRC1/Api.php?list=patients_list_center.xml
    <!-- <div v-for="row in rows" v-bind:value="row.CENTER">{{ row.NAME }} / {{ row.PAZIENTI }}</div> -->
    {{ rows }}
    <p>
      <button v-on:click="testApiCall('https://mtz1-dev.exomtrials.com/study/ESRC1/Api.php?list=patients_list_center.xml')">Test API call</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'esource',
  data () {
    return {
      rows: []
    }
  },
  methods: {
    testApiCall(url) {
      // GET /someUrl
      this.$http.jsonp(url, {jsonpCallback: 'parseApi'}).then(response => {
        // success callback
        console.log(response.data)
        // this.rows = response.data.rows
      }, response => {
        // error callback
      });
    }
  },
  parseApi(someJson) {
    this.rows = someJson.rows
  }
}
</script>