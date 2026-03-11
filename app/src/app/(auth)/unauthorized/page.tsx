import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UnauthorizedPage() {
  return (
    <Card className="w-full max-w-sm text-center">
      <CardHeader>
        <CardTitle className="text-xl">Access Denied</CardTitle>
        <CardDescription>
          You do not have permission to view this page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Contact your administrator if you believe this is a mistake.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center gap-3">
        <Button variant="outline" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
