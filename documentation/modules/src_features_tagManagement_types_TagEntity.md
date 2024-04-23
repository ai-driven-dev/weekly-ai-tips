[Weekly AI Tips](../README.md) / [Modules](../modules.md) / src/features/tagManagement/types/TagEntity

# Module: src/features/tagManagement/types/TagEntity

## Table of contents

### Type Aliases

- [TagEntity](src_features_tagManagement_types_TagEntity.md#tagentity)
- [TagFormType](src_features_tagManagement_types_TagEntity.md#tagformtype)

## Type Aliases

### TagEntity

Ƭ **TagEntity**: `Object`

TagEntity is an interface that defines the structure of a tag entity.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `description` | `string` |
| `id` | `string` |
| `name` | `string` |
| `slug` | `string` |

#### Defined in

[src/features/tagManagement/types/TagEntity.ts:4](https://github.com/alexsoyes/weekly-ai-tips/blob/8e6b4ae946047053b809d45f37efccbb35947373/src/features/tagManagement/types/TagEntity.ts#L4)

___

### TagFormType

Ƭ **TagFormType**: \{ `id?`: `string`  } & `Omit`\<[`TagEntity`](src_features_tagManagement_types_TagEntity.md#tagentity), ``"id"``\>

**`TODO`**

create a TagFormType interface

#### Defined in

[src/features/tagManagement/types/TagEntity.ts:17](https://github.com/alexsoyes/weekly-ai-tips/blob/8e6b4ae946047053b809d45f37efccbb35947373/src/features/tagManagement/types/TagEntity.ts#L17)
