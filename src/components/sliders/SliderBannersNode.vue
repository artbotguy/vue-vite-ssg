<template>
  <!-- <PreloadWrapNode :targetPreloadElement="!loaded"> -->
  <section class="slider-banners"
    :class="$attrs.class">
    <ContainerNode :containerStylesOff="containerStylesOff">
      <div class="slider-banners__body">
        <div class="slider-banners__items">
          <slot name="banner-category-name" />
          <ArrowsSliderNode
            v-show="banners?.length !== 0"
            :slug="slug"
          />
        </div>
        <Swiper
          v-bind="$attrs"
          :modules="modules"
          :loop="true"
          :navigation="{
            prevEl: `.${slug}__arrow_prev`,
            nextEl: `.${slug}__arrow_next`,
          }"
          :freeMode="{
            enabled: true,
            sticky: true,
          }"
          @swiper="onSwiper"
        >
          <SwiperSlide
            v-for="banner in banners"
            :key="banner.id"
            @click="$router.push('/')"
          >
            <PreloadWrapNode
              :targetPreloadElement="bannerOneMedia(banner.featured_media)"
            >
              <div class="slider-banners__image">
                <picture>
                  <source srcset=""
                    type="image/webp" >
                  <source srcset=""
                    type="image/jpeg" >
                  <img :src="bannerOneMedia(banner.featured_media)"
                    alt="" >
                </picture>
              </div>
              <slot name="banner-title"
                :banner="banner" />
            </PreloadWrapNode>
          </SwiperSlide>
        </Swiper>
      </div>
    </ContainerNode>
  </section>
  <!-- </PreloadWrapNode> -->
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { ref } from "vue";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import ArrowsSliderNode from "@/components/sliders/ArrowsSliderNode.vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
/**
 * Каждый requests.request соостветсвует экземпляру компонента
 * Баннеры запускаются по очереди так же меняются и banner_categories. Возможно использование более
 * одной banner_categories?
 * но по факту используется одна категория. Блоки вызывают запрос с разным значением banner_categories
 * по очереди. Таким образом данный компонент поддерживает единовременную загрузку заданного количества слайдов
 *
 * Баннеры и Медиафайлы загружаются исходя из необходимых ids, которые берутся не из
 * даты запросов, а из хранилища. Такой подход позволяет избежать перезаписывания локальных
 * свойств после перерисовки, из-за которой геттеры отрабатывают неправильно и шаблоны пропадают - отрисовка ломается
 */
export default {
  components: {
    Swiper,
    SwiperSlide,
    ArrowsSliderNode,
  },
  inheritAttrs: false,
  props: {
    bannerCategoryId: Number,

    slug: String,
    containerStylesOff: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const loaded = ref(false);
    const onSwiper = (swiper) => {
      loaded.value = true;
    };
    return {
      loaded,
      onSwiper,
      modules: [Navigation, Pagination, Autoplay, FreeMode],
    };
  },
  computed: {
    ...mapGetters({
      singleById: "singleById",
      itemsInclude: "itemsInclude",
      requestByParam: "requestByParam",
      mapItemsByKey: "mapItemsByKey",
      itemsMatchedByCallback: "itemsMatchedByCallback",
    }),
    ...mapState({
      bannersRequest: (state) => state.banners.basedRequest,
      mediaRequest: (state) => state.media.basedRequest,
    }),
    banners() {
      return this.itemsMatchedByCallback(
        this.bannersRequest,
        {
          banner_categories: [this.bannerCategoryId],
        },
        (banner, keys, params) => {
          let approved;
          if (banner.banner_categories[0] === params.banner_categories[0]) {
            approved = true;
          }
          return approved;
        },
      );
    },
  },
  methods: {
    ...mapActions({
      getItems: "getItems",
    }),
    ...mapMutations({
      SET_INCLUDE: "SET_INCLUDE",
      setBannerCategoriesIds: "banners/setBannerCategoriesIds",
    }),

    bannerOneMedia(value) {
      const item = this.singleById({ type: this.mediaRequest.type, id: value });
      return item.guid.rendered || "";
    },
  },
};
</script>

<style lang="scss">
.slider-banners {
  margin-bottom: 2rem;
  @media (max-width: ($md3+px)) {
    margin-bottom: 1rem;
    .slider-arrows {
      display: none;
    }
  }

  &__body {
    // padding: 2.6666666667rem 0;
    position: relative;
    @media (max-width: ($md2+px)) {
      padding: 0 0 1.6666666667rem 0;
    }
    @media (max-width: ($md3+px)) {
       padding: 0;
    }
  }

  &__image {
    cursor: pointer;
    position: relative;
    padding-bottom: 40%;
    @media (max-width: ($md3+px)) {
      padding-bottom: 55% !important;
    }
    img {
      max-width: 100%;
      object-fit: cover;
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }

  .swiper {
    padding-bottom: 2rem;
  }

  .slider-arrows {
    position: absolute;
    right: 2rem;
    bottom: 3rem;
    top: auto;
    left: auto;
  }

  .swiper-pagination {
    bottom: 0;

    // bottom: 2.6rem;
    // position: absolute;
    .swiper-pagination-bullet {
      position: relative;
      border-radius: 0;
      top: 50%;
      left: 0;
      width: 5rem;
      height: 0.13rem;

      @media (max-width: ($md3+px)) {
        width: 3rem;
      }

      &::after {
        width: 0;
        transition: width 5s;
        content: "";
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        // background-color: #d8d8d8;
      }

      &.swiper-pagination-bullet-active {
        background-color: #d8d8d8;

        &::after {
          width: 100%;
          background-color: #231f20;
        }
      }
    }
  }
}
</style>
