<template>
  <div id="birth_notice">
    <!--<input type="file" @change="readFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">-->
    <div class="modal-title"> 축일자 엑셀 파일 업로드</div>
    <div class="modal-search-box">
      <label for="excelFile">파일 업로드 </label>
      <input type="file" name="excelFile" id="excelFile"
             @change="readFile"
             accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
      <div class="download-box" v-show="result">
        <input value="파일선택" disabled="disabled" class="upload-file-name">
        <button class="download-btn" @click="uploadFile">업로드</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { go, map, log, tap, filter } from 'ffp-js'
  import { SONGSIN } from '@/api'
  import XLSX from 'xlsx'
  export default {
    name: "BirthNotice",
    data() {
      return {
        result: null
      }
    },
    methods: {
      readFile() {
        const file = event.target.files[0]
        document.querySelector('.upload-file-name').value = file.name
        const reader = new FileReader()
        let tempResult = {}

        reader.onload = (e) => {
          let data = e.target.result
          data = new Uint8Array(data)

          let excelFile = XLSX.read(data, { type: 'array'})
          excelFile.SheetNames.forEach(function(sheetName) {
            const roa = XLSX.utils.sheet_to_json(
              excelFile.Sheets[sheetName],
              { header: 1}
            )
            if (roa.length) tempResult[sheetName] = roa
          })
          this.result = tempResult.Sheet1
        }
        reader.readAsArrayBuffer(file)
      },
      uploadFile() {
        return go(
          this.result,
          map(data => ({
            grade: data[0],
            name: data[1],
            nickname: data[2],
            month: data[3],
            day: data[4],
          })),
          filter(data => data.grade),
          data => SONGSIN.createBirth(data),
          _ => alert('축일자 파일이 업로드 되었습니다.')
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/style/mixin.scss';
  input[type="file"]{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip:rect(0,0,0,0);
    border: 0;
  }
  #birth_notice{
    @include position($p: absolute, $t: 13%, $l: 37%);
    @include box($w: 40rem, $h: 35rem, $border: 1px solid #eaecef);
    box-shadow: 1px 12px 15px rgba(0,0,0,.1);
    border-radius: 16px;
    .modal-title{
      @include font($size: 2.5rem, $weight: 400, $color: #222, $align: center);
      padding-top: 2rem;
    }
    .modal-search-box{
      margin-bottom: 10px;
      .download-box{
        text-align: center;
        input{
          @include box($padding: 1rem, $w: 20rem, $h: 3rem, $radius: 0.3rem, $border: 1px solid #ddd, $size: 0.9rem);
          &:focus{border: 1px solid #5E9B7C}
        }
        button{
          @include button($p: 1rem, $w: 5rem, $h: 3rem, $bg: #5E9B7C, $color: #fff, $radius: 0.3rem);
          border-radius: 0.3rem;
        }
      }
    }
    label{
      background: url('https://songsin-resource.s3.ap-northeast-2.amazonaws.com/image/upload-icon-white.svg');
      background-size: 80%;
      display: block;
      background-repeat: no-repeat;
      background-position: 50%;
      border-radius: 30px;
      @include button($w: 7rem, $h: 7rem, $line-h: 50px, $bg: #5E9B7C, $radius: 10rem, $size: 0);
      margin: 10rem auto;
    }
  }

</style>
