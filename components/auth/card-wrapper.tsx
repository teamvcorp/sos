import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-lg p-4 md:p-6 lg:p-8 shadow-lg rounded-lg">
        <CardHeader className="mb-4">
          <Header label={headerLabel} />
        </CardHeader>
        <CardContent className="space-y-4">
          {showSocial && <Social />}
          {children}
        </CardContent>
        <CardFooter className="mt-6">
          <BackButton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
      </Card>
    </div>
  );
};
