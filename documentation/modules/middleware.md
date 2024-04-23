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

[middleware.ts:21](https://github.com/alexsoyes/weekly-ai-tips/blob/b3fea4afd71b68632685f2d382621a10bad6affa/middleware.ts#L21)

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

[middleware.ts:25](https://github.com/alexsoyes/weekly-ai-tips/blob/b3fea4afd71b68632685f2d382621a10bad6affa/middleware.ts#L25)