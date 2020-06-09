# Vue Table

Vue table component for rendering server-side data.

[![npm](https://img.shields.io/npm/v/@kriptiko/vue-table?style=flat-square)](https://www.npmjs.com/package/@kriptiko/vue-table)
[![npm](https://img.shields.io/npm/dt/@kriptiko/vue-table?style=flat-square)](https://www.npmjs.com/package/@kriptiko/vue-table)
[![npm](https://img.shields.io/npm/l/@kriptiko/vue-table?style=flat-square)](https://github.com/KriptikoCreativeStudio/vue-table/blob/master/LICENSE)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen?style=flat-square)](https://vuejs.org/)


### Main features

 - Server-side data
 - Searchable columns
 - Sortable columns
 - Filterable columns
 - Drag and drop for reordering the tables' rows
 - Store modules
 - Persist the state to local storage


---


## Installation

```bash
# NPM
npm install @kriptiko/vue-table

# Yarn
yarn add @kriptiko/vue-table
```


## Usage

```javascript
import Vue from 'vue'
import VueTable from '@kriptiko/vue-table'
```


---


## Props

| Prop      | Type    | Default                    | Description                                                                            |
|-----------|:-------:|:--------------------------:|----------------------------------------------------------------------------------------|
| actions   | Array   | { classes: "", slots: [] } | The actions' slots names. See the [Actions API](#actions-api) for more info.           |
| columns   | Array   | []                         | The table columns. See the [Columns API](#columns-api) for more info.                  |
| uri       | String  | null                       | Data source URI                                                                        |
| data-key  | String  | 'data'                     | The path to the data in the server's JSON response.                                    |
| meta-key  | String  | 'meta'                     | The path to the pagination meta in the server's JSON response.                         |
| per-page  | Number  | 20                         | Number of items displayed per page.                                                    |
| paginate  | Boolean | true                       | Paginates the records and enables the pages links.                                     |
| locale    | String  | en                         | Sets the locale. Supported values: en, es, fr, pt.                                     |
| orderable | Boolean | false                      | When set to true, the rows can be reorder by dragging them.                            |
| sorting   | Array   | []                         | The columns' sorting directions. See the [Sorting API](#sorting-api) for more info.    |


## Actions API

| Property  | Type      | Default | Description                                                    | 
|-----------|:---------:|:-------:|----------------------------------------------------------------|
| classes   | String    | ""      | The CSS classes that will be assigned to the row cell.         |
| slots     | Array     | []      | An array containing the names for the slots.                   |

### Example
```
data(){
    return {
        actions: {
            classes: "text-right align-middle",
            slots: [
                "edit",
                "delete"
            ]
        }
    };
}
```

```
<vue-table :actions="actions">
    <template v-slot:action-edit="slotProps">
        <a class="btn btn-sm btn-info"
           :href="`${options.uri}/${slotProps.item.id}/edit`"
        >
            <i class="fas fa-pencil-alt"></i>
        </a>
    </template>

    <template v-slot:action-delete="slotProps">
        <a class="btn btn-sm btn-danger" href="#" @click.prevent="handleItemDeleted(slotProps.item)">
            <i class="fas fa-trash-alt"></i>
        </a>
    </template>
</vue-table>
```


## Columns API

| Property      | Type     | Default | Description                                                    | 
|---------------|:--------:|:-------:|----------------------------------------------------------------|
| headerClasses | String   | null    | The CSS classes that will be assigned to the table headers.    |
| name          | String   | ""      | The column's attribute name.                                   | 
| rowClasses    | String   | ""      | The CSS classes that will be assigned to the table rows.       |
| searchable    | Boolean  | false   | Determines whether the column is searchable.                   |
| sortable      | Boolean  | false   | Determines whether the column is sortable.                     |
| title         | String   | ""      | The column's header title.                                     |
| visible       | Boolean  | true    | Determines whether the column is visible.                      |
| render()      | function | false   | Callback for transforming the column's data.                   |


## Sorting API

| Property      | Type     | Description                                                      | 
|---------------|:--------:|------------------------------------------------------------------|
| column        | String   | The name of the column to be sorted. Must be an existing column. |
| direction     | String   | The sorting direction. Allowed values: 'asc' or 'desc'.          |

You can set a default sorting for your table's columns by passing a prop containing an array of objects with the names 
of the columns and respective sorting directions. Here's an example:

```
sorting: [
    {
        column: "name",
        direction: "asc"
    },
    {
        column: "created_at",
        direction: "desc"
    }
],
``` 

### Request payload
Whenever you sort a column, the current sorting information will be attached to the request. For the previous example,
this is how the payload will look like:
```
sorting[0][column]: name
sorting[0][direction]: asc
sorting[1][column]: name
sorting[1][direction]: created_at
```

## Filters

If you need to filter a column, you can use the `v-filter-column` directive.

```
<template>
    <select v-filter-column="'city'">
        ...
    </select>
</template>

<script>
    import { filterColumn, VueTable } from '@kriptiko/vue-table';

    export default {
        components: {
            VueTable
        },
        directives: {
            filterColumn 
        }
    }
</sc
```

This directive will sync your selector with the `city` column.<br>
Here's an example of the data that will be attached to the request when you select an option:

```
filters[0][column]: name
filters[0][values][0]: Ada Stark
```

It also works with selectors with the `multiple` attribute. In these cases, the request will look like this:

```
filters[0][column]: city
filters[0][values][0]: Abbottton
filters[0][values][1]: Benborough
```

This will append the data to the request in order to search for the selected value in the column with the name `city`. Check the [Columns API](#columns-api) for more info.

### Storage of the current selection
In addition to triggering a request to the server, the directive is also responsible for storing the current value of the selector in local storage. 
Thus, when the page loads, the option gets automatically selected. 

Let's say you're fetching data for your selector from an external API and you need the selection to be triggered **after** the options have been loaded. 
In that case, you can use the `vueTable.optionsLoaded` event as follows:

```
// Get the cities from an external API.

<template>
    <vue-table v-bind="options" :items.sync="items">
        <template v-slot:filters>
            <div class="col-md-3">
                <select class="custom-select" v-filter-column="'city.id'" ref="cityFilter">
                    <option value="">Cities</option>
                    <option v-for="city in filters.cities" :value="city.id" :key="city.id">
                        {{ city.name }}
                    </option>
                </select>
            </div>
        </template>
    </vue-table>
</template>

<script>
    import { filterColumn, VueTable } from '@kriptiko/vue-table';

    export default {
        name: 'App',
        components: {
            VueTable
        },
        directives: { filterColumn },
        data() {
            return {
                items: [],
                filters: {
                    cities: [],
                },
                options: {},
            };
        },
        methods: {
            /**
             * Get the cities from an external API.
             */
            getCitiesOptions: function () {
                const axios = require('axios');

                axios.get('https://api.sandbox.codetech.pt/api/cities')
                    .then(response => {
                        new Promise((resolve) => {
                            this.filters.cities = response.data.data;

                            resolve();
                        })
                            .then(() => {
                                this.$refs.cityFilter.dispatchEvent(new Event('vueTable.optionsLoaded'));
                            });
                    });
            }
        },
        mounted() {
            this.getCitiesOptions();
        }
    };
</script>
```

### Filters slot
You can make use of the filters slot for placing your selectors inline with the search bar. See this example:
```
<vue-table>
    <template v-slot:filters>
        <div class="col-md-3">
            <select class="form-control" v-filter-column="'city'">
                <option>Cities</option>
                <option value="Abbottton">Abbottton</option>
                <option value="Camrenland">Camrenland</option>
                <option value="Delfinamouth">Delfinamouth</option>
                <option value="East Benborough">East Benborough</option>
                <option value="Feeneymouth">Feeneymouth</option>
                <option value="Sipesburgh">Sipesburgh</option>
            </select>
        </div>
    </template>
</vue-table>
```


## License

**kriptiko/vue-table** is open-sourced software licensed under the [MIT license](https://github.com/KriptikoCreativeStudio/vue-table/blob/master/LICENSE).


## About Kriptiko

[Kriptiko](https://www.kriptiko.com) is a Creative Studio specialized in web development based in Matosinhos, Portugal.
