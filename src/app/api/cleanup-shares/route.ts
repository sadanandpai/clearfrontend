import { NextResponse } from "next/server";

import { DB, CODE_SHARE_COLLECTION } from "@/server/config/appwrite.config";
import { serviceClient } from "@/server/services/service_client";

export async function GET() {
  const { tables, Query } = serviceClient.adminDatabase();
  const expiredQueries = [Query.lessThan("expiresAt", new Date().toISOString()), Query.limit(100)];
  const expired = await tables.listRows({
    databaseId: DB,
    tableId: CODE_SHARE_COLLECTION,
    queries: expiredQueries,
  });
  if (expired.rows.length > 0) {
    await tables.deleteRows({
      databaseId: DB,
      tableId: CODE_SHARE_COLLECTION,
      queries: expiredQueries,
    });
  }
  return NextResponse.json({ deleted: expired.rows.length });
}
