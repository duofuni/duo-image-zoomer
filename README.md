
<p align="center"><b>一个简洁的图片放大镜</b></p>

# 目录

- [目录](#目录)
  - [快速入门](#快速入门)
    - [安装](#安装)
    - [用法](#用法)
      - [main.js 文件：](#mainjs-文件)
      - [使用：](#使用)
  - [维护者](#维护者)

## 快速入门

### 安装

```bash
$ npm i duo-image-zoomer --save             # install duo-image-zoomer 
```

### 用法

#### main.js 文件：

```js

import duoImageZoomer from 'duo-image-zoomer'

Vue.use(duoImageZoomer)

```
#### 使用：

```vue
<template>
  <div>
    <duo-image-zoomer 
      :mode="mode"
      :scale="scale"
      :width="width"
      :height="height"
      :imageList="imageList"
      :thumbnailSize="thumbnailSize"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      scale: 6, // 缩放倍数
      width: 300, // 图片宽度
      height: 300, // 图片高度
      mode: "outer", // 模式：总共2种模式：inner/outer
      thumbnailSize: 40, // 缩略图尺寸
      imageList: [ // 图片资源
        "http://tenfei05.cfp.cn/creative/vcg/veer/612/veer-316521159.jpg",
        "http://static.veer.com/veer/static/resources/FourPack/2021-05-25/4403b939d6274a869e67acaa2fa35684.jpg",
        "https://shigongbao.oss-cn-chengdu.aliyuncs.com/pictures/2020-09-08/1599535221238-tQfrTrrwOLSdhtiVBY.jpg",
        "https://shigongbao.oss-cn-chengdu.aliyuncs.com/pictures/2020-09-08/1599535213868-GDJJZizFVtepBxlXpq.jpg",
        "https://goss.cfp.cn/static/home/h2_5.png",
        "http://tenfei01.cfp.cn/creative/vcg/veer/612/veer-303762225.jpg",
        "http://d300.paixin.com/thumbs/1739009/19194001/staff_1024.jpg",
        "https://goss.cfp.cn/static/home/h2_6.png",
        "http://d300.paixin.com/thumbs/1067920/20205975/staff_1024.jpg",
      ],
    };
  },
};
</script>
```

[→ simple demo](https://duofuni.github.io/duo-image-zoomer/)

## 维护者

- [duofuni](https://github.com/duofuni)