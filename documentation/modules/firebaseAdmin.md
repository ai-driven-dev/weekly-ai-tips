[Weekly AI Tips](../README.md) / [Modules](../modules.md) / firebaseAdmin

# Module: firebaseAdmin

This file is used to initialize the Firebase Admin SDK.

It is used to interact with Firebase services from the server side.

## Table of contents

### Variables

- [adminAuth](firebaseAdmin.md#adminauth)
- [db](firebaseAdmin.md#db)

## Variables

### adminAuth

• `Const` **adminAuth**: `Auth`

The Firebase Admin SDK instance.

This is used to interact with Firebase services from the server side.

**`Example`**

```typescript
import { admin } from "@/firebaseAdmin";
```

#### Defined in

[firebaseAdmin.ts:48](https://github.com/alexsoyes/weekly-ai-tips/blob/b3fea4afd71b68632685f2d382621a10bad6affa/firebaseAdmin.ts#L48)

___

### db

• `Const` **db**: `Firestore`

The Firestore instance.

This is used to interact with the Firestore database.

**`Example`**

```typescript
import { db } from "@/firebaseAdmin";

const docRef = db.collection("users").doc("alex");
```

#### Defined in

[firebaseAdmin.ts:36](https://github.com/alexsoyes/weekly-ai-tips/blob/b3fea4afd71b68632685f2d382621a10bad6affa/firebaseAdmin.ts#L36)
