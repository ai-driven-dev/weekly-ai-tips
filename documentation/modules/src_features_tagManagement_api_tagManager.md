[Weekly AI Tips](../README.md) / [Modules](../modules.md) / src/features/tagManagement/api/tagManager

# Module: src/features/tagManagement/api/tagManager

## Table of contents

### Functions

- [createTag](src_features_tagManagement_api_tagManager.md#createtag)
- [deleteTag](src_features_tagManagement_api_tagManager.md#deletetag)
- [fetchTags](src_features_tagManagement_api_tagManager.md#fetchtags)
- [updateTag](src_features_tagManagement_api_tagManager.md#updatetag)

## Functions

### createTag

▸ **createTag**(`tagData`): `Promise`\<[`TagEntity`](src_features_tagManagement_types_TagEntity.md#tagentity)\>

Creates a new tag in Firebase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tagData` | [`TagFormType`](src_features_tagManagement_types_TagEntity.md#tagformtype) | The data of the tag to be created. |

#### Returns

`Promise`\<[`TagEntity`](src_features_tagManagement_types_TagEntity.md#tagentity)\>

A Promise that resolves to the created tag.

#### Defined in

[src/features/tagManagement/api/tagManager.ts:28](https://github.com/alexsoyes/weekly-ai-tips/blob/b51216ee36bb903ccd72a472afbc8e01da2cc631/src/features/tagManagement/api/tagManager.ts#L28)

___

### deleteTag

▸ **deleteTag**(`tagId`): `Promise`\<`boolean`\>

Deletes a tag from Firebase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tagId` | `string` | The ID of the tag to be deleted. |

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves when the tag is deleted.

#### Defined in

[src/features/tagManagement/api/tagManager.ts:42](https://github.com/alexsoyes/weekly-ai-tips/blob/b51216ee36bb903ccd72a472afbc8e01da2cc631/src/features/tagManagement/api/tagManager.ts#L42)

___

### fetchTags

▸ **fetchTags**(): `Promise`\<[`TagEntity`](src_features_tagManagement_types_TagEntity.md#tagentity)[]\>

Retrieves all the tags from Firebase.

#### Returns

`Promise`\<[`TagEntity`](src_features_tagManagement_types_TagEntity.md#tagentity)[]\>

A Promise that resolves to an array of tags.

#### Defined in

[src/features/tagManagement/api/tagManager.ts:75](https://github.com/alexsoyes/weekly-ai-tips/blob/b51216ee36bb903ccd72a472afbc8e01da2cc631/src/features/tagManagement/api/tagManager.ts#L75)

___

### updateTag

▸ **updateTag**(`tagId`, `tagData`): `Promise`\<[`TagEntity`](src_features_tagManagement_types_TagEntity.md#tagentity)\>

Updates a tag in Firebase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tagId` | `string` | The ID of the tag to be updated. |
| `tagData` | [`TagEntity`](src_features_tagManagement_types_TagEntity.md#tagentity) | The new data of the tag. |

#### Returns

`Promise`\<[`TagEntity`](src_features_tagManagement_types_TagEntity.md#tagentity)\>

A Promise that resolves to the updated tag.

#### Defined in

[src/features/tagManagement/api/tagManager.ts:61](https://github.com/alexsoyes/weekly-ai-tips/blob/b51216ee36bb903ccd72a472afbc8e01da2cc631/src/features/tagManagement/api/tagManager.ts#L61)
