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

| Prop        | Type                | Default                             | Description                                                                                      |
|-------------|:-------------------:|:-----------------------------------:|--------------------------------------------------------------------------------------------------|
| checkable   | Object              | { display: false, attribute: null } | Show/hide checkboxes for bulk operations. See the [Checkable API](#checkable-api) for more info. |
| columns     | Array               | []                                  | The table columns. See the [Columns API](#columns-api) for more info.                            |
| data-key    | String              | 'data'                              | The path to the data in the server's JSON response.                                              |
| locale      | String              | en                                  | Sets the locale. Supported values: en, es, fr, pt.                                               |
| meta-key    | String              | null                                | The path to the pagination meta in the server's JSON response.                                   |
| paginate    | Boolean             | true                                | Paginates the records and enables the pages links.                                               |
| per-page    | Number              | 20                                  | Number of items displayed per page. Supported values: 20, 50, 100.                               |
| orderable   | Boolean             | false                               | When set to true, the rows can be reorder by dragging them.                                      |
| row-class   | String or Function  | ''                                  | The row CSS classes. It can be a String or a callback Function.                                  |
| sorting     | Array               | []                                  | The columns' sorting directions. See the [Sorting API](#sorting-api) for more info.              |
| table-class | String              | 'table table-striped'               | The CSS classes of the table.                                                                    |
| uri         | String              | null                                | Data source URI                                                                                  |


## Slots

### Table header

For injecting HTML before the table, you can use the `header` slot. See the following example:
```
<vue-table v-bind="options" :items.sync="items" ref="vueTable">
        <template v-slot:header>
            <div class="mb-4 text-right">
                <button class="btn btn-outline-secondary btn-sm mr-1" @click="importItems()">
                    <i class="fas fa-file-import mr-1"></i> Import
                </button>

                <button class="btn btn-outline-secondary btn-sm" @click="exportItems($refs.vueTable.selectedItems)">
                    <i class="fas fa-file-export mr-1"></i> Export
                </button>
            </div>
        </template>

...
```

### Reset button
For replacing the search button with your custom one, you can use the `reset-button`. See the next example:
```
<template v-slot:reset-button="slotProps">
    <button type="button" class="btn btn-primary" @click="slotProps.resetFilters">
        <i class="fas fa-sync-alt"></i>
    </button>
</template>
```


## Columns API

| Property      | Type          | Default | Description                                                    | 
|---------------|:-------------:|:-------:|----------------------------------------------------------------|
| headerClasses | String        | null    | The CSS classes that will be assigned to the table headers.    |
| name          | String        | ""      | The column's attribute name.                                   | 
| value         | String, Array | null    | The column's default value.                                    | 
| slotName      | String        | ""      | The name of the slot to be rendered.                           | 
| rowClasses    | String        | ""      | The CSS classes that will be assigned to the table rows.       |
| searchable    | Boolean       | false   | Determines whether the column is searchable.                   |
| sortable      | Boolean       | false   | Determines whether the column is sortable.                     |
| title         | String        | ""      | The column's header title.                                     |
| visible       | Boolean       | true    | Determines whether the column is visible.                      |
| render()      | function      | false   | Callback for transforming the column's data.                   |


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


## Checkable API

| Property      | Type     | Description                                                      | 
|---------------|:--------:|------------------------------------------------------------------|
| display       | Boolean  | Determines whether the checkboxes are displayed or not.          |
| attribute     | String   | The item's attribute to be stored on the selectedItems array     |

### Example

```
checkable: {
    display: true,
    attribute: "id"
},
```


## Filters

### Filters slot
You can make use of the filters slot for placing your selectors inline with the search bar.

You can even use v-model to trigger requests and to sync the local storage.
 
See this example:
```
<vue-table>
    <template v-slot:filters="slotProps">
        <div class="col-md-3">
            <select class="form-control" v-model="slotProps.filters.city_id">
                <option>Cities</option>
                <option value="1">Abbottton</option>
                <option value="2">Camrenland</option>
                <option value="3">Delfinamouth</option>
                <option value="4">East Benborough</option>
                <option value="5">Feeneymouth</option>
                <option value="6">Sipesburgh</option>
            </select>
        </div>
    </template>
</vue-table>
```


## License

**kriptiko/vue-table** is open-sourced software licensed under the [MIT license](https://github.com/KriptikoCreativeStudio/vue-table/blob/master/LICENSE).


## About Kriptiko

[Kriptiko](https://www.kriptiko.com) is a Creative Studio specialized in web development based in Matosinhos, Portugal.
