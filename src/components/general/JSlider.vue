<template>
  <div class="drag" ref="dragDiv">
    <div class="drag_bg"></div>
    <div class="drag_text">{{confirmWords}}</div>
    <div ref="moveDiv" @mousedown="mousedownFn($event)" :class="{'handler_ok_bg':confirmSuccess}"
         class="handler handler_bg"
         style="border: 0.5px solid #fff;height: 34px;position: absolute;top: 0px;left: 0px;"></div>
  </div>
</template>

<script>
  export default {
    name: 'JSlider',
    data() {
      return {
        beginClientX: 0,
        mouseMoveStata: false,
        maxwidth: '',
        confirmWords: '向右拖动滑块验证',
        confirmSuccess: false
      }
    },
    methods: {
      isSuccess() {
        return this.confirmSuccess
      },
      mousedownFn: function(e) {
        if (!this.confirmSuccess) {
          e.preventDefault && e.preventDefault()
          this.mouseMoveStata = true
          this.beginClientX = e.clientX
        }
      },
      successFunction() {
        this.confirmSuccess = true
        this.confirmWords = '验证通过'
        if (window.addEventListener) {
          document.getElementsByTagName('html')[0].removeEventListener('mousemove', this.mouseMoveFn)
          document.getElementsByTagName('html')[0].removeEventListener('mouseup', this.moseUpFn)
        } else {
          document.getElementsByTagName('html')[0].removeEventListener('mouseup', () => {
          })
        }
        document.getElementsByClassName('drag_text')[0].style.color = '#fff'
        document.getElementsByClassName('handler')[0].style.left = this.maxwidth + 'px'
        document.getElementsByClassName('drag_bg')[0].style.width = this.maxwidth + 'px'

        this.$emit('onSuccess', true)
      },
      mouseMoveFn(e) {
        if (this.mouseMoveStata) {
          const width = e.clientX - this.beginClientX
          if (width > 0 && width <= this.maxwidth) {
            document.getElementsByClassName('handler')[0].style.left = width + 'px'
            document.getElementsByClassName('drag_bg')[0].style.width = width + 'px'
          } else if (width > this.maxwidth) {
            this.successFunction()
          }
        }
      },
      moseUpFn(e) {
        this.mouseMoveStata = false
        var width = e.clientX - this.beginClientX
        if (width < this.maxwidth) {
          // ---- update-begin- author:sunjianlei --- date:20191009 --- for: 修复获取不到 handler 的时候报错 ----
          const handler = document.getElementsByClassName('handler')[0]
          if (handler) {
            handler.style.left = 0 + 'px'
            document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px'
          }
          // ---- update-end- author:sunjianlei --- date:20191009 --- for: 修复获取不到 handler 的时候报错 ----
        }
      }
    },
    mounted() {
      this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth
      document.getElementsByTagName('html')[0].addEventListener('mousemove', this.mouseMoveFn)
      document.getElementsByTagName('html')[0].addEventListener('mouseup', this.moseUpFn)
    }
  }
</script>

<style scoped>
  .drag {
    position: relative;
    background-color: #e8e8e8;
    width: 100%;
    height: 34px;
    line-height: 34px;
    text-align: center;
  }

  .handler {
    width: 40px;
    height: 32px;
    border: 1px solid #ccc;
    cursor: move;
  }

  .handler_bg {
    background: #1890FF url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAbCAYAAABvCO8sAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjgwQkI5NTEwNjc1RDExRUE5RjE0RDY0NEIzNUQyRUE1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjgwQkI5NTExNjc1RDExRUE5RjE0RDY0NEIzNUQyRUE1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODBCQjk1MEU2NzVEMTFFQTlGMTRENjQ0QjM1RDJFQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODBCQjk1MEY2NzVEMTFFQTlGMTRENjQ0QjM1RDJFQTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4RUx5cAAAAqElEQVR42mL8//8/Az0BEwOdwaiFoxaOWkiShSuA2A+P/CogdiHZRlBJgwNbAPErII7AIW8DxC+B2B+PGRiYkAJDIH4GxMk45I2A+AUQx1LLQhDWBOInQJxLQD6LWhaCsCIQ3wfiSjzyd4C4jpBZpKZSRgrlSQrSPHoEKSzRpNAj0cCyRSSebAGSD6RWtlhBII+tBmI3UiwDYcbRJsaohaMWDriFAAEGAJ1FvAWLpRWMAAAAAElFTkSuQmCC") no-repeat center;
  }

  .handler_ok_bg {
    background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;
  }

  .drag_bg {
    background-color: #7ac23c;
    height: 34px;
    width: 0px;
  }

  .drag_text {
    position: absolute;
    top: 0px;
    width: 100%;
    text-align: center;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
  }
</style>