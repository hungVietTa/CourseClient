export default {
    methods:{
      toDash(str) {
        return str.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
    }
  }
}