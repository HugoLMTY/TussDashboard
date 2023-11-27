export { default as NavDrawer } from '../../components/global/NavDrawer.vue'
export { default as Page } from '../../components/global/Page.vue'
export { default as Section } from '../../components/global/Section.vue'
export { default as Affiche } from '../../components/Affiche.vue'
export { default as FormsButton } from '../../components/forms/Button.vue'
export { default as FormsCard } from '../../components/forms/Card.vue'
export { default as FormsTable } from '../../components/forms/Table.vue'
export { default as HomeLanding } from '../../components/home/Landing.vue'
export { default as HomeLinks } from '../../components/home/Links.vue'
export { default as HomeProjects } from '../../components/home/Projects.vue'
export { default as HomeLandingCactus } from '../../components/home/landing/Cactus.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
