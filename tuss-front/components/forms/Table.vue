<style lang="scss" scoped>

.v-data-table {
  border-radius: 18px !important;
  overflow: hidden;

  table {

    th, td {
      border: 1px solid !important;
      border-color: $--grey-200 !important;
    }

    thead {
      th {
        &:first-child {
          border-radius: 18px 0 0 0 !important;
        }

        &:last-child {
          border-radius: 0 18px 0 0 !important;
        }
      }
  
      tr {
        background-color: $--grey-400 !important;
      }
    }
  
    tbody {
      td {
        background-color: $--grey-600;
      }

      .total {
        background-color: $--grey-400 !important;
      }
    }

  }
  .footer {
    background-color: $--grey-400 !important;
    border-radius: 0 0 18px 18px !important;
  }

}

</style>

<template>
  <v-data-table
    :headers="mappedHeaders"
    :items="mappedItems"
    class="elevation-1"
    hide-default-header
    hide-default-footer
    >
    <template #header="{ props }">
      <thead>
        <tr>
          <th v-for="head in props.headers" :key="head.text" :class="'text-' + head.align">
            {{ head.text }}
            <div v-if="head.type === 'title'">
            </div>
            <div v-else>
              aze
            </div>
          </th>
        </tr>
      </thead>
    </template>

    <template #item="{ item }">
      <tr>
        <td
          v-for="head in mappedHeaders"
          :key="head.value"
          :class="`
            text-${item.align}
            ${isTotal(head.value) ? 'bg-grey-400' : ''}
            ${item.class}`"
          >
          {{ item[head.value] }}
        </td>
      </tr>
    </template>

    <template #footer="{ props }">
      <v-data-footer
        class="footer"
        :items-per-page="props.itemsPerPage"
        :page="props.page"
        :total-items="props.totalItems"
        :options="props.options"
        :pagination="props.pagination"
      ></v-data-footer>
    </template>

  </v-data-table>
</template>


<script>
export default {
  components: { },
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    align: {
      type: String,
      default: 'center'
    },
    sortable: {
      type: Boolean,
      default: false
    },
    headerClass: {
      type: String,
      default: 'bg-grey-400 border-grey-200'
    },
    total: {
      type: String,
      default: null
    },
  },
  data () {
    return {
    }
  },
  computed: {
    mappedHeaders() {
      const h = this.headers
      const { align, sortable, headerClass } = this
      
      return h.map(h => {
        return {
          text: h.text,
          value: h.value,
          type: h.type || 'title',
          align: h.align || align,
          sortable: h.sortable || sortable,
          class: h.class || headerClass,
        }
      })
    },
    mappedItems() {
      const { align, sortable, itemClass } = this
      const i = this.items.map(i => {
        return {
          ...i,
          type: i.type || 'item',
          align: i.align || align,
          sortable: i.sortable || sortable,
          class: i.class || itemClass,
        }
      })

      if (this.total) {
        const total = {}

        this.headers.forEach((h, i) => {
          if (i === 0) {
            total[h.value] = 'Total'
          } else {
            switch (this.total) {
              case 'add':
              case 'sum':
              default:
                total[h.value] = this.items.reduce((acc, cur) => acc + parseInt(cur[h.value]), 0)
                break;
            }
          }
        })

        i.push({
          ...total,
          type: 'total',
          align: 'right',
          class: 'total',
        })
      }

      return i
    }
  },
  mounted () {
  },
  methods: {
    isTotal(header) {
      const totals = ['total', 'diff']
      return totals.some(t => header.includes(t))
    }
  }
}
</script>
