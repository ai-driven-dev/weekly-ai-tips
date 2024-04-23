[Weekly AI Tips](../README.md) / [Modules](../modules.md) / src/features/tipManagement/utils/getNextScheduledDate

# Module: src/features/tipManagement/utils/getNextScheduledDate

## Table of contents

### Functions

- [getNextMondaysDateFromDate](src_features_tipManagement_utils_getNextScheduledDate.md#getnextmondaysdatefromdate)
- [getNextScheduledDate](src_features_tipManagement_utils_getNextScheduledDate.md#getnextscheduleddate)

## Functions

### getNextMondaysDateFromDate

▸ **getNextMondaysDateFromDate**(`latestDate?`): `Date`

This function is used to get the next Monday's date from the given date.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `latestDate` | `Date` | The latest date from which the next Monday's date is to be calculated. |

#### Returns

`Date`

- The next Monday's date from the given date.

#### Defined in

[src/features/tipManagement/utils/getNextScheduledDate.ts:55](https://github.com/alexsoyes/weekly-ai-tips/blob/b3fea4afd71b68632685f2d382621a10bad6affa/src/features/tipManagement/utils/getNextScheduledDate.ts#L55)

___

### getNextScheduledDate

▸ **getNextScheduledDate**(): `Promise`\<`Date`\>

This function is used to get the next scheduled date for the tip.

Every Monday at 9:00 AM, a new tip is scheduled.

Only one tip can be scheduled per week.
*

#### Returns

`Promise`\<`Date`\>

- The next scheduled date for the tip which is a Monday at 9:00 AM.

#### Defined in

[src/features/tipManagement/utils/getNextScheduledDate.ts:13](https://github.com/alexsoyes/weekly-ai-tips/blob/b3fea4afd71b68632685f2d382621a10bad6affa/src/features/tipManagement/utils/getNextScheduledDate.ts#L13)
