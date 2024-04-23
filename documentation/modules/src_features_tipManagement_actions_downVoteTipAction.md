[Weekly AI Tips](../README.md) / [Modules](../modules.md) / src/features/tipManagement/actions/downVoteTipAction

# Module: src/features/tipManagement/actions/downVoteTipAction

## Table of contents

### Functions

- [downVoteTipAction](src_features_tipManagement_actions_downVoteTipAction.md#downvotetipaction)

## Functions

### downVoteTipAction

▸ **downVoteTipAction**(`_`, `formData`): `Promise`\<`boolean` \| `string` \| ``null``\>

Downvote a tip from a user.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_` | ``null`` \| `string` \| `boolean` | Parameter not used. |
| `formData` | `FormData` | The form data. |

#### Returns

`Promise`\<`boolean` \| `string` \| ``null``\>

A boolean indicating success.

**`Throws`**

If the user has already down-voted the tip.

#### Defined in

[src/features/tipManagement/actions/downVoteTipAction.ts:16](https://github.com/alexsoyes/weekly-ai-tips/blob/8e6b4ae946047053b809d45f37efccbb35947373/src/features/tipManagement/actions/downVoteTipAction.ts#L16)
