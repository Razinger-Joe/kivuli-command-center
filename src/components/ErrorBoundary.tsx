import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center space-y-4">
          <div className="p-4 bg-red-500/10 rounded-full">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white">System Malfunction Detected</h2>
          <p className="text-muted-foreground max-w-md">
            The command center encountered an unexpected error while rendering this component. Our telemetry has logged the issue.
          </p>
          <div className="bg-black/50 p-4 rounded text-left w-full max-w-lg overflow-auto border border-red-500/20">
            <code className="text-sm text-red-400 font-mono">
              {this.state.error?.toString() || "Unknown Error"}
            </code>
          </div>
          <Button 
            onClick={() => this.setState({ hasError: false })}
            variant="outline"
            className="gap-2 mt-4"
          >
            <RefreshCw className="w-4 h-4" />
            Attempt Recovery
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
