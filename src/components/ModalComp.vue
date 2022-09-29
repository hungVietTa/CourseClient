<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{modaltitle}}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>{{modalbody}}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            {{modalcancel}}
          </button>
          <button type="button" class="btn btn-primary">{{modalconsent}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
    props:{
        modaltitle:{
            type:String,
            default:''
        },
        modalbody:{
            type:String,
             default:''
        },
        modalcancel:{
            type:String,
             default:''
        },
        modalconsent:{
            type:String,
             default:''
        }
    }
}
</script>
<style scoped>
.modal {
    display: block;
}
</style>
