[Weekly AI Tips](../README.md) / [Modules](../modules.md) / src/features/tipManagement/actions/upVoteTipAction

# Module: src/features/tipManagement/actions/upVoteTipAction

## Table of contents

### Functions

- [upVoteTipAction](src_features_tipManagement_actions_upVoteTipAction.md#upvotetipaction)

## Functions

### upVoteTipAction

▸ **upVoteTipAction**(`_`, `formData`): `Promise`\<`boolean` \| `string` \| ``null``\>

Upvote a tip from a user.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | ``null`` \| `string` \| `boolean` |
| `formData` | `FormData` |

#### Returns

`Promise`\<`boolean` \| `string` \| ``null``\>

A boolean indicating success.

**`Throws`**

If the user has already upvoted the tip.

#### Defined in

[src/features/tipManagement/actions/upVoteTipAction.ts:16](https://github.com/alexsoyes/weekly-ai-tips/blob/a5c5a395ae8c55cfba018def4dd85212d123191c/src/features/tipManagement/actions/upVoteTipAction.ts#L16)
