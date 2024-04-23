[Weekly AI Tips](../README.md) / [Modules](../modules.md) / components/ui/use-toast

# Module: components/ui/use-toast

## Table of contents

### Interfaces

- [State](../interfaces/components_ui_use_toast.State.md)

### Type Aliases

- [Action](components_ui_use_toast.md#action)
- [ActionType](components_ui_use_toast.md#actiontype)
- [Toast](components_ui_use_toast.md#toast)
- [ToasterToast](components_ui_use_toast.md#toastertoast)

### Variables

- [actionTypes](components_ui_use_toast.md#actiontypes)

### Functions

- [reducer](components_ui_use_toast.md#reducer)
- [toast](components_ui_use_toast.md#toast-1)
- [useToast](components_ui_use_toast.md#usetoast)

## Type Aliases

### Action

Ƭ **Action**: \{ `toast`: [`ToasterToast`](components_ui_use_toast.md#toastertoast) ; `type`: [`ActionType`](components_ui_use_toast.md#actiontype)[``"ADD_TOAST"``]  } \| \{ `toast`: `Partial`\<[`ToasterToast`](components_ui_use_toast.md#toastertoast)\> ; `type`: [`ActionType`](components_ui_use_toast.md#actiontype)[``"UPDATE_TOAST"``]  } \| \{ `toastId?`: [`ToasterToast`](components_ui_use_toast.md#toastertoast)[``"id"``] ; `type`: [`ActionType`](components_ui_use_toast.md#actiontype)[``"DISMISS_TOAST"``]  } \| \{ `toastId?`: [`ToasterToast`](components_ui_use_toast.md#toastertoast)[``"id"``] ; `type`: [`ActionType`](components_ui_use_toast.md#actiontype)[``"REMOVE_TOAST"``]  }

#### Defined in

[components/ui/use-toast.ts:32](https://github.com/alexsoyes/weekly-ai-tips/blob/a5c5a395ae8c55cfba018def4dd85212d123191c/components/ui/use-toast.ts#L32)

___

### ActionType

Ƭ **ActionType**: typeof [`actionTypes`](components_ui_use_toast.md#actiontypes)

#### Defined in

[components/ui/use-toast.ts:30](https://github.com/alexsoyes/weekly-ai-tips/blob/a5c5a395ae8c55cfba018def4dd85212d123191c/components/ui/use-toast.ts#L30)

___

### Toast

Ƭ **Toast**: `Omit`\<[`ToasterToast`](components_ui_use_toast.md#toastertoast), ``"id"``\>

#### Defined in

[components/ui/use-toast.ts:138](https://github.com/alexsoyes/weekly-ai-tips/blob/a5c5a395ae8c55cfba018def4dd85212d123191c/components/ui/use-toast.ts#L138)

___

### ToasterToast

Ƭ **ToasterToast**: [`ToastProps`](components_ui_toast.md#toastprops) & \{ `action?`: [`ToastActionElement`](components_ui_toast.md#toastactionelement) ; `description?`: `React.ReactNode` ; `id`: `string` ; `title?`: `React.ReactNode`  }

#### Defined in

[components/ui/use-toast.ts:9](https://github.com/alexsoyes/weekly-ai-tips/blob/a5c5a395ae8c55cfba018def4dd85212d123191c/components/ui/use-toast.ts#L9)

## Variables

### actionTypes

• `Const` **actionTypes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ADD_TOAST` | ``"ADD_TOAST"`` |
| `DISMISS_TOAST` | ``"DISMISS_TOAST"`` |
| `REMOVE_TOAST` | ``"REMOVE_TOAST"`` |
| `UPDATE_TOAST` | ``"UPDATE_TOAST"`` |

#### Defined in

[components/ui/use-toast.ts:16](https://github.com/alexsoyes/weekly-ai-tips/blob/a5c5a395ae8c55cfba018def4dd85212d123191c/components/ui/use-toast.ts#L16)

## Functions

### reducer

▸ **reducer**(`state`, `action`): [`State`](../interfaces/components_ui_use_toast.State.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`State`](../interfaces/components_ui_use_toast.State.md) |
| `action` | [`Action`](components_ui_use_toast.md#action) |

#### Returns

[`State`](../interfaces/components_ui_use_toast.State.md)

#### Defined in

[components/ui/use-toast.ts:72](https://github.com/alexsoyes/weekly-ai-tips/blob/a5c5a395ae8c55cfba018def4dd85212d123191c/components/ui/use-toast.ts#L72)

___

### toast

▸ **toast**(`«destructured»`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`Toast`](components_ui_use_toast.md#toast) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `dismiss` | () => `void` |
| `id` | `string` |
| `update` | (`props`: [`ToasterToast`](components_ui_use_toast.md#toastertoast)) => `void` |

#### Defined in

[components/ui/use-toast.ts:140](https://github.com/alexsoyes/weekly-ai-tips/blob/a5c5a395ae8c55cfba018def4dd85212d123191c/components/ui/use-toast.ts#L140)

___

### useToast

▸ **useToast**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `dismiss` | (`toastId?`: `string`) => `void` |
| `toast` | (`__namedParameters`: [`Toast`](components_ui_use_toast.md#toast)) => \{ `dismiss`: () => `void` ; `id`: `string` = id; `update`: (`props`: [`ToasterToast`](components_ui_use_toast.md#toastertoast)) => `void`  } |
| `toasts` | [`ToasterToast`](components_ui_use_toast.md#toastertoast)[] |

#### Defined in

[components/ui/use-toast.ts:169](https://github.com/alexsoyes/weekly-ai-tips/blob/a5c5a395ae8c55cfba018def4dd85212d123191c/components/ui/use-toast.ts#L169)
