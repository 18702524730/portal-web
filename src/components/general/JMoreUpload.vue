<template>
  <div>
    <a-upload
      name="file"
      :multiple="false"
      :listType="listType"
      :action="uploadAction"
      :headers="headers"
      :data="{'isup':1,'bizPath':bizPath}"
      :fileList="fileList"
      :beforeUpload="beforeUpload"
      @preview="handlePreview"
      @change="handleChange"
      :disabled="disabled"
      :class="{'my-upload':myUpload}">

      <div v-if="fileList.length < fileNum">
        <a-icon type="plus"/>
        <div class="ant-upload-text">{{ text }}</div>
      </div>

    </a-upload>
    <a-modal v-if="previewVisible" :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage"/>
      <!--<video :src="previewVideo" v-else style="width: 100%"  controls="controls"></video>-->
    </a-modal>
    <pdf-preview-modal ref="pdfmodal"></pdf-preview-modal>
  </div>
</template>

<script>

  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  import PdfPreviewModal from './PdfPreviewModal'

  const FILE_TYPE_ALL = 'all'
  const uidGenerator = () => {
    return '-' + parseInt(Math.random() * 10000 + 1, 10)
  }
  const getFileName = (path) => {
    if (path.lastIndexOf('\\') >= 0) {
      const reg = new RegExp('\\\\', 'g')
      path = path.replace(reg, '/')
    }
    return path.substring(path.lastIndexOf('/') + 1)
  }
  export default {
    name: 'JMoreUpload',
    components: {
      PdfPreviewModal
    },
    data() {
      return {
        previewVisible: false,
        previewImage: '',
        isImage: false,
        uploadAction: window._CONFIG['domianURL'] + '/sys/common/upload',
        urlDownload: window._CONFIG['domianURL'] + '/sys/common/download/',
        headers: {},
        fileList: [],
        previewVideo: ''
      }
    },
    props: {
      myUpload: {
        type: Boolean,
        default: true
      },
      text: {
        type: String,
        required: false,
        default: '点击上传'
      },
      listType: {
        type: String,
        required: true,
        default: 'picture'
      },
      uploadHidden: {
        type: Boolean,
        required: false,
        default: true
      },
      fileType: {
        type: String,
        required: false,
        default: FILE_TYPE_ALL
      },
      fileSize: {
        type: String,
        required: false,
        default: '10'
      },
      fileNum: {
        type: String,
        required: false,
        default: '1'
      },
      /* 这个属性用于控制文件上传的业务路径 */
      bizPath: {
        type: String,
        required: false,
        default: 'temp'
      },
      value: {
        type: String,
        required: false
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false
      },
      multiple: {
        type: Boolean,
        required: false,
        default: false
      },
      triggerChange: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    watch: {
      value(val) {
        this.initFileList(val)
      }
    },
    created() {
      const token = Vue.ls.get(ACCESS_TOKEN)
      this.headers = { 'X-Access-Token': token }
    },

    methods: {
      handleCancel() {
        this.previewVisible = false
      },
      handlePreview(file) {
        const fileName = file.name
        const fileNames = fileName.split('.')
        const hz = fileNames[fileNames.length - 1] // 后缀名
        const fileTypes = 'jpg,JPG,bmp,BMP,jpeg,JPEG,png,PNG,gif,GIF,ico,ICO'
        const pdfTypes = 'pdf,PDF'
        // const videoTypes = 'avi,AVI,wmv,WMV,mpg,MPG,mpeg,MPEG,mov,MOV,rm,RM,ram,RAM,swf,SWF,flv,FLV,mp4,MP4'
        // if (videoTypes.indexOf(hz) > 0) {
        //   this.previewVideo = file.url || file.thumbUrl // 图片预览
        //   this.previewVisible = true
        //   this.isImage = false
        // } else
        if (fileTypes.indexOf(hz) < 0) {
          if (pdfTypes.indexOf(hz) < 0) { // pdf预览
            window.location.href = file.url // 文件下载
          } else {
            this.pdfPreview(file.url)
          }
        } else {
          this.previewImage = file.url || file.thumbUrl // 图片预览
          this.previewVisible = true
          // this.isImage = true
        }

      },

      pdfPreview: function(fileUrl) {
        const token = Vue.ls.get(ACCESS_TOKEN)
        this.headers = { 'X-Access-Token': token }
        this.$refs.pdfmodal.previewFiles(fileUrl, token)
      },

      initFileList(paths) {
        if (!paths || paths.length === 0) {
          this.fileList = []
          return
        }
        const fileList = []
        const arr = paths.split(',')
        for (let a = 0; a < arr.length; a++) {
          fileList.push({
            uid: uidGenerator(),
            name: getFileName(arr[a]),
            status: 'done',
            url: this.urlDownload + arr[a],
            response: {
              status: 'history',
              message: arr[a]
            }
          })
        }
        this.fileList = fileList
      },
      handlePathChange() {
        const uploadFiles = this.fileList
        let path = ''
        if (!uploadFiles || uploadFiles.length === 0) {
          path = ''
        }
        const arr = []

        for (var a = 0; a < uploadFiles.length; a++) {
          arr.push(uploadFiles[a].response.message)
        }
        if (arr.length > 0) {
          path = arr.join(',')
        }
        this.$emit('change', path)
      },
      beforeUpload(file) {

        const fileName = file.name
        const fileNames = fileName.split('.')
        const hz = fileNames[fileNames.length - 1] // 后缀名
        if (this.fileType !== FILE_TYPE_ALL) {
          if (this.fileType.indexOf(hz) < 0) {
            this.$message.warning('文件格式有误,请上传后缀为' + this.fileType + '的文件')
            return false
          }
        }

        if (file.size > this.fileSize * 1024 * 1024) {
          this.$message.warning('上传的文件不能大于' + this.fileSize + 'M!')
          return false
        }
        return true
      },
      handleChange(info) {
        let fileList = info.fileList
        if (info.file.status === 'uploading') {
          this.fileList = fileList
          return
        }
        if (info.file.status === 'done') {
          if (info.file.response.success) {
            fileList = fileList.map((file) => {
              if (file.response) {
                file.url = this.urlDownload + file.response.message
              }
              return file
            })
          }
          this.$message.success(`${info.file.name} 上传成功!`)
          // this.uploadHidden=false;
        } else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name} 上传失败.`)
        } else if (info.file.status === 'removed') {
          if (this.disabled) {
            return false
          }
          this.handleDelete(info.file)
        } else {
          this.handleDelete(info.file)
        }

        // if (!info.file.status||info.file.status === 'error'){
        //   // this.fileList=[];
        //   this.handlePathChange();
        // }
        if (info.file.status === 'done' || info.file.status === 'removed') {
          if (!this.disabled) {
            this.fileList = fileList
            this.handlePathChange()
          }
        }
      },
      handleDelete(file) {
        // this.uploadHidden = true;
        this.previewVisible = false
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    }
  }
</script>

<style scoped lang="less">
  .my-upload {
    width: 175px;
    /deep/ .ant-upload.ant-upload-select-picture-card {
      width: 100%;
    }
  }
</style>
