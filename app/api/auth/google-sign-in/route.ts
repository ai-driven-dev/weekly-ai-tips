import { adminAuth } from "@/firebaseAdmin";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

const db = getFirestore();

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Implement logic to check/create user and update lastLoginDate here
    const userRef = db.collection("users").doc(uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      // Create a new user if not exists
      await userRef.set({
        uid: uid,
        lastLoginDate: Timestamp.now(),
        // Add any additional user info here
      });
    } else {
      // Update lastLoginDate for existing user
      await userRef.update({
        lastLoginDate: Timestamp.now(),
      });
    }

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
