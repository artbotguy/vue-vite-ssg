<template>
  <header class="header header_light">
    <ContainerNode>
      <div class="header_light__body">
        <LogoNode />

        <div class="header_light__call">
          <button class="header_light__call-icon icon-call"></button>
          <div class="header_light__text">Бесплатно по России</div>
          <div class="header_light__tel">8 800 999 09 99</div>
        </div>
      </div>
    </ContainerNode>
  </header>
</template>

<script>
import LogoNode from "@/components/header/LogoNode.vue";

export default {
  components: {
    LogoNode,
  },
};
</script>

<style lang="scss">
.header_light {
  // .header_light__body
  padding: 0 !important;
  box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.1);
  border-bottom: 0.0625rem solid transparent;
  margin-bottom: 1.5rem;

  &__body {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 0;
    align-items: center;
    @media (max-width: ($md1+px)) {
      padding: 0.5rem 0;
    }
  }

  // .header_light__logo
  .logo {
    line-height: normal;

    a,
    span {
      font-size: 2.5rem !important;
      @media (max-width: ($md1+px)) {
        font-size: 1.75rem !important;
      }
    }
  }

  // .header_light__text
  &__text {
    @media (max-width: ($md2+px)) {
      display: none;
    }
  }

  // .header_light__tel
  &__tel {
    display: inline-block;
    font-size: 1.375rem;
    line-height: 1.625rem;
    color: #231f20;

    @media (max-width: ($md2+px)) {
      display: none;
    }
  }

  // .header_light__call
  &__call {
    button {
      display: none;

      @media (max-width: ($md2+px)) {
        display: inline-flex;
      }
    }
  }
  // .header_light__call-icon
  &__call-icon {
    &::before {
      font-size: 1.5rem;
    }
  }
}
</style>
