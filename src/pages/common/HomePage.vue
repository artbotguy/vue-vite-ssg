<template>
  <MainPageNode class="home"
    :pageHeadNodeShow="false">
    <template #page-main="{ templatePage }">
      <!-- :autoplay="{ delay: 5000, disableOnInteraction: false }" -->
      <SliderBannersNode
        class="slider-banners-main"
        :bannerCategoryId="68"
        :containerStylesOff="windowWidth < 1024 ? true : false"
        slug="slider-banners-main"
        pagination
        :slides-per-view="1"
      >
        <template #banner-title="bannerTitleProps">
          <div
            class="slider-banners-main__title"
            @click="$router.push('/')"
          >
            {{ bannerTitleProps.banner.title.rendered }}
          </div>
        </template>
      </SliderBannersNode>
      <SliderProductsSectionNode
        slug="home-for-women"
        title="Для женщин"
        :productsCategoryId="20"
      />
      <SliderProductsSectionNode
        slug="home-for-men"
        title="Для мужчин"
        :productsCategoryId="22"
      />
      <SliderBannersFashionBlogNode/>
      <DistributionNode/>
      <PageContentNode
        v-if="templatePage"
        :page="templatePage"
      />
    </template>
  </MainPageNode>
</template>

<script>
import {
  mapState, mapGetters, mapMutations, mapActions,
} from "vuex";
import SliderProductsSectionNode from "@/components/sliders/SliderProductsSectionNode.vue";
import SliderBannersFashionBlogNode from "@/components/sliders/SliderBannersFashionBlogNode.vue";
import SliderBannersNode from "@/components/sliders/SliderBannersNode.vue";
import PageContentNode from "@/components/PageContentNode.vue";
import DistributionNode from "@/components/DistributionNode.vue";

export default {
  components: {
    SliderProductsSectionNode,
    SliderBannersNode,
    SliderBannersFashionBlogNode,
    PageContentNode,
    DistributionNode,
  },
  computed: {
    ...mapGetters({
      singleBySlug: "singleBySlug",
    }),
    ...mapState({
      pagesRequest: (state) => state.pages.basedRequest,
      windowWidth: (state) => state.common.windowWidth,
    }),
  },
  methods: {
    ...mapMutations({
      SET_SINGLE_PARAM: "SET_SINGLE_PARAM",
    }),
    ...mapActions({
      getSingleBySlug: "getSingleBySlug",
      updateDocTitle: "updateDocTitle",
    }),
  },
};
</script>

<style lang="scss">
// .home {
//   .page-content {
//     background-color: #f1f1f1;
//     color: #868686;

//     &__content {
//       display: grid;
//       grid-template-rows: repeat(4, auto);
//       grid-auto-flow: column;
//       column-gap: 2rem;
//       align-items: end;

//       @media (max-width: ($md2+px)) {
//         grid-template-rows: auto;
//         grid-auto-flow: row;
//       }
//     }

//     h3 {
//       font-size: 1rem !important;
//     }
//   }
// }

.slider-banners-main {
  .swiper {
    padding-bottom: 6rem;
  }

  .swiper-pagination {
    bottom: 4rem;

    @media (max-width: ($md3+px)) {
      bottom: 4.5rem;
    }
  }

  .slider-arrows {
    bottom: 10rem !important;
  }

  &__title {
    white-space: nowrap;
    cursor: pointer;
    font-size: 1.4rem;
    line-height: 2rem;
    color: #231f20;
    font-weight: 400;
    text-transform: uppercase;
    text-align: center;
    position: absolute;
    bottom: -5rem;
    left: 50%;
    transform: translate(-50%, 0);
    // @media (max-width: ($md2+px)) {
    //   font-size: 1.13rem;
    // }
    @media (max-width: ($md3+px)) {
      bottom: -3.5rem;
      line-height: 1.6rem;
      font-size: 1.2rem;
    }
  }

  .slider-banners__body {
    @media (max-width: ($md3+px)) {
      // padding: 1.3rem 0;
    }
  }

  .slider-banners {
    &__image {
      padding: 0 0 42% 0;
    }
  }
}
</style>
