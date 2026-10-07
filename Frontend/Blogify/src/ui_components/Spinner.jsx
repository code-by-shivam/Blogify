import { Loader2 } from "lucide-react";

const Spinner = () => (
  <div className="flex min-h-[50vh] items-center justify-center text-primary">
    <Loader2 className="size-8 animate-spin" aria-label="Loading" />
  </div>
);

export default Spinner;
