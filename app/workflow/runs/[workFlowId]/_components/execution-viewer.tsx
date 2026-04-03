"use client";

import { useQuery } from "@tanstack/react-query";
import {
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  CoinsIcon,
  Loader2Icon,
  LucideIcon,
  WorkflowIcon,
} from "lucide-react";
import { formatDistanceToNow, set } from "date-fns";
import { useEffect, useState } from "react";

import { getWorkflowExecutionWithPhases } from "@/actions/workflows/get-workflow-execution";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/types/workflows";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { datesToDurationString } from "@/lib/helpers/dates";
import { getPhasesTotalCost } from "@/lib/helpers/phases";
import { getWorkflowPhaseDetails } from "@/actions/workflows/get-workflow-phase-details";
import CustomLoading from "@/components/globals/custom-loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ExecutionLog } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { LogLevel } from "@/types/logs";
import PhaseStatusBadge from "./phase-status-badge";
import CountUpWrapper from "@/components/globals/countup-wrapper";

interface ExecutionViewerProps {
  initialExecution: Awaited<ReturnType<typeof getWorkflowExecutionWithPhases>>;
}

export default function ExecutionViewer({
  initialExecution,
}: ExecutionViewerProps) {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  // Fetch the execution with phases and refetch it every second if the execution is running
  const query = useQuery({
    queryKey: ["execution", initialExecution?.id],
    initialData: initialExecution,
    queryFn: () => getWorkflowExecutionWithPhases(initialExecution?.id ?? ""),
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ||
      q.state.data?.status === WorkflowExecutionStatus.PENDING
        ? 1000
        : false,
  });

  const phaseDetails = useQuery({
    queryKey: ["phaseDetails", selectedPhase],
    enabled: !!selectedPhase,
    queryFn: () => getWorkflowPhaseDetails(selectedPhase!),
  });

  const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;

  useEffect(() => {
    // while running highlighting the current phase in the sidebar
    const phases = query.data?.phases || [];
    if (isRunning) {
      const phaseToSelect = phases.toSorted((a, b) =>
        a.startedAt! > b.startedAt! ? -1 : 1,
      )[0];
      setSelectedPhase(phaseToSelect?.id);
    }

    const phaseToSelect = phases.toSorted((a, b) =>
      a.completedAt! > b.completedAt! ? -1 : 1,
    )[0];
    setSelectedPhase(phaseToSelect?.id);
  }, [query.data?.phases, isRunning, setSelectedPhase]);

  const duration = datesToDurationString(
    query.data?.completedAt,
    query.data?.startedAt,
  );

  const creditsConsumed = getPhasesTotalCost(query.data?.phases || []);
  return (
    <div className="flex w-full h-full">
      <aside className="w-[440px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden">
        <div className="py-4 px-2">
          <ExecutionLabel
            icon={CircleDashedIcon}
            label="Status"
            value={query.data?.status ?? "-"}
          />
          <ExecutionLabel
            icon={CalendarIcon}
            label="Started at"
            value={
              <span className="lowercase">
                {query.data?.startedAt
                  ? formatDistanceToNow(new Date(query.data?.startedAt), {
                      addSuffix: true,
                    })
                  : "-"}
              </span>
            }
          />
          <ExecutionLabel
            icon={ClockIcon}
            label="Duration"
            value={
              duration ? (
                duration
              ) : (
                <Loader2Icon className="animate-spin" size={20} />
              )
            }
          />
          <ExecutionLabel
            icon={CoinsIcon}
            label="Credits Consumed"
            value={<CountUpWrapper value={creditsConsumed} />}
          />
          <Separator />
          <div className="flex justify-center items-center py-2 px-4">
            <div className="text-muted-foreground flex items-center gap-2">
              <WorkflowIcon size={20} className="stroke-muted-foreground/80" />
              <span className="font-semibold">Phases</span>
            </div>
          </div>
          <Separator />
          <div className="overflow-auto h-full px-2 py-4">
            {query.data?.phases.map((phase, index) => (
              <Button
                className="w-full justify-between"
                variant={selectedPhase === phase.id ? "link" : "ghost"}
                key={phase.id}
                onClick={() => {
                  if (isRunning) return;
                  setSelectedPhase(phase.id);
                }}
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{index + 1}</Badge>
                  <p className="font-semibold">{phase.name}</p>
                </div>
                <PhaseStatusBadge
                  status={phase.status as ExecutionPhaseStatus}
                />
              </Button>
            ))}
          </div>
        </div>
      </aside>
      <div className="flex w-full h-full">
        {isRunning && (
          <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
            <p className="font-bold">Run is in Progress, please wait...</p>
            <Loader2Icon className="animate-spin stroke-primary" size={40} />
          </div>
        )}
        {!isRunning && !selectedPhase && (
          <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
            <div className="flex flex-col gap-1 text-center">
              <p className="font-bold">No phase selected</p>
              <p className="font-sm text-muted-foreground">
                Select a phase to view its details
              </p>
            </div>
          </div>
        )}
        {!isRunning && phaseDetails.isLoading && <CustomLoading />}
        {!isRunning && selectedPhase && phaseDetails.data && (
          <div className="flex flex-col py-4 container gap-4 overflow-auto">
            <div className="flex gap-2 items-center">
              <Badge variant="outline" className="space-x-4 py-1">
                <div className="flex gap-1 items-center">
                  <CoinsIcon size={18} className="stroke-muted-foreground" />
                  <span>Credits</span>
                </div>
                <span>{phaseDetails.data.creditsConsumed}</span>
              </Badge>
              <Badge variant="outline" className="space-x-4 py-1">
                <div className="flex gap-1 items-center">
                  <ClockIcon size={18} className="stroke-muted-foreground" />
                  <span>Duration</span>
                </div>
                <span>
                  {datesToDurationString(
                    phaseDetails.data.completedAt,
                    phaseDetails.data.startedAt,
                  ) || "-"}
                </span>
              </Badge>
            </div>

            <ParameterViewer
              title="Inputs"
              subTitle="Inputs used for this phase"
              paramsJson={phaseDetails.data.inputs}
            />
            <ParameterViewer
              title="Outputs"
              subTitle="Outputs generated by this phase"
              paramsJson={phaseDetails.data.outputs}
            />

            <LogViewer logs={phaseDetails.data.logs} />
          </div>
        )}
      </div>
    </div>
  );
}

function ExecutionLabel({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center py-2 px-4 text-sm">
      <div className="text-muted-foreground flex items-center gap-2">
        <Icon size={20} className="stroke-muted-foreground/80" />
        <span>{label}</span>
      </div>
      <div className="font-semibold capitalize flex gap-2 items-center">
        {value}
      </div>
    </div>
  );
}

function ParameterViewer({
  title,
  subTitle,
  paramsJson,
}: {
  title: string;
  subTitle: string;
  paramsJson: string | null;
}) {
  const params = paramsJson ? JSON.parse(paramsJson) : null;
  return (
    <Card>
      <CardHeader className="rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          {subTitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        <div className="flex flex-col gap-2">
          {(!params || Object.keys(params).length === 0) && (
            <p className="text-sm">No parameters generated by this phase</p>
          )}
          {params &&
            Object.entries(params).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center space-y-1"
              >
                <p className="text-sm text-muted-foreground flex-1 basis-1/3">
                  {key}:
                </p>
                <Input
                  className="flex-1 basis-2/3"
                  value={value as string}
                  readOnly
                />
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

function LogViewer({ logs }: { logs: ExecutionLog[] }) {
  if (!logs || logs.length === 0) return null;
  return (
    <Card className="w-full">
      <CardHeader className="rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background">
        <CardTitle className="text-base">Logs</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Logs generated by this phase
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="text-muted-foreground text-sm">
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow className="text-muted-foreground" key={log.id}>
                <TableCell
                  width={190}
                  className="text-xs text-muted-foreground p-[2px] pl-4"
                >
                  {log.timestamp.toISOString()}
                </TableCell>
                <TableCell
                  width={80}
                  className={cn(
                    "uppercase text-xs font-bold p-[3px] pl-4",
                    (log.logLevel as LogLevel) === "error" &&
                      "text-destructive",
                    (log.logLevel as LogLevel) === "info" && "text-primary",
                  )}
                >
                  {log.logLevel}
                </TableCell>
                <TableCell className="text-sm flex-1 p-[5px] pl-4">
                  {log.message}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
