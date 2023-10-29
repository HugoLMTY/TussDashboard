<style>
</style>

<template>
  <div align="center">
    <h1 class="mt-10">{{ insult || `Fais toi insulter gratuitement !` }}</h1>
    <p class="text--secondary mb-10">{{ `${possibilities} possibilitées` }}</p>
    <!-- btn just like me fr -->
    <v-btn
      depressed
      outlined
      @click="setInsult"
      >
      Insulte moi
    </v-btn>
  </div>
</template>

<script>
import prefixes from './utils/prefixes.json'
import middles from './utils/middles.json'
import suffixes from './utils/suffixes.json'
export default {
  components: { },
  props: { },
  data () {
    return {
      insult: '',
      possibilities: 0
    }
  },
  computed: {},
  mounted () {
    const pre = prefixes.filter(item => item.name !== '').length
    const mid = middles.filter(item => item.name !== '').length
    const suf = suffixes.filter(item => item.name !== '').length

    this.possibilities =
    mid + // One word insuls
    ((pre * mid) + (mid * suf)) + // Two words insuls
    (pre * mid * suf) + // Three words insuls
    1 // Love
  },
  methods: {
    setInsult() {
      this.insult = this.getInsult()
    },
    getInsult() {
      //? Bypass le random pour avoir une insulte spécifique (pour les tests)
      const $rig = { rigInsult: false, pre: false, mid: false, suf: false, range: false }
      const rigged = [$rig, 4, 5, 4, 40]
      //*   rigged	=	[ useBypass, 			prefix, 		middle, 		suffix, 		range 			]

      //? Get values
      const getValue = (field) => { return field[getRand(0, field.length)] }
      const getRand = (min, max) => { return Math.floor((Math.random()) * max) + min }

      //? Get states
      const hasVowel = (string) => { return /[aeiouâéèê]/i.test(string[0]) }
      const isFemale = (word) => { return word.gender.toLowerCase() === 'female' }

      //? Format strings
      const toUpper = (string) => { return string.charAt(0).toUpperCase() + string.slice(1) }
      const format = (string) => { return string.trim().toLowerCase() }

      //? Filter arrays
      const filter = (array) => { return array.filter(item => item.name !== '').map(item => { return { ...item, name: format(item.name) } }) }

      const $prefixes = filter(prefixes)
      const $middles = filter(middles)
      const $suffixes = filter(suffixes)

      //? Ligne un peu longue pour déterminer si on utilise le rig ou non
      let pre = rigged[0].rigInsult && rigged[0].pre ? $prefixes[rigged[1]] : getValue($prefixes)
      let mid = rigged[0].rigInsult && rigged[0].mid ? $middles[rigged[2]] : getValue($middles)
      let suf = rigged[0].rigInsult && rigged[0].suf ? $suffixes[rigged[3]] : getValue($suffixes)

      //? Si il y a un article défini ou partitif, on l'accorde avec le middle
      const preEnds = pre.name.split(" ").pop()
      switch (preEnds) {
        case "de":
          if (hasVowel(mid.name)) pre.name = pre.name.replace(" de", " d'")
          break;

        case "d'":
          if (!hasVowel(mid.name)) pre.name = pre.name.replace(" d'", " de")
          break;

        // Note: Always check vowel first (too long to explain why, just trust me)
        case "le":
          if (hasVowel(mid.name)) pre.name = pre.name.replace(" le", " l'")
          if (isFemale(mid)) pre.name = pre.name.replace(" le", " la")
          break;

        case "la":
          if (hasVowel(mid.name)) pre.name = pre.name.replace(" la", " l'")
          if (!isFemale(mid)) pre.name = pre.name.replace(" la", " le")
          break;

        case "l'":
          //? ↓ Tiendrais sur un ligne ( avec un || ) mais ca serait moche et moins lisible
          if (!hasVowel(mid.name)) pre.name = pre.name.replace(" l'", " le")
          if (!isFemale(mid)) pre.name = pre.name.replace(" l'", " le")
          if (isFemale(mid)) pre.name = pre.name.replace(" l'", " la")
          break;
      }

      const range = rigged[0].range ? rigged[4] : getRand(0, 100)

      //* Range vizualization
      //? 1111111111333333333333333433333333333333333333333333333333332222222222222222222222222222222222222222

      const insultLength = range <= 10
        ? 1
        : range > 60
          ? 2
          : range !== 27
            ? 3
            : 4

      //? Ajout d'un espace si pas de lettre à apostrophe
      const $pre = `${pre.name}${pre.name.endsWith('\'') ? '' : ' '}`

      //? Assignation à la variable représentant la partie centrale, dixit le corps lui-même, la valeur de l'insulte, contenue dans un objet regroupant diverses informations sur celle-ci, au préalable formatée et accordée dans le switch un peu plus haut
      const $mid = mid.name

      //? Accord du masculin/féminin
      const $suf = `${suf.name.replace('$', mid.gender == 'female' ? 'e' : '')}`

      var insult = ''

      switch (insultLength) {
        case 1:
          insult = $mid
          break

        case 2:
          //? Varie entre prefixe / middle et middle / suffixe, pour + d'originalité
          insult = getRand(0, 10) > 5
              ? `${$pre}${$mid}`
              : `${$mid} ${$suf}`
          break

        case 3:
          insult = `${$pre}${$mid} ${$suf}`
          break

        case 4:
          //* Un peu d'amour <3
          insult = `You are worthy and I respect you`
          break
      }

      return `${toUpper(insult)}.`
    }
  }
}
</script>
