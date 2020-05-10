# Vue Table

Vue tables with server-side data support.


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

| Prop      | Type    | Default | Description                                                    | 
|-----------|:-------:|:-------:|----------------------------------------------------------------|
| uri       | String  | null    | Data source URI                                                |
| data-key  | String  | 'data'  | The path to the data in the server's JSON response.            | 
| meta-key  | String  | 'meta'  | The path to the pagination meta in the server's JSON response. |
| per-page  | Number  | 20      | Number of items displayed per page.                            |
| paginate  | Boolean | true    | Paginates the records and enables the pages links.             |
| locale    | String  | en      | Sets the locale. Supported values: en, es, fr, pt.             |
| orderable | Boolean | false   | When set to true, the rows can be reorder by dragging them.    |
| sort      | Object  | {}      | The columns' sort directions. Supports multi-column.           |


## Columns API

| Prop          | Type     | Default | Description                                                    | 
|---------------|:--------:|:-------:|----------------------------------------------------------------|
| headerClasses | String   | null    | The CSS classes that will be assigned to the table headers.    |
| name          | String   | ""      | The column's attribute name.                                   | 
| rowClasses    | String   | ""      | The CSS classes that will be assigned to the table rows.       |
| searchable    | Boolean  | false   | Determines whether the column is searchable.                   |
| sortable      | Boolean  | false   | Determines whether the column is sortable.                     |
| title         | String   | ""      | The column's header title.                                     |
| render()      | function | false   | Callback for transforming the column's data.                   |

## About CodeTech

[CodeTech](https://www.codetech.pt) is a web development agency based on Matosinhos, Portugal. Oh, and we LOVE Laravel!
