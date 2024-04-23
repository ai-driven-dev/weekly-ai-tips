[Weekly AI Tips](../README.md) / [Modules](../modules.md) / src/features/tipManagement/utils/tipUtils

# Module: src/features/tipManagement/utils/tipUtils

## Table of contents

### Functions

- [convertTipEntityToForm](src_features_tipManagement_utils_tipUtils.md#converttipentitytoform)
- [getStatus](src_features_tipManagement_utils_tipUtils.md#getstatus)

## Functions

### convertTipEntityToForm

▸ **convertTipEntityToForm**(`tip`): [`TipFormType`](src_features_tipManagement_types_TipEntity.md#tipformtype)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tip` | [`default`](../interfaces/src_features_tipManagement_types_TipEntity.default.md) |

#### Returns

[`TipFormType`](src_features_tipManagement_types_TipEntity.md#tipformtype)

#### Defined in

[src/features/tipManagement/utils/tipUtils.ts:3](https://github.com/alexsoyes/weekly-ai-tips/blob/b3fea4afd71b68632685f2d382621a10bad6affa/src/features/tipManagement/utils/tipUtils.ts#L3)

___

### getStatus

▸ **getStatus**(`tip`): [`default`](../interfaces/src_features_tipManagement_types_TipEntity.default.md)[``"status"``]

#### Parameters

| Name | Type |
| :------ | :------ |
| `tip` | `Pick`\<[`default`](../interfaces/src_features_tipManagement_types_TipEntity.default.md), ``"status"`` \| ``"upVotes"`` \| ``"downVotes"``\> |

#### Returns

[`default`](../interfaces/src_features_tipManagement_types_TipEntity.default.md)[``"status"``]

#### Defined in

[src/features/tipManagement/utils/tipUtils.ts:13](https://github.com/alexsoyes/weekly-ai-tips/blob/b3fea4afd71b68632685f2d382621a10bad6affa/src/features/tipManagement/utils/tipUtils.ts#L13)
