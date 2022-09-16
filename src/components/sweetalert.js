
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2)

export default{
    props:[
        'title',
        'Message',
        'type'
    ],
    methods:{
        alertDisplay() {
        this.$swal({
          title: `${this.title}`,
          text: `${this.Message}`,
          type: `${this.type}`,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
        })
      }
    }
}