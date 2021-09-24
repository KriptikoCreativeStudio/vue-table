'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var axios=_interopDefault(require('axios')),qs=_interopDefault(require('qs')),Vuex=require('vuex'),Vuex__default=_interopDefault(Vuex),debounce=_interopDefault(require('lodash.debounce')),Vue=_interopDefault(require('vue')),VueDraggable=_interopDefault(require('vuedraggable'));function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}var script = {
  name: "VueTableHeading",
  props: {
    column: {
      type: Object,
      required: true,
      validator: function validator(value) {
        return Object.prototype.hasOwnProperty.call(value, 'name') && Object.prototype.hasOwnProperty.call(value, 'title') && Object.prototype.hasOwnProperty.call(value, 'sortable');
      }
    }
  },
  computed: _objectSpread2({
    sortIcon: function sortIcon() {
      switch (this.sorting[this.column.name]) {
        case 'asc':
          return 'fa-sort-up';

        case 'desc':
          return 'fa-sort-down';

        default:
          return 'fa-sort';
      }
    },
    sort: function sort() {
      switch (this.sorting[this.column.name]) {
        case 'asc':
          return 'desc';

        case 'desc':
          return null;

        default:
          return 'asc';
      }
    }
  }, Vuex.mapState('sortingModule', ['sorting'])),
  methods: _objectSpread2({
    setOrder: function setOrder() {
      var payload = {
        columnName: this.column.name,
        columnSort: this.sort
      };
      this.setColumnSort(payload);
      this.$emit('vueTableSortChanged', payload);
    }
  }, Vuex.mapActions('sortingModule', {
    setColumnSort: 'setColumnSortAction'
  }))
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return !_vm.column.sortable ? _c('span', [_vm._ssrNode(_vm._ssrEscape("\n    " + _vm._s(_vm.column.title) + "\n"))], 2) : _c('a', {
    attrs: {
      "role": "button",
      "href": "#"
    },
    on: {
      "click": function click($event) {
        $event.preventDefault();
        return _vm.setOrder($event);
      }
    }
  }, [_vm._ssrNode(_vm._ssrEscape("\n    " + _vm._s(_vm.column.title) + "\n\n    ") + "<i" + _vm._ssrClass("fas fa-fw", _vm.sortIcon) + "></i>")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-8acd8ac0";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);var script$1 = {
  name: "VueTableSearchBar",
  data: function data() {
    return {
      lang: this.$parent.lang
    };
  },
  methods: _objectSpread2(_objectSpread2(_objectSpread2({}, Vuex.mapActions('searchModule', {
    setValue: 'setValueAction'
  })), Vuex.mapActions('paginationModule', {
    setPage: 'setPageAction'
  })), {}, {
    /**
     * Handles the search event.
     *
     * @param event
     */
    handleSearch: debounce(function (event) {
      this.setValue(event.target.value);
      this.setPage(1);
      this.$emit('searchPerformed');
    }, 400)
  }),
  computed: _objectSpread2({}, Vuex.mapState('searchModule', ['value']))
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "input-group"
  }, [_vm._ssrNode("<div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fas fa-search\"></i></div></div> <input type=\"text\"" + _vm._ssrAttr("placeholder", _vm.lang.search_for) + _vm._ssrAttr("value", _vm.value) + " class=\"form-control\">")]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-23d3fe80";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);var script$2 = {
  name: "VueTablePagination",
  props: {
    perPageOptions: {
      type: Array,
      default: function _default() {
        return [20, 50, 100];
      }
    },
    items: {
      type: Number,
      default: 0,
      validator: function validator(value) {
        return value >= 0;
      }
    },
    maxLinks: {
      type: Number,
      default: 5,
      validator: function validator(value) {
        return value > 0;
      }
    }
  },
  methods: _objectSpread2(_objectSpread2({
    handleItemsPerPageChanged: function handleItemsPerPageChanged(event) {
      this.setPage(1);
      this.setItemsPerPage(event.target.value);
      this.$emit('itemsPerPageSelected', event.target.value);
    },
    handlePageSelect: function handlePageSelect(page) {
      this.setPage(page);
      this.$emit('pageSelected');
    }
  }, Vuex.mapActions('paginationModule', {
    setPage: 'setPageAction'
  })), Vuex.mapActions('itemsPerPageModule', {
    setItemsPerPage: 'setItemsPerPageAction'
  })),
  computed: _objectSpread2(_objectSpread2({
    start: function start() {
      return (this.page - 1) * this.itemsPerPage + 1;
    },
    end: function end() {
      var end = this.start + this.itemsPerPage - 1;
      return this.items < end ? this.items : end;
    },
    totalPages: function totalPages() {
      return Math.ceil(this.items / this.itemsPerPage);
    },
    linkButtons: function linkButtons() {
      var linksSpan = this.linksSpan;
      var pages = [];

      for (var p = linksSpan.lower; p <= linksSpan.higher; p++) {
        pages.push(p);
      }

      return pages;
    },
    linksSpan: function linksSpan() {
      var span = Math.floor(this.maxLinks / 2);
      var lowerBound = this.page - span;
      var lowerOverflow = lowerBound < 0 ? Math.abs(lowerBound) + 1 : 0;
      var higherBound = this.page + span;
      var higherOverflow = higherBound > this.totalPages ? higherBound - this.totalPages : 0; // Correct overflows

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
    }
  }, Vuex.mapState('paginationModule', ['page'])), Vuex.mapState('itemsPerPageModule', ['itemsPerPage']))
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('nav', {
    staticClass: "row align-items-center mt-5"
  }, [_vm._ssrNode("<div class=\"col-auto\"><select" + _vm._ssrAttr("value", _vm.itemsPerPage) + " class=\"custom-select\">" + _vm._ssrList(_vm.perPageOptions, function (perPageOption) {
    return "<option" + _vm._ssrAttr("value", perPageOption) + ">" + _vm._ssrEscape(_vm._s(perPageOption) + "\n            ") + "</option>";
  }) + "</select></div> <div class=\"col\">" + _vm._ssrEscape("\n        Showing " + _vm._s(_vm.start) + " - " + _vm._s(_vm.end) + " of " + _vm._s(_vm.items) + "\n    ") + "</div> <div class=\"col-sm-auto mt-4 mt-sm-0\">" + (_vm.totalPages > 1 ? "<ul class=\"pagination mb-0\">" + (_vm.page != 1 ? "<li class=\"page-item\"><a href=\"#\" aria-label=\"First\" class=\"page-link\"><i class=\"fas fa-backward\"></i> <span class=\"sr-only\">First</span></a></li> <li class=\"page-item\"><a href=\"#\" aria-label=\"Previous\" class=\"page-link\"><i class=\"fas fa-caret-left\"></i> <span class=\"sr-only\">Previous</span></a></li>" : "<!---->") + " " + _vm._ssrList(_vm.linkButtons, function (linkButton, index) {
    return "<li" + _vm._ssrClass("page-item", {
      'active': linkButton == _vm.page
    }) + "><a href=\"#\" class=\"page-link\">" + _vm._ssrEscape(_vm._s(linkButton)) + "</a></li>";
  }) + " " + (_vm.page != _vm.totalPages ? "<li class=\"page-item\"><a href=\"#\" aria-label=\"Next\" class=\"page-link\"><i class=\"fas fa-caret-right\"></i> <span class=\"sr-only\">Next</span></a></li> <li class=\"page-item\"><a href=\"#\" aria-label=\"Last\" class=\"page-link\"><i class=\"fas fa-forward\"></i> <span class=\"sr-only\">Last</span></a></li>" : "<!---->") + "</ul>" : "<!---->") + "</div>")]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = "data-v-cf43e54e";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);var paginationModule = {
  namespaced: true,
  state: {
    page: 1
  },
  mutations: {
    /**
     * Sets the page number.
     *
     * @param state
     * @param page
     */
    setPage: function setPage(state, page) {
      state.page = page;
    }
  },
  actions: {
    /**
     * The action of setting a page.
     *
     * @param commit
     * @param page
     */
    setPageAction: function setPageAction(_ref, page) {
      var commit = _ref.commit;
      commit('setPage', page);
    }
  }
};var itemsPerPageModule = {
  namespaced: true,
  state: {
    itemsPerPage: 20
  },
  mutations: {
    /**
     * Sets the amount of items displayed per page.
     *
     * @param state
     * @param itemsPerPage
     */
    setItemsPerPage: function setItemsPerPage(state, itemsPerPage) {
      state.itemsPerPage = parseInt(itemsPerPage);
    }
  },
  actions: {
    /**
     * The action of setting the amount of items displayed per page.
     *
     * @param commit
     * @param itemsPerPage
     */
    setItemsPerPageAction: function setItemsPerPageAction(_ref, itemsPerPage) {
      var commit = _ref.commit;
      commit('setItemsPerPage', itemsPerPage);
    }
  }
};var searchModule = {
  namespaced: true,
  state: {
    value: ''
  },
  mutations: {
    /**
     * Sets the value.
     *
     * @param state
     * @param value
     */
    setValue: function setValue(state, value) {
      state.value = value;
    }
  },
  actions: {
    /**
     * The action of setting the value tha will be searched.
     *
     * @param commit
     * @param value
     */
    setValueAction: function setValueAction(_ref, value) {
      var commit = _ref.commit;
      commit('setValue', value);
    }
  }
};var sortingModule = {
  namespaced: true,
  state: {
    sorting: {}
  },
  mutations: {
    /**
     * Sets the sorting.
     *
     * @param state
     * @param sorting
     */
    setSorting: function setSorting(state, sorting) {
      state.sorting = sorting;
    },

    /**
     * Adds a sorting to the store.
     *
     * @param state
     * @param columnName
     * @param columnSort
     */
    setColumnSort: function setColumnSort(state, _ref) {
      var columnName = _ref.columnName,
          columnSort = _ref.columnSort;
      state.sorting = _objectSpread2(_objectSpread2({}, state.sorting), {}, _defineProperty({}, columnName, columnSort));
    }
  },
  actions: {
    /**
     * The action of setting the sorting.
     *
     * @param commit
     * @param sorting
     */
    setSortingAction: function setSortingAction(_ref2, sorting) {
      var commit = _ref2.commit;
      commit('setSorting', sorting);
    },

    /**
     * The action of setting a column sort.
     *
     * @param commit
     * @param columnName
     * @param columnSort
     */
    setColumnSortAction: function setColumnSortAction(_ref3, _ref4) {
      var commit = _ref3.commit;
      var columnName = _ref4.columnName,
          columnSort = _ref4.columnSort;
      commit('setColumnSort', {
        columnName: columnName,
        columnSort: columnSort
      });
    }
  }
};Vue.use(Vuex__default);
var store = new Vuex__default.Store({
  modules: {
    paginationModule: paginationModule,
    itemsPerPageModule: itemsPerPageModule,
    searchModule: searchModule,
    sortingModule: sortingModule
  }
});var localStorageManager = {
  data: function data() {
    return {
      selection: null
    };
  },
  props: {
    saveState: {
      type: Boolean,
      default: false
    },
    localStorageName: {
      type: String,
      default: function _default() {
        return "".concat(this.$options.name, "_").concat(this._uid, "_").concat(window.location.pathname);
      }
    }
  },
  methods: {
    /**
     * Get the state of the local storage.
     */
    getStoredValues: function getStoredValues() {
      return JSON.parse(localStorage.getItem(this.localStorageName));
    },

    /**
     * Stores the state in local storage.
     */
    storeState: function storeState(data) {
      if (this.saveState) {
        localStorage.setItem(this.localStorageName, JSON.stringify(data));
      }
    }
  }
};var filtersManager = {
  data: function data() {
    return {
      filters: {}
    };
  },
  props: {
    perPage: {
      type: Number,
      default: 20,
      validator: function validator(value) {
        return value > 0;
      }
    }
  },
  methods: _objectSpread2({
    /**
     * Store the filters in the local storage.
     */
    storeFilters: function storeFilters() {
      var filters = {};

      for (var columnName in this.columnsPayload) {
        if (this.columnsPayload[columnName].value) {
          filters[columnName] = this.columnsPayload[columnName].value;
        }
      }

      this.storeState({
        filters: filters,
        page: this.page,
        perPage: this.itemsPerPage,
        search: this.search,
        sorting: this.currentSorting
      });
    },

    /**
     * Load the filters from local storage.
     */
    loadStoredFilters: function loadStoredFilters() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var storedSettings;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                storedSettings = _this.getStoredValues() || {};

                _this.setColumnsPayload(storedSettings.filters, storedSettings.sorting);

                _this.setPage(storedSettings.page || 1);

                _this.setItemsPerPage(storedSettings.perPage || _this.perPage);

                _this.setSearchValue(storedSettings.search || null);

                if (storedSettings.sorting) {
                  _this.setSorting(storedSettings.sorting);
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },

    /**
     * Resets all the filters.
     */
    resetFilters: function resetFilters() {
      this.setColumnsPayload();
      this.setSorting(this.currentSorting);
      this.setPage(1);
      this.setItemsPerPage(this.itemsPerPage);
      this.setSearchValue(null);
      this.getItems();
    },

    /**
     * Set the columns payload to be sent with requests
     */
    setColumnsPayload: function setColumnsPayload() {
      var _this2 = this;

      var storedFilters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var storedSorting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.columns.forEach(function (column) {
        if (column.name) {
          var columnPayload = {
            modifiers: column.modifiers || [],
            searchable: column.searchable || false,
            sort: storedSorting[column.name] || column.sort || null,
            value: storedFilters[column.name] || column.value || ''
          };

          _this2.$set(_this2.columnsPayload, column.name, columnPayload);
        }
      });
    }
  }, Vuex.mapActions('sortingModule', {
    setSorting: 'setSortingAction'
  })),
  computed: _objectSpread2({
    currentSorting: function currentSorting() {
      var sorting = {};

      for (var columnName in this.columnsPayload) {
        if (this.columnsPayload[columnName].sort) {
          sorting[columnName] = this.columnsPayload[columnName].sort;
        }
      }

      return sorting;
    }
  }, Vuex.mapState('sortingModule', ['sorting'])),
  beforeMount: function beforeMount() {
    var _this3 = this;

    this.loadStoredFilters().then(function () {
      if (_this3.uri !== null) {
        _this3.getItems();
      }
    });
  }
};var script$3 = {
  store: store,
  name: "VueTable",
  mixins: [localStorageManager, filtersManager],
  components: {
    VueTableHeading: __vue_component__,
    VueDraggable: VueDraggable,
    VueTablePagination: __vue_component__$2,
    VueTableSearchBar: __vue_component__$1
  },
  data: function data() {
    return {
      items: [],
      selectedItems: [],
      lang: {
        "no_records": "No records found!",
        "search_for": "Search for..."
      },
      totalItems: 0,
      columnsPayload: {}
    };
  },
  props: {
    tableClass: {
      type: String,
      default: 'table table-striped'
    },
    rowClass: {
      type: [String, Function],
      default: ''
    },
    columns: {
      type: Array,
      default: function _default() {
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
      default: function _default() {
        return {
          display: false,
          attribute: null
        };
      },
      validator: function validator(checkable) {
        return Object.prototype.hasOwnProperty.call(checkable, 'display') && Object.prototype.hasOwnProperty.call(checkable, 'attribute');
      }
    },
    paginate: {
      type: Boolean,
      default: true
    },
    uri: {
      type: String,
      default: null
    }
  },
  methods: _objectSpread2(_objectSpread2(_objectSpread2({
    /**
     * Get the items from storage.
     *
     * @param extraParams
     * @returns {Promise<AxiosResponse<T>>}
     */
    getItems: function getItems() {
      var _this = this;

      var extraParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var axios$1 = axios;

      var qs$1 = qs;

      var options = {
        params: {
          columns: this.columnsPayload,
          page: this.page,
          perPage: this.itemsPerPage,
          search: this.search,
          extraParams: extraParams
        },
        paramsSerializer: function paramsSerializer(params) {
          return qs$1.stringify(params);
        }
      };
      this.storeFilters();
      return axios$1.get(this.uri, options).then(function (response) {
        if (Object.prototype.hasOwnProperty.call(response.data, _this.dataKey)) {
          _this.items = response.data[_this.dataKey];
        }

        _this.totalItems = (_this.metaKey != null ? response.data[_this.metaKey].total : response.data.total) || _this.items.length;

        _this.$emit('update:items', _this.items);
      });
    },

    /**
     * Refresh results.
     */
    refreshResults: function refreshResults() {
      this.setPage(1);
      this.getItems();
    },

    /**
     * Returns the searchable columns
     *
     * @return {array}
     */
    getSearchableColumns: function getSearchableColumns() {
      return this.columns.filter(function (column) {
        return column.searchable;
      });
    },

    /**
     * Checks that the columns contain all the required properties
     * and that these properties are correctly initialized.
     */
    hydrateColumns: function hydrateColumns() {
      this.columns.forEach(function (column) {
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
    toggleVueTableCheckables: function toggleVueTableCheckables(event) {
      var _this2 = this;

      if (event.target.checked) {
        this.selectedItems = this.items.map(function (item) {
          return item[_this2.checkable.attribute];
        });
      } else {
        this.selectedItems = [];
      }
    },

    /**
     * Evaluates whether the rowClass property is a String or a Function and returns the resulting evaluation.
     *
     * @param item
     * @param index
     */
    setRowClass: function setRowClass(item, index) {
      if (typeof this.rowClass === 'function') {
        return this.rowClass(item, index);
      }

      return this.rowClass;
    },
    setColumnSorting: function setColumnSorting(_ref) {
      var columnName = _ref.columnName,
          columnSort = _ref.columnSort;
      this.columnsPayload[columnName].sort = columnSort;
      this.getItems();
    }
  }, Vuex.mapActions('paginationModule', {
    setPage: 'setPageAction'
  })), Vuex.mapActions('searchModule', {
    setSearchValue: 'setValueAction'
  })), Vuex.mapActions('itemsPerPageModule', {
    setItemsPerPage: 'setItemsPerPageAction'
  })),
  computed: _objectSpread2(_objectSpread2(_objectSpread2({
    /**
     * Checks whether the search form should be displayed. The form will
     * be displayed if there is at least one searchable column.
     *
     * @returns {boolean}
     */
    isSearchable: function isSearchable() {
      return this.getSearchableColumns().length > 0;
    },

    /**
     * Scope the columns to only include the ones that are visible.
     *
     * @returns {*}
     */
    visibleColumns: function visibleColumns() {
      return this.columns.filter(function (column) {
        return column.visible;
      });
    }
  }, Vuex.mapState('searchModule', {
    search: 'value'
  })), Vuex.mapState('paginationModule', ['page'])), Vuex.mapState('itemsPerPageModule', ['itemsPerPage'])),
  created: function created() {
    this.hydrateColumns();
  }
};function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<div class=\"card mb-4\" data-v-2e00ee22>", "</div>", [_vm._ssrNode("<div class=\"card-body\" data-v-2e00ee22>", "</div>", [_vm._ssrNode("<div class=\"form-row\" data-v-2e00ee22>", "</div>", [_vm._t("filters", null, {
    "columns": _vm.columnsPayload,
    "refreshResults": _vm.refreshResults
  }), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"col\" data-v-2e00ee22>", "</div>", [_vm.isSearchable ? _c('vue-table-search-bar', {
    on: {
      "searchPerformed": _vm.getItems
    }
  }) : _vm._e()], 1), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"col-auto\" data-v-2e00ee22>", "</div>", [_vm._t("reset-button", [_c('button', {
    staticClass: "btn btn-primary",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.resetFilters
    }
  }, [_c('i', {
    staticClass: "fas fa-eraser"
  })])], {
    "resetFilters": _vm.resetFilters
  })], 2)], 2)])]), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"card\" data-v-2e00ee22>", "</div>", [_vm._ssrNode("<div class=\"card-body\" data-v-2e00ee22>", "</div>", [_vm._t("header", null, {
    "table": this
  }), _vm._ssrNode(" "), _vm.items.length === 0 ? _vm._ssrNode("<div class=\"alert alert-info\" data-v-2e00ee22>", "</div>", [_vm._ssrNode(_vm._ssrEscape("\n                " + _vm._s(_vm.lang.no_records) + "\n            "))], 2) : _vm._ssrNode("<div data-v-2e00ee22>", "</div>", [_vm._ssrNode("<div class=\"table-responsive\" data-v-2e00ee22>", "</div>", [_vm._ssrNode("<table" + _vm._ssrClass(null, _vm.tableClass) + " data-v-2e00ee22>", "</table>", [_vm._ssrNode("<thead data-v-2e00ee22>", "</thead>", [_vm._ssrNode("<tr data-v-2e00ee22>", "</tr>", [_vm._ssrNode((_vm.orderable ? "<th class=\"fit-content\" data-v-2e00ee22></th>" : "<!---->") + " " + (_vm.checkable.display ? "<th class=\"fit-content\" data-v-2e00ee22><div class=\"custom-control custom-checkbox\" data-v-2e00ee22><input type=\"checkbox\"" + _vm._ssrAttr("id", "vueTableCheckableAll" + _vm._uid) + " class=\"custom-control-input\" data-v-2e00ee22> <label" + _vm._ssrAttr("for", "vueTableCheckableAll" + _vm._uid) + " class=\"custom-control-label\" data-v-2e00ee22></label></div></th>" : "<!---->") + " "), _vm._l(_vm.visibleColumns, function (column) {
    return _vm._ssrNode("<th" + _vm._ssrClass(null, column.headerClasses) + " data-v-2e00ee22>", "</th>", [_c('vue-table-heading', {
      attrs: {
        "column": column
      },
      on: {
        "vueTableSortChanged": _vm.setColumnSorting
      }
    })], 1);
  })], 2)]), _vm._ssrNode(" "), _c('vue-draggable', {
    attrs: {
      "tag": "tbody",
      "handle": ".v-table-drag-handle",
      "disabled": !_vm.orderable
    },
    on: {
      "change": function change($event) {
        return _vm.$emit('vueTableItemsReordered', $event.moved.element, $event.moved.newIndex);
      }
    },
    model: {
      value: _vm.items,
      callback: function callback($$v) {
        _vm.items = $$v;
      },
      expression: "items"
    }
  }, _vm._l(_vm.items, function (item, index) {
    return _c('tr', {
      key: index,
      class: _vm.setRowClass(item, index)
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
        "change": function change($event) {
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
      })] : column.name ? [_vm._v("\n                                        " + _vm._s(column.name.split(".").reduce(function (a, b) {
        return a[b];
      }, item)) + "\n                                    ")] : _vm._e()], 2);
    })], 2);
  }), 0)], 2)]), _vm._ssrNode(" "), _vm.paginate ? _c('vue-table-pagination', {
    attrs: {
      "items": _vm.totalItems
    },
    on: {
      "itemsPerPageSelected": _vm.getItems,
      "pageSelected": _vm.getItems
    }
  }) : _vm._e()], 2)], 2)])], 2);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-2e00ee22_0", {
    source: ".fit-content[data-v-2e00ee22]{width:1%;white-space:nowrap}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$3 = "data-v-2e00ee22";
/* module identifier */

var __vue_module_identifier__$3 = "data-v-2e00ee22";
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, createInjectorSSR, undefined);var install = function installVueTable(Vue) {
  if (install.installed) {
    return;
  }

  install.installed = true;
  Vue.component('VueTable', __vue_component__$3);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$3.install = install; // Export component by default
exports.VueTable=__vue_component__$3;