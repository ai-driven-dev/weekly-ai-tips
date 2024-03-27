import { db } from "@/firebaseAdmin";
import UserEntity from "@/src/features/userManagement/types/UserEntity";
import { Timestamp } from "firebase-admin/firestore";
import { User } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { user } = (await req.json()) as { user: User };

    const userRef = db.collection("users").doc(user.uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      const _user: UserEntity = {
        id: user.uid,
        name: user.displayName!,
        email: user.email!,
        picture: user.photoURL!,
        roles: [],
        createdAt: Timestamp.now().toDate(),
        updatedAt: Timestamp.now().toDate(),
      };

      // Create a new user if not exists
      await userRef.set(_user);
    } else {
      // Update lastLoginDate for existing user
      await userRef.update({
        updatedAt: Timestamp.now().toDate(),
      });
    }

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);

    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
