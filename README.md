# Vue Table

Vue tables with server-side data support.

#### Main features

 - Server-side data
 - Searchable columns
 - Sortable columns
 - Filterable columns
 - Drag and drop for reordering the tables' rows
 - Store modules
 - Persist the state to local storage


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Props

| Prop      | Type    | Default | Description                                                                          |
|-----------|:-------:|:-------:|--------------------------------------------------------------------------------------|
| columns   | Array   | []      | The table columns. See the [Columns API](#columns-api) for more info.                |
| uri       | String  | null    | Data source URI                                                                      |
| data-key  | String  | 'data'  | The path to the data in the server's JSON response.                                  |
| meta-key  | String  | 'meta'  | The path to the pagination meta in the server's JSON response.                       |
| per-page  | Number  | 20      | Number of items displayed per page.                                                  |
| paginate  | Boolean | true    | Paginates the records and enables the pages links.                                   |
| locale    | String  | en      | Sets the locale. Supported values: en, es, fr, pt.                                   |
| orderable | Boolean | false   | When set to true, the rows can be reorder by dragging them.                          |
| sorting   | Array   | []      | The columns' sorting directions. See the [Sorting API](#sorting-api) for more info.  |


## Columns API

| Property      | Type     | Default | Description                                                    | 
|---------------|:--------:|:-------:|----------------------------------------------------------------|
| headerClasses | String   | null    | The CSS classes that will be assigned to the table headers.    |
| name          | String   | ""      | The column's attribute name.                                   | 
| rowClasses    | String   | ""      | The CSS classes that will be assigned to the table rows.       |
| searchable    | Boolean  | false   | Determines whether the column is searchable.                   |
| sortable      | Boolean  | false   | Determines whether the column is sortable.                     |
| title         | String   | ""      | The column's header title.                                     |
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
<select v-filter-column:city>
    ...
</select>
```
This directive will sync your selector with the `city` column.<br>
Here's an example of the data that will be attached to the request when you select an option:
```
filters[0][column]: name
filters[0][values][0]: Ada Stark
```
It also works with selectors with the `multiple` attribute. The request will look like this:
```
filters[0][column]: city
filters[0][values][0]: Abbottton
filters[0][values][1]: Benborough
```
This will append the data to the request in order to search for the selected value in the column with the name `city`. Check the [Columns API](#columns-api) for more info.


## License

**kriptiko/vue-table** is open-sourced software licensed under the [MIT license](https://github.com/KriptikoCreativeStudio/vue-table/blob/master/LICENSE).


## About Kriptiko

[Kriptiko](https://www.kriptiko.com) is a Creative Studio specialized in web development based in Matosinhos, Portugal.
