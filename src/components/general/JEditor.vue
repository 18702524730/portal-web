<template>
  <div class="tinymce-editor" id="editorId">
    <editor
      v-model="myValue"
      :init="init"
      :disabled="disabled"
      getPopupContainer="{() => document.getElementById('editorId')}"
      @onClick="onClick">
    </editor>
  </div>
</template>

<script>
  /* eslint-disable */
  import tinymce from '@/tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  import '@/tinymce/themes/silver/theme'
  import '@/tinymce/plugins/link'
  import '@/tinymce/plugins/image'
  import '@/tinymce/plugins/media'
  import '@/tinymce/plugins/table'
  import '@/tinymce/plugins/lists'
  import '@/tinymce/plugins/contextmenu'
  import '@/tinymce/plugins/wordcount'
  import '@/tinymce/plugins/colorpicker'
  import '@/tinymce/plugins/textcolor'
  import '@/tinymce/plugins/fullscreen'
  import '@/tinymce/plugins/hr'
  import '@/tinymce/plugins/preview'
  import '@/tinymce/plugins/axupimgs'
  import '@/tinymce/plugins/lineheight'
  import '@/tinymce/plugins/code'

  import { postAction } from '@/api/manage'
  export default {
    components: {
      Editor,
    },
    props: {
      value: {
        type: String,
        required:false
      },
      triggerChange:{
        type: Boolean,
        default: false,
        required:false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      plugins: {
        type: [String, Array],
        default: 'lists link image axupimgs media table textcolor wordcount contextmenu fullscreen hr preview code lineheight'
      },
      toolbar: {
        type: [String, Array],
        // default: 'undo redo | formatselect |  bold italic | foreColor backColor | fontselect | fontsizeselect   | ' +
        //     'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists link unlink image media table | removeformat | fullscreen'
        default:'bold   axupimgs fontselect  fontsizeselect foreColor backColor hr  link removeformat fullscreen undo redo preview code lineheight'
      }
    },
    data() {
      return {
        //初始化配置
        init: {
          language_url: '/tinymce/langs/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/tinymce/skins/lightgray',
          content_css: `/tinymce/skins/content/default/content.css`,
          height: 300,
          plugins: this.plugins,
          toolbar: this.toolbar,
          branding: false,
          // menubar: false,
          toolbar_drawer: false,
          fontsize_formats: "8px 10px 12px 14px 16px 18px 24px 36px",
          font_formats: "Arial=arial,helvetica,sans-serif;宋体=simsun,serif ;黑体=SimHei,sans-serif ;仿宋=FangSong,serif ;楷体=楷体,sans-serif ;隶书=隶书,serif ;幼圆=幼圆;",
          // forced_root_block:'',//p标签行高太高，此处设置为空字符串换行时去除p标签，换成<br />
          forced_root_block:'div',
          // images_upload_handler: function (blobInfo, succFun, failFun) {
          //     let xhr, formData;
          //     let file = blobInfo.blob();//转化为易于理解的file对象
          //     xhr = new XMLHttpRequest();
          //     xhr.withCredentials = false;
          //     xhr.open('POST', window._CONFIG['domianURL']+'/sys/common/upload');
          //     xhr.onload = function() {
          //         debugger;
          //         let json;
          //         if (xhr.status != 200) {
          //             failFun('HTTP Error: ' + xhr.status);
          //             return;
          //         }
          //         json = JSON.parse(xhr.responseText);
          //         if (!json || typeof json.location != 'string') {
          //             failFun('Invalid JSON: ' + xhr.responseText);
          //             return;
          //         }
          //         succFun(json.location);
          //     };
          //     formData = new FormData();
          //     formData.append('file', file, file.name );
          //     xhr.send(formData);
          // },



          images_upload_handler: (blobInfo, success, failure) => {
            uploadPic();
            var that = this;
            function uploadPic(){
              let formData = new FormData()
              if(blobInfo.file){//单图片上传
                formData.append('file', blobInfo.blob(), blobInfo.file.name);
              }else{//多图片上传
                formData.append('file', blobInfo.blob(), blobInfo.filename());
              }
              postAction(window._CONFIG['domianURL']+"/sys/common/upload", formData).then((res) => {
                if(res.success){
                  success(that.uploadAction+res.message);
                }else{
                  failure(that.uploadAction+res.message);
                }
              })
            }
          }
        },
        myValue: this.value,
        uploadAction:window._CONFIG['domianURL']+"/sys/common/download/",
        menubar: 'edit insert view format table',
        // 配置每个菜单栏的子菜单项（如下是默认配置）
        menu: {
          file: {title: 'File', items: 'newdocument'},
          edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall'},
          insert: {title: 'Insert', items: 'link media | template hr'},
          view: {title: 'View', items: 'visualaid'},
          format: {title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
          table: {title: 'Table', items: 'inserttable tableprops deletetable | cell row column'},
        },

      }
    },
    mounted() {
      tinymce.init({})
    },
    methods: {

      onClick(e) {
        this.$emit('onClick', e, tinymce)
      },
      //可以添加一些自己的自定义事件，如清空内容
      clear() {
        this.myValue = ''
      }
    },
    watch: {
      value(newValue) {
        this.myValue = (newValue == null ? '' : newValue)
      },
      myValue(newValue) {
        if(this.triggerChange){
          this.$emit('change', newValue)
        }else{
          this.$emit('input', newValue)
        }
      }
    }
  }

</script>
<style >
  .tinymce-editor .tox-tbtn--select{
    width: 50px !important;

  }
  .tox-collection__group {
    position:fixed;
    right: 0;
    bottom: 0;
  }
  .ant-notification{
    z-index: 9999999;
  }

</style>