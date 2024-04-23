[Weekly AI Tips](../README.md) / [Modules](../modules.md) / src/features/votingSystem/api/vote

# Module: src/features/votingSystem/api/vote

## Table of contents

### Functions

- [vote](src_features_votingSystem_api_vote.md#vote)

## Functions

### vote

▸ **vote**(`tipData`, `fromUser`, `voteType`): `Promise`\<``true``\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tipData` | ``null`` \| [`default`](../interfaces/src_features_tipManagement_types_TipEntity.default.md) |
| `fromUser` | ``null`` \| [`default`](../interfaces/src_features_userManagement_types_UserEntity.default.md) |
| `voteType` | ``"upvote"`` \| ``"downvote"`` |

#### Returns

`Promise`\<``true``\>

#### Defined in

[src/features/votingSystem/api/vote.ts:8](https://github.com/alexsoyes/weekly-ai-tips/blob/b3fea4afd71b68632685f2d382621a10bad6affa/src/features/votingSystem/api/vote.ts#L8)