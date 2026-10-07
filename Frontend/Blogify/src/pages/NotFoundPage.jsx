import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => (
  <div className="page flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
    <p className="text-sm font-medium text-primary">404</p>
    <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
    <p className="text-muted-foreground">The page you're looking for doesn't exist or has moved.</p>
    <Button asChild className="mt-2"><Link to="/">Back to home</Link></Button>
  </div>
);

export default NotFoundPage;
