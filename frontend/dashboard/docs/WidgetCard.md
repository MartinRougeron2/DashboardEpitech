# Widget

## Props

| Name                | Type      | Description | Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------- | --------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `widget` *required* | `unknown` |             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `service`           | `unknown` |             | `{"name":{"type":"string","value":"Spotify","raw":"\"Spotify\"","member":false},"primaryColor":{"type":"string","value":"#2fdc28","raw":"\"#2fdc28\"","member":false},"textColor":{"type":"string","value":"#fdfdfd","raw":"\"#fdfdfd\"","member":false},"logoPath":{"type":"string","value":"https://upload.wikimedia.org/wikipedia/commons/7/74/Spotify_App_Logo.svg","raw":"\"https://upload.wikimedia.org/wikipedia/commons/7/74/Spotify_App_Logo.svg\"","member":false},"coverImage":{"type":"string","value":"https://i1.wp.com/www.ultimatepocket.com/wp-content/uploads/2020/10/spotify-developing-ios-14-widgets-in-latest-beta.jpg?fit=400%2C396&ssl=1","raw":"\"https://i1.wp.com/www.ultimatepocket.com/wp-content/uploads/2020/10/spotify-developing-ios-14-widgets-in-latest-beta.jpg?fit=400%2C396&ssl=1\"","member":false}}` |
| `preview`           | `Boolean` |             | &nbsp;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

## Computed Properties

| Name      | Type  | Description                |
| --------- | ----- | -------------------------- |
| `loading` | `any` | **Dependencies:** `widget` |

## Events

| Name                  | Description                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------- |
| `addWidget`           | <br/>**Arguments**<br/><ul><li>**`widget: unknown`**</li></ul>                                              |
| `change-refresh-rate` | <br/>**Arguments**<br/><ul><li>**`{refreshRate: this.refreshRate, id: this.widget._id}: object`**</li></ul> |

## Methods

### addWidgets()

**Syntax**

```typescript
addWidgets(): void
```

### changeRefreshRateF()

**Syntax**

```typescript
changeRefreshRateF(): void
```

