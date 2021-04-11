import axios from 'axios';
import qs from 'qs';
import Vuex, { mapState, mapActions } from 'vuex';
import Vue from 'vue';
import VueDraggable from 'vuedraggable';

//
var script = {
  name: "VueTableHeading",

  data() {
    return {
      direction: null
    };
  },

  props: {
    column: {
      type: Object,
      required: true,
      validator: function (value) {
        return Object.prototype.hasOwnProperty.call(value, 'name') && Object.prototype.hasOwnProperty.call(value, 'title') && Object.prototype.hasOwnProperty.call(value, 'sortable');
      }
    }
  },
  computed: {
    sortIcon: function () {
      switch (this.direction) {
        case 'asc':
          return 'fa-sort-up';

        case 'desc':
          return 'fa-sort-down';

        default:
          return 'fa-sort';
      }
    },
    ...mapState('sortingModule', ['sorting'])
  },
  methods: {
    setOrder() {
      this.direction = this.direction == null ? 'asc' : this.direction === 'asc' ? 'desc' : null;
      this.addSort({
        column: this.column.name,
        direction: this.direction
      });
    },

    extractDirectionFromSorting() {
      let column = this.sorting.filter(sort => sort.column == this.column.name);
      return column[0] ? column[0].direction : null;
    },

    ...mapActions('sortingModule', {
      addSort: 'addSortAction'
    })
  },

  mounted() {
    if (this.sortable) {
      this.direction = this.extractDirectionFromSorting();
    }
  }

};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return !_vm.column.sortable ? _c('span', [_vm._v("\n    " + _vm._s(_vm.column.title) + "\n")]) : _c('a', {
    attrs: {
      "role": "button",
      "href": "#"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.setOrder($event);
      }
    }
  }, [_vm._v("\n    " + _vm._s(_vm.column.title) + "\n\n    "), _c('i', {
    staticClass: "fas fa-fw",
    class: _vm.sortIcon
  })]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

//
var script$1 = {
  name: "VueTableSearchBar",

  data() {
    return {
      lang: this.$parent.lang
    };
  },

  methods: { ...mapActions('searchModule', {
      setValue: 'setValueAction'
    })
  },
  computed: { ...mapState('searchModule', ['value'])
  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "input-group"
  }, [_vm._m(0), _vm._v(" "), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "placeholder": _vm.lang.search_for
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": function ($event) {
        return _vm.setValue($event.target.value);
      }
    }
  })]);
};

var __vue_staticRenderFns__$1 = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "input-group-prepend"
  }, [_c('div', {
    staticClass: "input-group-text"
  }, [_c('i', {
    staticClass: "fas fa-search"
  })])]);
}];
/* style */

const __vue_inject_styles__$1 = undefined;
/* scoped */

const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

//
var script$2 = {
  name: "VueTablePagination",

  data() {
    return {
      selectedItemsPerPage: null
    };
  },

  props: {
    perPageOptions: {
      type: Array,

      default() {
        return [20, 50, 100];
      }

    },
    items: {
      type: Number,
      default: 0,
      validator: value => {
        return value >= 0;
      }
    },
    maxLinks: {
      type: Number,
      default: 5,
      validator: value => {
        return value > 0;
      }
    }
  },
  methods: { ...mapActions('paginationModule', {
      setPage: 'setPageAction'
    }),
    ...mapActions('itemsPerPageModule', {
      setItemsPerPage: 'setItemsPerPageAction'
    })
  },
  computed: {
    start: function () {
      return (this.page - 1) * this.itemsPerPage + 1;
    },
    end: function () {
      let end = this.start + this.itemsPerPage - 1;
      return this.items < end ? this.items : end;
    },
    totalPages: function () {
      return Math.ceil(this.items / this.itemsPerPage);
    },
    linkButtons: function () {
      let linksSpan = this.linksSpan;
      let pages = [];

      for (let p = linksSpan.lower; p <= linksSpan.higher; p++) {
        pages.push(p);
      }

      return pages;
    },
    linksSpan: function () {
      const span = Math.floor(this.maxLinks / 2);
      let lowerBound = this.page - span;
      let lowerOverflow = lowerBound < 0 ? Math.abs(lowerBound) + 1 : 0;
      let higherBound = this.page + span;
      let higherOverflow = higherBound > this.totalPages ? higherBound - this.totalPages : 0; // Correct overflows

      lowerBound += lowerOverflow;
      higherBound -= higherOverflow; // Correct bounds

      lowerBound -= higherOverflow;
      lowerBound += lowerBound < 1 ? 1 + Math.abs(lowerBound) : 0;
      higherBound += lowerOverflow;
      higherBound -= higherBound > this.totalPages ? higherBound - this.totalPages : 0;
      return {
        lower: lowerBound,
        higher: higherBound
      };
    },
    ...mapState('paginationModule', ['page']),
    ...mapState('itemsPerPageModule', ['itemsPerPage'])
  },

  mounted() {
    this.selectedItemsPerPage = this.itemsPerPage;
  }

};

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('nav', {
    staticClass: "row align-items-center mt-5"
  }, [_c('div', {
    staticClass: "col-auto"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.selectedItemsPerPage,
      expression: "selectedItemsPerPage"
    }],
    staticClass: "custom-select",
    on: {
      "change": [function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.selectedItemsPerPage = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }, function ($event) {
        return _vm.setItemsPerPage($event.target.value);
      }]
    }
  }, _vm._l(_vm.perPageOptions, function (perPageOption) {
    return _c('option', {
      key: "perPageOptions" + perPageOption,
      domProps: {
        "value": perPageOption
      }
    }, [_vm._v(_vm._s(perPageOption) + "\n            ")]);
  }), 0)]), _vm._v(" "), _c('div', {
    staticClass: "col"
  }, [_vm._v("\n        Showing " + _vm._s(_vm.start) + " - " + _vm._s(_vm.end) + " of " + _vm._s(_vm.items) + "\n    ")]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-auto mt-4 mt-sm-0"
  }, [_vm.totalPages > 1 ? _c('ul', {
    staticClass: "pagination mb-0"
  }, [_vm.page != 1 ? [_c('li', {
    staticClass: "page-item"
  }, [_c('a', {
    staticClass: "page-link",
    attrs: {
      "href": "#",
      "aria-label": "First"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.setPage(1);
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-backward"
  }), _vm._v(" "), _c('span', {
    staticClass: "sr-only"
  }, [_vm._v("First")])])]), _vm._v(" "), _c('li', {
    staticClass: "page-item"
  }, [_c('a', {
    staticClass: "page-link",
    attrs: {
      "href": "#",
      "aria-label": "Previous"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.setPage(_vm.page - 1);
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-caret-left"
  }), _vm._v(" "), _c('span', {
    staticClass: "sr-only"
  }, [_vm._v("Previous")])])])] : _vm._e(), _vm._v(" "), _vm._l(_vm.linkButtons, function (linkButton, index) {
    return _c('li', {
      key: index,
      staticClass: "page-item",
      class: {
        'active': linkButton == _vm.page
      }
    }, [_c('a', {
      staticClass: "page-link",
      attrs: {
        "href": "#"
      },
      on: {
        "click": function ($event) {
          $event.preventDefault();
          return _vm.setPage(linkButton);
        }
      }
    }, [_vm._v(_vm._s(linkButton))])]);
  }), _vm._v(" "), _vm.page != _vm.totalPages ? [_c('li', {
    staticClass: "page-item"
  }, [_c('a', {
    staticClass: "page-link",
    attrs: {
      "href": "#",
      "aria-label": "Next"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.setPage(_vm.page + 1);
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-caret-right"
  }), _vm._v(" "), _c('span', {
    staticClass: "sr-only"
  }, [_vm._v("Next")])])]), _vm._v(" "), _c('li', {
    staticClass: "page-item"
  }, [_c('a', {
    staticClass: "page-link",
    attrs: {
      "href": "#",
      "aria-label": "Last"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.setPage(_vm.totalPages);
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-forward"
  }), _vm._v(" "), _c('span', {
    staticClass: "sr-only"
  }, [_vm._v("Last")])])])] : _vm._e()], 2) : _vm._e()])]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = undefined;
/* scoped */

const __vue_scope_id__$2 = undefined;
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

const filtersStorageName = `vue_table_${window.location.pathname}_filters`;
let filters = window.localStorage.getItem(filtersStorageName);
const filtersModule = {
  namespaced: true,
  state: {
    filters: filters ? JSON.parse(filters) : []
  },
  mutations: {
    /**
     * Adds a filter to the store.
     *
     * @param state
     * @param newFilter
     */
    addFilter(state, newFilter) {
      // If a filter with this key already exists, it must be removed from the array.
      state.filters = state.filters.filter(filter => filter.column != newFilter.column);

      if (newFilter.values.length) {
        state.filters.push(newFilter);
      }
    },

    /**
     * Saves the data into local storage.
     *
     * @param state
     */
    saveData(state) {
      window.localStorage.setItem(filtersStorageName, JSON.stringify(state.filters));
    }

  },
  actions: {
    /**
     * The action of adding a filter.
     *
     * @param commit
     * @param filter
     */
    addFilterAction({
      commit
    }, filter) {
      commit('addFilter', filter);
      commit('saveData');
    }

  }
};

const paginationStorageName = `vue_table_${window.location.pathname}_page`;
let page = window.localStorage.getItem(paginationStorageName);
const paginationModule = {
  namespaced: true,
  state: {
    page: page ? parseInt(page) : 1
  },
  mutations: {
    /**
     * Sets the page number.
     *
     * @param state
     * @param page
     */
    setPage(state, page) {
      state.page = page;
    },

    /**
     * Saves the data into local storage.
     *
     * @param state
     */
    saveData(state) {
      window.localStorage.setItem(paginationStorageName, state.page);
    }

  },
  actions: {
    /**
     * The action of setting a page.
     *
     * @param commit
     * @param page
     */
    setPageAction({
      commit
    }, page) {
      commit('setPage', page);
      commit('saveData');
    }

  }
};

const paginationStorageName$1 = `vue_table_${window.location.pathname}_items_per_page`;
let itemsPerPage = window.localStorage.getItem(paginationStorageName$1);
const itemsPerPageModule = {
  namespaced: true,
  state: {
    itemsPerPage: itemsPerPage ? parseInt(itemsPerPage) : 20
  },
  mutations: {
    /**
     * Sets the amount of items displayed per page.
     *
     * @param state
     * @param itemsPerPage
     */
    setItemsPerPage(state, itemsPerPage) {
      state.itemsPerPage = itemsPerPage;
    },

    /**
     * Saves the data into local storage.
     *
     * @param state
     */
    saveData(state) {
      window.localStorage.setItem(paginationStorageName$1, state.itemsPerPage);
    }

  },
  actions: {
    /**
     * The action of setting the amount of items displayed per page.
     *
     * @param commit
     * @param itemsPerPage
     */
    setItemsPerPageAction({
      commit
    }, itemsPerPage) {
      commit('setItemsPerPage', itemsPerPage);
      commit('saveData');
    }

  }
};

const searchStorageName = `vue_table_${window.location.pathname}_search`;
let value = window.localStorage.getItem(searchStorageName);
const searchModule = {
  namespaced: true,
  state: {
    value: value !== null && value !== void 0 ? value : ''
  },
  mutations: {
    /**
     * Sets the value.
     *
     * @param state
     * @param value
     */
    setValue(state, value) {
      state.value = value;
    },

    /**
     * Saves the data into local storage.
     *
     * @param state
     */
    saveData(state) {
      window.localStorage.setItem(searchStorageName, state.value);
    }

  },
  actions: {
    /**
     * The action of setting the value tha will be searched.
     *
     * @param commit
     * @param value
     */
    setValueAction({
      commit
    }, value) {
      commit('setValue', value);
      commit('saveData');
    }

  }
};

const sortingStorageName = `vue_table_${window.location.pathname}_sorting`;
let sorting = window.localStorage.getItem(sortingStorageName);
const sortingModule = {
  namespaced: true,
  state: {
    sorting: sorting ? JSON.parse(sorting) : []
  },
  mutations: {
    /**
     * Adds a sort to the store.
     *
     * @param state
     * @param newSorting
     */
    addSort(state, newSort) {
      // If a sorting with this key already exists, it must be removed from the array.
      state.sorting = state.sorting.filter(sort => sort.column != newSort.column);
      state.sorting.push(newSort);
    },

    /**
     * Saves the data into local storage.
     *
     * @param state
     */
    saveData(state) {
      window.localStorage.setItem(sortingStorageName, JSON.stringify(state.sorting));
    }

  },
  actions: {
    /**
     * The action of adding a sorting.
     *
     * @param commit
     * @param sorting
     */
    addSortAction({
      commit
    }, sort) {
      commit('addSort', sort);
      commit('saveData');
    }

  }
};

Vue.use(Vuex);
var store = new Vuex.Store({
  modules: {
    filtersModule,
    paginationModule,
    itemsPerPageModule,
    searchModule,
    sortingModule
  }
});

var script$3 = {
  store,
  name: "VueTable",
  components: {
    VueTableHeading: __vue_component__,
    VueDraggable,
    VueTablePagination: __vue_component__$2,
    VueTableSearchBar: __vue_component__$1
  },
  data: function () {
    return {
      items: [],
      selectedItems: [],
      lang: {
        "no_records": "No records found!",
        "search_for": "Search for..."
      },
      totalItems: 0
    };
  },
  props: {
    actions: {
      type: Object,
      default: function () {
        return {
          classes: "",
          slots: []
        };
      },
      validator: function (actions) {
        return Object.prototype.hasOwnProperty.call(actions, 'slots') && typeof actions.slots === "object";
      }
    },
    columns: {
      type: Array,
      default: function () {
        return [];
      }
    },
    dataKey: {
      type: String,
      default: 'data'
    },
    locale: {
      type: String,
      default: 'en'
    },
    metaKey: {
      type: String,
      default: null
    },
    orderable: {
      type: Boolean,
      default: false
    },
    checkable: {
      type: Object,
      default: function () {
        return {
          display: false,
          attribute: null
        };
      },
      validator: function (checkable) {
        return Object.prototype.hasOwnProperty.call(checkable, 'display') && Object.prototype.hasOwnProperty.call(checkable, 'attribute');
      }
    },
    paginate: {
      type: Boolean,
      default: true
    },
    perPage: {
      type: Number,
      default: null,
      validator: function (value) {
        return value > 0;
      }
    },
    sorting: {
      type: Array,
      default: function () {
        return [];
      }
    },
    uri: {
      type: String,
      default: null
    }
  },
  methods: {
    /**
     * Get the items from storage.
     *
     * @param extraParams
     * @returns {Promise<AxiosResponse<T>>}
     */
    getItems(extraParams = {}) {
      const axios$1 = axios;

      const qs$1 = qs;

      let options = {
        params: {
          columns: this.columns,
          page: this.page,
          filters: this.filters,
          perPage: this.itemsPerPage,
          search: this.search,
          sorting: this.currentSorting,
          extraParams: extraParams
        },
        paramsSerializer: function (params) {
          return qs$1.stringify(params);
        }
      };
      return axios$1.get(this.uri, options).then(response => {
        var _ref;

        if (Object.prototype.hasOwnProperty.call(response.data, this.dataKey)) {
          this.items = response.data[this.dataKey];
        }

        this.totalItems = (_ref = this.metaKey != null ? response.data[this.metaKey].total : response.data.total) !== null && _ref !== void 0 ? _ref : this.items.length;
        this.$emit('update:items', this.items);
      });
    },

    /**
     * Returns the searchable columns
     *
     * @return {array}
     */
    getSearchableColumns() {
      return this.columns.filter(column => column.searchable);
    },

    /**
     * Checks whether the columns contain all the necessary properties
     * and whether these properties have been initialized correctly.
     */
    hydrateColumns() {
      this.columns.forEach(column => {
        // Set name defaults
        if (!Object.prototype.hasOwnProperty.call(column, 'name')) {
          column.name = null;
        } // Set title defaults


        if (!Object.prototype.hasOwnProperty.call(column, 'title')) {
          column.title = '';
        } // Set sortable defaults


        if (!Object.prototype.hasOwnProperty.call(column, 'sortable') || typeof column.sortable !== 'boolean') {
          column.sortable = true;
        } // Set visibility defaults


        if (!Object.prototype.hasOwnProperty.call(column, 'visible')) {
          column.visible = true;
        }
      });
    },

    /**
     * Toggles the selected items.
     */
    toggleVueTableCheckables(event) {
      if (event.target.checked) {
        this.selectedItems = this.items.map(item => item[this.checkable.attribute]);
      } else {
        this.selectedItems = [];
      }
    },

    ...mapActions('sortingModule', {
      addSort: 'addSortAction'
    }),
    ...mapActions('paginationModule', {
      setPage: 'setPageAction'
    }),
    ...mapActions('itemsPerPageModule', {
      setItemsPerPage: 'setItemsPerPageAction'
    }),
    ...mapActions('filtersModule', {
      setFilter: 'addFilterAction'
    })
  },
  computed: {
    /**
     * Checks whether the search form should be displayed. The form will
     * be displayed if there is at least one searchable column.
     *
     * @returns {boolean}
     */
    isSearchable: function () {
      return this.getSearchableColumns().length > 0;
    },

    /**
     * Scope the columns to only include the ones that are visible.
     *
     * @returns {*}
     */
    visibleColumns: function () {
      return this.columns.filter(column => column.visible);
    },
    ...mapState('filtersModule', ['filters']),
    ...mapState('sortingModule', {
      currentSorting: 'sorting'
    }),
    ...mapState('searchModule', {
      search: 'value'
    }),
    ...mapState('paginationModule', ['page']),
    ...mapState('itemsPerPageModule', ['itemsPerPage'])
  },
  watch: {
    itemsPerPage: function () {
      this.getItems();
    },
    page: function () {
      this.getItems();
    },
    currentSorting: function () {
      this.getItems();
    },
    search: function () {
      this.setPage(1);
      this.getItems();
    },
    filters: function () {
      this.setPage(1);
      this.getItems();
    }
  },

  created() {
    this.hydrateColumns();
  },

  mounted() {
    // If the perPage prop was used, let's override the local storage
    // and set the items per page on the pagination module
    if (this.perPage !== null) {
      this.setItemsPerPage(this.perPage);
    } // Dispatch the sorting prop values


    this.sorting.forEach(sort => this.addSort(sort)); // Register events

    this.$root.$on('filterOptionSelected', this.setFilter);

    if (this.uri !== null) {
      this.getItems();
    }
  }

};

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('div', {
    staticClass: "card mb-4"
  }, [_c('div', {
    staticClass: "card-body"
  }, [_c('div', {
    staticClass: "form-row"
  }, [_vm._t("filters"), _vm._v(" "), _c('div', {
    staticClass: "col"
  }, [_vm.isSearchable ? _c('vue-table-search-bar') : _vm._e()], 1)], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "card"
  }, [_c('div', {
    staticClass: "card-body"
  }, [_vm._t("header", null, {
    "table": this
  }), _vm._v(" "), _vm.items.length === 0 ? _c('div', {
    staticClass: "alert alert-info"
  }, [_vm._v("\n                " + _vm._s(_vm.lang.no_records) + "\n            ")]) : _c('div', [_c('div', {
    staticClass: "table-responsive"
  }, [_c('table', {
    staticClass: "table table-striped"
  }, [_c('thead', [_c('tr', [_vm.orderable ? _c('th', {
    staticClass: "fit-content"
  }) : _vm._e(), _vm._v(" "), _vm.checkable.display ? _c('th', {
    staticClass: "fit-content"
  }, [_c('div', {
    staticClass: "custom-control custom-checkbox"
  }, [_c('input', {
    staticClass: "custom-control-input",
    attrs: {
      "type": "checkbox",
      "id": "vueTableCheckableAll" + _vm._uid
    },
    on: {
      "change": _vm.toggleVueTableCheckables
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "custom-control-label",
    attrs: {
      "for": "vueTableCheckableAll" + _vm._uid
    }
  })])]) : _vm._e(), _vm._v(" "), _vm._l(_vm.visibleColumns, function (column) {
    return _c('th', {
      key: column.name,
      class: column.headerClasses
    }, [_c('vue-table-heading', {
      attrs: {
        "column": column
      }
    })], 1);
  }), _vm._v(" "), _vm.actions.slots.length ? _c('th') : _vm._e()], 2)]), _vm._v(" "), _c('vue-draggable', {
    attrs: {
      "tag": "tbody",
      "handle": ".v-table-drag-handle",
      "disabled": !_vm.orderable
    },
    on: {
      "change": function ($event) {
        return _vm.$emit('itemsReordered', $event.moved.element, $event.moved.newIndex);
      }
    },
    model: {
      value: _vm.items,
      callback: function ($$v) {
        _vm.items = $$v;
      },
      expression: "items"
    }
  }, _vm._l(_vm.items, function (item, index) {
    return _c('tr', {
      key: index
    }, [_vm.orderable ? _c('td', {
      staticClass: "fit-content align-middle"
    }, [_c('button', {
      staticClass: "btn btn-sm v-table-drag-handle",
      attrs: {
        "type": "button"
      }
    }, [_c('i', {
      staticClass: "fas fa-arrows-alt-v"
    })])]) : _vm._e(), _vm._v(" "), _vm.checkable.display ? _c('td', {
      staticClass: "fit-content align-middle"
    }, [_c('div', {
      staticClass: "custom-control custom-checkbox"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.selectedItems,
        expression: "selectedItems"
      }],
      staticClass: "custom-control-input",
      attrs: {
        "type": "checkbox",
        "id": "vueTableCheckable" + _vm._uid + "_" + item[_vm.checkable.attribute]
      },
      domProps: {
        "value": item[_vm.checkable.attribute],
        "checked": Array.isArray(_vm.selectedItems) ? _vm._i(_vm.selectedItems, item[_vm.checkable.attribute]) > -1 : _vm.selectedItems
      },
      on: {
        "change": function ($event) {
          var $$a = _vm.selectedItems,
              $$el = $event.target,
              $$c = $$el.checked ? true : false;

          if (Array.isArray($$a)) {
            var $$v = item[_vm.checkable.attribute],
                $$i = _vm._i($$a, $$v);

            if ($$el.checked) {
              $$i < 0 && (_vm.selectedItems = $$a.concat([$$v]));
            } else {
              $$i > -1 && (_vm.selectedItems = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _vm.selectedItems = $$c;
          }
        }
      }
    }), _vm._v(" "), _c('label', {
      staticClass: "custom-control-label",
      attrs: {
        "for": "vueTableCheckable" + _vm._uid + "_" + item[_vm.checkable.attribute]
      }
    })])]) : _vm._e(), _vm._v(" "), _vm._l(_vm.visibleColumns, function (column, index) {
      return _c('td', {
        key: index,
        class: column.rowClasses
      }, [column.render && typeof column.render === 'function' ? [_c('div', {
        domProps: {
          "innerHTML": _vm._s(column.render(item))
        }
      })] : column.slotName ? [_vm._t(column.slotName, null, {
        "item": item
      })] : column.name ? [_vm._v("\n                                        " + _vm._s(item[column.name]) + "\n                                    ")] : _vm._e()], 2);
    }), _vm._v(" "), _vm.actions.slots.length ? _c('td', {
      staticClass: "fit-content align-middle",
      class: _vm.actions.classes
    }, [_vm._l(_vm.actions.slots, function (action) {
      return _vm._t("action-" + action, null, {
        "item": item
      });
    })], 2) : _vm._e()], 2);
  }), 0)], 1)]), _vm._v(" "), _vm.paginate ? _c('vue-table-pagination', {
    attrs: {
      "items": _vm.totalItems
    }
  }) : _vm._e()], 1)], 2)])]);
};

var __vue_staticRenderFns__$3 = [];
/* style */

const __vue_inject_styles__$3 = function (inject) {
  if (!inject) return;
  inject("data-v-6003b847_0", {
    source: ".fit-content[data-v-6003b847]{width:1%;white-space:nowrap}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$3 = "data-v-6003b847";
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, createInjector, undefined, undefined);

var filterColumn_directive = {
  name: 'filter-column',
  bind: function (el, binding, vnode) {
    let columnName = binding.value;
    let storedFilters = window.localStorage.getItem(filtersStorageName);
    storedFilters = storedFilters ? JSON.parse(storedFilters) : [];
    let storedFilter = storedFilters.find(filter => filter.column == columnName);

    let setSelection = el => {
      if (typeof storedFilter !== 'undefined') {
        [...el.options].filter(option => storedFilter.values.includes(option.value)).map(option => option.setAttribute('selected', true));
      }
    };

    setSelection(el);
    el.addEventListener('vueTable.optionsLoaded', event => {
      setSelection(event.target);
    });
    el.addEventListener('change', event => {
      let selectedValues = [...event.target.options].filter(option => option.selected && option.value).map(option => option.value);
      const payload = {
        column: columnName,
        values: selectedValues
      };
      vnode.context.$root.$emit('filterOptionSelected', payload);
    });
  }
};

const install = function installVueTable(Vue) {
  if (install.installed) {
    return;
  }

  install.installed = true;
  Vue.component('VueTable', __vue_component__$3);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$3.install = install; // Export component by default

export { __vue_component__$3 as VueTable, filterColumn_directive as filterColumn };
