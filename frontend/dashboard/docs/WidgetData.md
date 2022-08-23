# WidgetData

## Props

| Name                      | Type     | Description |
| ------------------------- | -------- | ----------- |
| `route-name` *required*   | `String` |             |
| `refresh-rate` *required* | `Number` |             |
| `id`                      | `String` |             |
| `parameters`              | `Array`  | &nbsp;      |

## Computed Properties

| Name       | Type    | Description                    |
| ---------- | ------- | ------------------------------ |
| `settings` | `array` | **Dependencies:** `parameters` |

## Events

| Name                   | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| `blockDefaultBehavior` |                                                           |
| `removeWidget`         | <br/>**Arguments**<br/><ul><li>**`id: string`**</li></ul> |

## Methods

### blockBottomBar()

**Syntax**

```typescript
blockBottomBar(): unknown
```

### getWidgetData()

**Syntax**

```typescript
getWidgetData(): void
```

### addParameter()

**Syntax**

```typescript
addParameter(parameter: unknown): void
```

### removeWidget()

**Syntax**

```typescript
removeWidget(): void
```

