import { NextResponse } from "next/server";

import { DB, CODE_SHARE_COLLECTION } from "@/server/config/appwrite.config";
import { serviceClient } from "@/server/services/service_client";

export async function GET() {
  const { databases, Query } = serviceClient.adminDatabase();
  const expired = await databases.listDocuments(DB, CODE_SHARE_COLLECTION, [
    Query.lessThan("expiresAt", new Date().toISOString()),
    Query.limit(100),
  ]);
  await Promise.allSettled(
    expired.documents.map((doc) =>
      databases.deleteDocument(DB, CODE_SHARE_COLLECTION, doc.$id),
    ),
  );
  return NextResponse.json({ deleted: expired.documents.length });
}
