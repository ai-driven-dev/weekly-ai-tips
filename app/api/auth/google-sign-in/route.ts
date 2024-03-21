import { adminAuth } from "@/firebaseAdmin";
import UserEntity from "@/src/features/userManagement/types/UserEntity";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

const db = getFirestore();

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    const decodedToken = await adminAuth.verifyIdToken(token);

    if (!decodedToken.email) {
      throw new Error("Email is required");
    }

    const uid = decodedToken.uid;
    const userRef = db.collection("users").doc(uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      const _user: UserEntity = {
        id: uid,
        name: decodedToken.name,
        email: decodedToken.email!,
        picture: decodedToken.picture,
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
