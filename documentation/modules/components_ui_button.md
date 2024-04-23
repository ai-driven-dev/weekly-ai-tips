[Weekly AI Tips](../README.md) / [Modules](../modules.md) / components/ui/button

# Module: components/ui/button

## Table of contents

### Interfaces

- [ButtonProps](../interfaces/components_ui_button.ButtonProps.md)

### Functions

- [Button](components_ui_button.md#button)
- [buttonVariants](components_ui_button.md#buttonvariants)

## Functions

### Button

▸ **Button**(`props`): `ReactNode`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ButtonProps`](../interfaces/components_ui_button.ButtonProps.md) & `RefAttributes`\<`HTMLButtonElement`\> |

#### Returns

`ReactNode`

#### Defined in

[components/ui/button.tsx:45](https://github.com/alexsoyes/weekly-ai-tips/blob/b3fea4afd71b68632685f2d382621a10bad6affa/components/ui/button.tsx#L45)

___

### buttonVariants

▸ **buttonVariants**(`props?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props?` | ConfigVariants\<\{ variant: \{ default: string; destructive: string; outline: string; secondary: string; ghost: string; link: string; }; size: \{ default: string; sm: string; lg: string; icon: string; }; }\> & ClassProp |

#### Returns

`string`

#### Defined in

[components/ui/button.tsx:10](https://github.com/alexsoyes/weekly-ai-tips/blob/b3fea4afd71b68632685f2d382621a10bad6affa/components/ui/button.tsx#L10)
