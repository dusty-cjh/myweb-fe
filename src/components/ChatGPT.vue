<template>
<!--  ChatGPT style chat flow-->

</template>

<script lang="ts" setup>
import {reactive} from 'vue'
import {ElMessage} from 'element-plus'
import axios from 'axios'

const passphraseForm = reactive({
  rootKey: 'dusty-cjh',
  subjectName: 'web',
  keyword: 'google.com',
  password: '',
})

const generatePassphrase = () => {
  let url = 'https://external.hdcjh.xyz/grpc-gateway/v1/passphrase/get-complex-password'
  axios.post(url, {
    phraseList: [passphraseForm.rootKey, passphraseForm.subjectName, passphraseForm.keyword]
  })
      .then(function (response) {
        //  get err code from response header 'Grpc-Metadata-Errcode'
        let errCode = response.headers['grpc-metadata-errcode']
        //  get err msg from header 'Grpc-Metadata-Errmsg'
        let errMsg = response.headers['grpc-metadata-errmsg']
        //  assign password from json response to passphraseForm.password
        let password = response.data.password

        //  validate response
        if (errCode != 0) {
          console.log(errMsg)
          //  show element ui error message
          let error_message = 'Error code: ' + errCode + ', ' + errMsg
          ElMessage.error(error_message)
          return
        }
        ElMessage.success('Passphrase generated successfully')
        passphraseForm.password = password
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
}

</script>

<script lang="ts">
import * as rrweb from 'rrweb'
import rrwebPlayer from 'rrweb-player'
import '~/styles/element/rrweb.scss'
import {ElMessage} from "element-plus";


let events = []
let stopRecord = null
const startRecord = () => {
  events = []
  stopRecord = rrweb.record({
    emit(event) {
      //  save event
      events.push(event)
    }
  })
  console.log('start record')
  ElMessage.success('start recording screen')
}

const saveRecord = () => {
  //  stop record
  if (stopRecord != null) {
    stopRecord()
    stopRecord = null
    console.log('stop record')
  } else {
    console.error('stopRecord is null, rrweb may not initialized')
    ElMessage.error('stopRecord is null, rrweb may not initialized')
    return
  }

  const body = JSON.stringify({events})
  console.log('save body to backend:\n' + body)
  ElMessage.success('events saved')
}

const replayWebOperations = () => {
  //  stop record
  if (events.length == 0) {
    console.error('events is empty, may not record any event')
    ElMessage.error('events is empty, may not record any event')
    return
  }

  //  replay
  const target = document.getElementById('playbback')
  if (target != null) {
    const player = new rrwebPlayer({
      target,
      props: {
        events,
        autoPlay: true,
      },
    })
  } else {
    console.error('target is null, may not found element with id `playbback`')
    ElMessage.error('target is null, may not found element with id `playbback`')
  }
}

</script>
