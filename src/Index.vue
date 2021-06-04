<template>
  <div class="duo-image-zoomer">
    <div ref="duoZoomer" class="image-zoomer-wrap">
      <img alt="duo-image-zoomer" class="origin-image" :src="currentImageUrl" />
      <div class="zoomer-inner" v-if="mode == 'inner'">
        <div ref="duoZoomerLens" v-show="isShowZoomer" class="zoomer-viewer">
          <img
            alt="duo-image-zoomer"
            ref="duoZoomerImage"
            :src="currentImageUrl"
            class="zoomer-viewer-image"
          />
        </div>
      </div>
      <div class="zoomer-outer" v-else>
        <span
          ref="duoZoomerLens"
          class="zoomer-lens"
          v-show="isShowZoomer"
        ></span>
        <div ref="duoZoomerViewer" class="zoomer-viewer" v-show="isShowZoomer">
          <img
            alt="duo-image-zoomer"
            ref="duoZoomerImage"
            :src="currentImageUrl"
            class="zoomer-viewer-image"
          />
        </div>
      </div>
    </div>
    <div class="zoomer-thumbnail" ref="zoomerThumbnail">
      <span
        class="zoomer-thumbnail-control zoomer-thumbnail-prev"
        data-thumbnail-action="prev"
      ></span>
      <div ref="zoomerThumbnailList" class="zoomer-thumbnail-list">
        <ul>
          <li
            v-for="(item, i) in imageList"
            :key="i"
            :class="`${currentIndex == i ? 'item current' : 'item'}`"
          >
            <img
              alt="duo-image-zoomer"
              :src="item"
              class="zoomer-thumbnail-image"
              :data-thumbnail-action="`switch-${i}`"
            />
          </li>
        </ul>
      </div>
      <span
        class="zoomer-thumbnail-control zoomer-thumbnail-next"
        data-thumbnail-action="next"
      ></span>
    </div>
  </div>
</template>

<script>
import "./style/css/index.css";
export default {
  props: {
    scale: {
      type: Number,
      default: 2,
    },
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 300,
    },
    imageList: {
      type: Array,
      default: [],
    },
    mode: {
      type: String,
      default: "inner",
    },
    thumbnailWidth: {
      type: Number,
      default: 40,
    },
  },
  name: "ImageZoomer",
  data() {
    return {
      currentIndex: 0,
      isShowZoomer: false,
      duoImageZoomerWidth: this.width,
      duoImageZoomerHeight: this.height,
    };
  },
  computed: {
    currentImageUrl() {
      return this.imageList[this.currentIndex];
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    // Init global
    init() {
      let duoZoomer = this.$refs["duoZoomer"],
        duoZoomerLens = this.$refs["duoZoomerLens"],
        duoZoomerImage = this.$refs["duoZoomerImage"],
        zoomerThumbnail = this.$refs["zoomerThumbnail"],
        zoomerThumbnailList = this.$refs["zoomerThumbnailList"];
      this.initSizeFn({
        duoZoomer,
        duoZoomerLens,
        duoZoomerImage,
        zoomerThumbnail,
        zoomerThumbnailList,
      });
      this.initEventFn({
        duoZoomer,
        duoZoomerLens,
        duoZoomerImage,
        zoomerThumbnail,
      });
    },
    // Init event
    initEventFn({ duoZoomer, duoZoomerLens, duoZoomerImage, zoomerThumbnail }) {
      zoomerThumbnail.addEventListener("click", this.clickAgentFn());

      duoZoomer.addEventListener("mouseover", this.zoomerSwitchFn(true));

      duoZoomer.addEventListener(
        "mousemove",
        this.zoomerInteractiveFn({
          duoZoomer,
          duoZoomerLens,
          duoZoomerImage,
        })
      );

      duoZoomer.addEventListener("mouseout", this.zoomerSwitchFn(false));
    },
    // Init element size
    initSizeFn({
      duoZoomer,
      duoZoomerLens,
      duoZoomerImage,
      zoomerThumbnail,
      zoomerThumbnailList,
    }) {
      const [ul] = zoomerThumbnailList.childNodes;

      ul.childNodes.forEach((item) => {
        this.setStyleByNameFn(item, "width", `${this.thumbnailWidth}px`);
        this.setStyleByNameFn(item, "height", `${this.thumbnailWidth}px`);
      });
      this.setStyleByNameFn(
        ul,
        "width",
        `${ul.childNodes.length * (this.thumbnailWidth + 10)}px`
      );
      this.setStyleByNameFn(
        zoomerThumbnailList,
        "width",
        `${this.duoImageZoomerWidth - this.thumbnailWidth}px`
      );

      this.setStyleByNameFn(
        zoomerThumbnail,
        "width",
        `${this.duoImageZoomerWidth}px`
      );
      this.setStyleByNameFn(
        zoomerThumbnail,
        "height",
        `${this.thumbnailWidth + 5}px`
      );

      this.setStyleByNameFn(
        duoZoomer,
        "width",
        `${this.duoImageZoomerWidth}px`
      );
      this.setStyleByNameFn(
        duoZoomer,
        "height",
        `${this.duoImageZoomerHeight}px`
      );

      this.setStyleByNameFn(
        duoZoomerLens,
        "width",
        `${this.duoImageZoomerWidth / this.scale}px`
      );
      this.setStyleByNameFn(
        duoZoomerLens,
        "height",
        `${this.duoImageZoomerHeight / this.scale}px`
      );

      this.setStyleByNameFn(
        duoZoomerImage,
        "width",
        `${this.scale * this.duoImageZoomerWidth}px`
      );
      this.setStyleByNameFn(
        duoZoomerImage,
        "height",
        `${this.scale * this.duoImageZoomerHeight}px`
      );
    },
    // Set move
    moveFn(direction) {
      let zoomerThumbnailList = this.$refs["zoomerThumbnailList"],
        $direction = direction == "prev" ? "" : "-",
        clientWidth = zoomerThumbnailList.clientWidth,
        [ul] = zoomerThumbnailList.childNodes,
        [width] = this.getStyleByNameFn(ul, "width").split("px"),
        [currentLeft] = this.getStyleByNameFn(ul, "left").split("px");

      if (direction == "prev" && currentLeft == 0) return;
      if (direction == "next" && width - Math.abs(currentLeft) < clientWidth)
        return;

      this.setStyleByNameFn(
        ul,
        "left",
        `${currentLeft * 1 + ($direction + clientWidth) * 1}px`
      );
    },
    // Bind event agent
    clickAgentFn() {
      let $this = this;
      return function (e) {
        let action = e.target.getAttribute("data-thumbnail-action");
        switch (action) {
          case "prev":
            $this.moveFn("prev");
            break;
          case "next":
            $this.moveFn("next");
            break;
          default:
            $this.$nextTick(() => {
              action && ($this.currentIndex = action.split("-")[1]);
            });
            break;
        }
      };
    },
    // Get style by name
    getStyleByNameFn(obj, type) {
      return window.getComputedStyle(obj, null)[type];
    },
    // Set style by name
    setStyleByNameFn(obj, key, value) {
      obj && (obj.style[key] = value);
    },
    // Set switch of zoomer
    zoomerSwitchFn(isShowZoomer) {
      return () => {
        this.$nextTick(() => {
          this.isShowZoomer = isShowZoomer;
        });
      };
    },
    // Mousemove action
    zoomerInteractiveFn({ duoZoomer, duoZoomerLens, duoZoomerImage }) {
      let $this = this,
        scale = this.scale,
        isInnerMode = this.mode == "inner";

      return function (e) {
        e = e || window.event;
        let x = isInnerMode
            ? e.clientX - duoZoomerLens.clientWidth / scale - this.offsetLeft
            : e.clientX - duoZoomer.offsetLeft - duoZoomerLens.offsetWidth / 2,
          y = isInnerMode
            ? e.clientY - duoZoomerLens.clientHeight / scale - this.offsetTop
            : e.clientY - duoZoomer.offsetTop - duoZoomerLens.offsetHeight / 2;

        x <= 0 && (x = 0);
        y <= 0 && (y = 0);

        x >= duoZoomer.clientWidth - duoZoomerLens.clientWidth &&
          (x = duoZoomer.clientWidth - duoZoomerLens.clientWidth);

        y >= duoZoomer.clientHeight - duoZoomerLens.clientHeight &&
          (y = duoZoomer.clientHeight - duoZoomerLens.clientHeight);

        $this.setStyleByNameFn(duoZoomerLens, "left", `${x}px`);
        $this.setStyleByNameFn(duoZoomerLens, "top", `${y}px`);

        let marginLeft = isInnerMode
            ? -duoZoomerLens.offsetLeft * scale - x
            : -x * scale,
          marginTop = isInnerMode
            ? -duoZoomerLens.offsetTop * scale - y
            : -y * scale;

        $this.setStyleByNameFn(duoZoomerImage, "marginLeft", `${marginLeft}px`);
        $this.setStyleByNameFn(duoZoomerImage, "marginTop", `${marginTop}px`);
      };
    },
  },
};
</script>
 
<style >
</style>
