[Weekly AI Tips](../README.md) / [Modules](../modules.md) / middleware

# Module: middleware

## Table of contents

### Variables

- [config](middleware.md#config)

### Functions

- [middleware](middleware.md#middleware)

## Variables

### config

• `Const` **config**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `matcher` | `string`[] |

#### Defined in

[middleware.ts:21](https://github.com/alexsoyes/weekly-ai-tips/blob/8e6b4ae946047053b809d45f37efccbb35947373/middleware.ts#L21)

## Functions

### middleware

▸ **middleware**(`request`): `Promise`\<`NextResponse`\<`unknown`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `NextRequest` |

#### Returns

`Promise`\<`NextResponse`\<`unknown`\>\>

#### Defined in

[middleware.ts:25](https://github.com/alexsoyes/weekly-ai-tips/blob/8e6b4ae946047053b809d45f37efccbb35947373/middleware.ts#L25)
