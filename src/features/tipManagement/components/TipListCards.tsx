"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TipEntity from "@/src/features/tipManagement/types/TipEntity";
import Link from "next/link";
import React from "react";
import { useUserAuthentication } from "../../userManagement/hooks/useUserAuthentication";

type Props = {
  tips: Array<TipEntity>;
};

const TipListCards: React.FC<Props> = ({ tips }) => {
  const { user } = useUserAuthentication();

  return (
    <>
      {tips.map((tip, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{tip.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <div className="flex justify-between">
                {tip.description}
                {tip.ownerID === user?.uid && tip.status === "draft" && (
                  <Link href={`/dashboard/tips/edit/${tip.id}`}>Edit</Link>
                )}
              </div>
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Badge>{tip.status}</Badge>
            {tip.scheduledDate && (
              <Badge variant={"secondary"}>
                {new Date(tip.scheduledDate).toLocaleString("fr-FR")}
              </Badge>
            )}
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default TipListCards;
